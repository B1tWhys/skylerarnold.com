import { useState } from "react";

export default function headerparser() {
  const [hexinput, sethexinput] = useState(1);

  function inc() {
    sethexinput(hexinput + 1);
  }

  return (
    <div>
      <h1>{hexinput}</h1>
      <button onClick={inc}>increment</button>
    </div>
  );
}
