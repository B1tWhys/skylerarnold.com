---
title: Arch linux redux pt 1
description: Part 1 of redoing my riced linux install
date: 2025-06-12
---
Last time I riced my desktop linux install (sheesh... 8ish years ago now?) I didn't take any notes, which was a bit annoying a few times. This time I've decided to write up the process and put them here. This is part 1: setting up the filesystem.

# Filesystem choice

| Feature I want         | **Btrfs**                   | **ext4**                   | **ZFS**                         | **XFS**                  |
| ---------------------- | --------------------------- | -------------------------- | ------------------------------- | ------------------------ |
| **Compression**        | ✅ Native (zlib, zstd, lzo)  | ❌ Not supported natively   | ✅ Native (lz4, gzip, zstd)      | ❌ Not supported natively |
| **Copy-on-Write**      | ✅ Yes                       | ❌ No                       | ✅ Yes                           | ❌ No                     |
| **Encryption**         | ❌ Not natively              | ✅ fs-level via e4crypt     | ✅ Native (ZFS native crypto)    | ❌ (use LUKS)             |
| **Snapshots**          | ✅ Subvolumes + snapshots    | ❌ Not supported            | ✅ Very mature, full support     | ❌ Not supported          |
| **Incremental Backup** | ✅ With `send/receive`       | ❌ Not supported            | ✅ With `zfs send/receive`       | ❌ Not supported          |
| **Data Deduplication** | ⚠️ Experimental & slow      | ❌ Not supported            | ✅ Available (RAM-heavy)         | ❌ Not supported          |
| **Autodefrag**         | ✅ Mount option `autodefrag` | ❌ Manual only (`e4defrag`) | ⚠️ On write only, no background | ❌ Not supported          |


Based on this comparison, I'm going with btrfs. I'm OK with not using data deduplication for now, and I'll use dmcrypt for disk encryption.

## Partitioning
I like to keep my partition scheme simple, just an EFI partition and a main partition. I'll encrypt the main partition with dmcrypt/LUKS. **I'm also leaving some extra space (1TB) on the drive for future use**, since I can't easily grow/shrink the encrypted partition.

Oh also: Before partitioning I double checked that the drive was using the optimal sector size with `smartctl -a /dev/nvme0n1 | grep -E '(Sector|LBA)\sSize\b' (https://wiki.archlinux.org/title/Talk:Advanced_Format)

## Encryption
Following the [arch wiki](https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system#Preparing_non-boot_partitions):

```frames=false
cryptsetup -v luksFormat /dev/nvme1n1p2
cryptsetup open /dev/nvme1n1p2 root
```

## Filesystem(s)
```
mkfs.btrfs -L linux-root /dev/mapper/root
mount /dev/mapper/root /mnt
mkfs.fat -F 32 /dev/nvme1n1p1
mount --mkdir /dev/nvme1n1p1 /mnt/boot
```

# Install the OS!
Mostly following [these instructions](https://wiki.archlinux.org/title/Installation_guide#Configure_the_system)
```
# bootstrap the system
pacstrap -K /mnt base linux linux-firmware

# gen fstab
genfstab -U /mnt >> /mnt/etc/fstab

# chroot
arch-chroot /mnt

# install iwd so I can connect to wifi when I'm logged in, and neovim so I can edit things
pacman -S iwd neovim

# set the timezone
ln -sf /usr/share/zoneinfo/US/Pacific /etc/localtime
hwclock --systohc

# set a root password
passwd
```

Manually edit `/etc/locale.gen` and uncomment `en_us.UTF-8 UTF-8`. I don't "think" I need any other locales for now.

```
# generate/configure locale
locale-gen
echo 'LANG=en_US.UTF-8' > /etc/locale.conf

# Set the system hostname
echo -n 'shadowfax' > /etc/hostname
```

Edit `/etc/mkinitcpio.conf` and update the hooks, adding `encrypt` (see [docs](https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system#Configuring_mkinitcpio)):
```
HOOKS=(base udev autodetect microcode modconf kms keyboard keymap consolefont block encrypt filesystems fsck)
```

Then regenerate the intramfs
```
mkinitcpio -P
```

## Bootloader setup
I'm using grub, of course. Following [these docs](https://wiki.archlinux.org/title/GRUB). For future reference:
- I'm not using a separate partitions for boot/EFI ([I trust my maid](https://en.wikipedia.org/wiki/Evil_maid_attack))
- The EFI partition is `nvme1n1p1` (1GB)
- I mount ESP to `/boot`

```
# install packages
pacman -S grub efibootmgr

# Install grub
grub-install --target=x86_64-efi --efi-directory=esp --bootloader-id=GRUB
```

**I like using a generated grub config file**. To set that up, edit `/etc/default/grub` and then run `grub-mkconfig -o /boot/grub/grub.cfg` to generate the actual config file. The main change I made to the grub config was setting:
```
GRUB_CMDLINE_LINUX="cryptdevice=UUID=9cb6d1bc-c868-486d-c871bb6e0094:root root=/dev/mapper/root"
GRUB_DISABLE_OS_PROBER=false
```

Brief asside:
> Sooo... my old linux drive actually died yesterday while I was trying to do a secure delete of all the data on my old linux partition. I thought this wasn't an issue since I was reinstalling linux anyway, but it turns out I think my windows EFI partition was on there. I don't feel like dealing with windows right now so I'm going to just ignore it, but at some point I'm gonna have to go back and recover windows... For now it's kaput (I don't think any of the partitions on the other drive look like there's the windows EFI). I set `GRUB_DISABLE_OS_PROBER=false` though so it's ready to go when I do fix windows.

Then generate the actual grub config with `grub-mkconfig -o /boot/grub/grub.cfg`

