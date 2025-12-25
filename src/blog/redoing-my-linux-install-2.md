---
title: Arch linux redux pt 2
description: Getting comfy in userspace
date: 2025-06-18
---
Picking off from the last installment, I just got signed into my totally fresh arch linux environment. The first thing to do is get the internet working so I can start installing things:

```
systemctl enable iwd
systemctl start iwd

# Enable DHCP
cat <<EOF >/etc/iwd/main.conf
[General]
EnableNetworkConfiguration=true
EOF

# Actually connect to a wifi network
iwctl
> station wlan0 connect <my SSID>

# start systemd-resolve
systemctl enable systemd-resolved
systemctl start systemd-resolved
```

Now that I've got internet access, I can start installing things & getting set up:
```
pacman -S python yadm git tmux less base-devel the_silver_searcher 
```

Next I'll create/configure the users a bit

```
useradd -mU skyler
# Details of security configs omitted...

su skyler

# pull down my dotfiles (!!)
yadm clone https://github.com/B1tWhys/dotfiles.git
```

# Nvidia drivers

I'm going with the nvidia proprietary drivers, but the open source kernel modules (i.e. the "open" linux drivers). So `pacman -Sy nvidia-open nvidia-utils` and also (based on the note [here](https://wiki.archlinux.org/title/NVIDIA#Installation)) I removed the `kms` hook from the intramfs config and regenerated the intramfs. I also followed https://wiki.archlinux.org/title/NVIDIA#pacman_hook to set up a pacman hook to regenerate intramfs on updates to the nvidia drivers.



And that's pretty much it! I think ~ everything from there should end up in my dotfiles repo so there's not much point in documenting it here. Huzzah!


# Wayland/hyprland
PS: some additional packages I ended up installing, mostly just for my own future reference later when I inevitably have to re-read the arch docs to figure out how I like this set up...

```
pm -S hyprland wayland kitty noto-fonts uwsm libnewt
```

- wayland
- hyprland (compositor)
- kitty
- uwsm (layer to manage the interactions between systemd and hyprland)
- libnewt 