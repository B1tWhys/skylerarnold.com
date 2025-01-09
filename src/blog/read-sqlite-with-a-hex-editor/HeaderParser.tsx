import { useState } from "react";

export default function Headervalue() {
  const defaultHex =
    "53514c69746520666f726d61742033001000010100402020000000020000002300000000000000000000000100000004000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000002002e7e5a0d0ff800040e60000eb20fcd0fa20e60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
  const [hexInput, setHexInput] = useState(defaultHex);

  function parseHex() {
    let result = [];
    let i = 0;
    const cleanInput = hexInput.toLowerCase().replace(/[^\dabcdef]/g, "");
    while (i < cleanInput.length) {
      const byte = parseInt(cleanInput.slice(i, i + 2), 16);
      result.push(byte);
      i += 2;
    }
    return result;
  }
  const byteValues = parseHex();

  function bytesToInt(bytes: number[]) {
    return bytes.reduce((acc, byte) => (acc << 8) + byte, 0);
  }

  const headerFields = [
    {
      offset: 0,
      size: 16,
      description: 'The header string: "SQLite format 3\\000"',
      value:
        byteValues.length === 0
          ? "EMPTY"
          : String.fromCharCode(...byteValues.slice(0, 16)),
    },
    {
      offset: 16,
      size: 2,
      description:
        "The database page size in bytes. Must be a power of two between 512 and 32768 inclusive, or the value 1 representing a page size of 65536.",
    },
    {
      offset: 18,
      size: 1,
      description: "File format write version. 1 for legacy; 2 for WAL.",
    },
    {
      offset: 19,
      size: 1,
      description: "File format read version. 1 for legacy; 2 for WAL.",
    },
    {
      offset: 20,
      size: 1,
      description:
        'Bytes of unused "reserved" space at the end of each page. Usually 0.',
    },
    {
      offset: 21,
      size: 1,
      description: "Maximum embedded payload fraction. Must be 64.",
    },
    {
      offset: 22,
      size: 1,
      description: "Minimum embedded payload fraction. Must be 32.",
    },
    {
      offset: 23,
      size: 1,
      description: "Leaf payload fraction. Must be 32.",
    },
    {
      offset: 24,
      size: 4,
      description: "File change counter.",
    },
    {
      offset: 28,
      size: 4,
      description:
        'Size of the database file in pages. The "in-header database size".',
    },
    {
      offset: 32,
      size: 4,
      description: "Page number of the first freelist trunk page.",
    },
    {
      offset: 36,
      size: 4,
      description: "Total number of freelist pages.",
    },
    {
      offset: 40,
      size: 4,
      description: "The schema cookie.",
    },
    {
      offset: 44,
      size: 4,
      description:
        "The schema format number. Supported schema formats are 1, 2, 3, and 4.",
    },
    {
      offset: 48,
      size: 4,
      description: "Default page cache size.",
    },
    {
      offset: 52,
      size: 4,
      description:
        "The page number of the largest root b-tree page when in auto-vacuum or incremental-vacuum modes, or zero otherwise.",
    },
    {
      offset: 56,
      size: 4,
      description:
        "The database text encoding. A value of 1 means UTF-8. A value of 2 means UTF-16le. A value of 3 means UTF-16be.",
    },
    {
      offset: 60,
      size: 4,
      description:
        'The "user version" as read and set by the user_version pragma.',
    },
    {
      offset: 64,
      size: 4,
      description:
        "True (non-zero) for incremental-vacuum mode. False (zero) otherwise.",
    },
    {
      offset: 68,
      size: 4,
      description: 'The "Application ID" set by PRAGMA application_id.',
    },
    {
      offset: 72,
      size: 20,
      description: "Reserved for expansion. Must be zero.",
    },
    {
      offset: 92,
      size: 4,
      description: "The version-valid-for number.",
    },
    {
      offset: 96,
      size: 4,
      description: "SQLITE_VERSION_NUMBER.",
    },
  ];

  return (
    <div className="p-2 my-2 bg-amber-50 dark:bg-zinc-800 rounded-md">
      <textarea
        className="textarea textarea-bordered rounded-md w-full"
        value={hexInput}
        onChange={(e) => setHexInput(e.target.value)}
      />

      <div className="">
        <table className="table table-compact w-full">
          <thead>
            <th className="w-5/12">Name</th>
            <th className="w-2/12">Offset</th>
            <th className="w-1/12">Size (bytes)</th>
            <th className="w-4/12">Value</th>
          </thead>
          <tbody>
            {headerFields.map((field) => (
              <tr>
                <td>{field.description}</td>
                <td>
                  {field.offset} (0x{field.offset.toString(16)})
                </td>
                <td>{field.size}</td>
                <td>
                  {field.value ??
                    bytesToInt(
                      byteValues.slice(field.offset, field.offset + field.size),
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
