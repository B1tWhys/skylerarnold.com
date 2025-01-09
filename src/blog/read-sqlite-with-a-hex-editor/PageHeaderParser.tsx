import { useMemo, useState } from "react";

export default function HeaderParser() {
  const defaultHex =
    "0d 0f f8 00 04 0e 60 00 0e b2 0f cd";
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
  const byteValues = useMemo(() => parseHex(), [hexInput]);

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
              <tr key={field.offset}>
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
