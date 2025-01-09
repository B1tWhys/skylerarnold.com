function BTreePage({ title }: { title: string }) {
  return (
    <g fontSize="5px">
      <rect width="50" height="100" fill="#fff" />
      <text transform="translate(0, 20)">
        {title}
      </text>
    </g>
  );
}

export default function BTreeDiagram() {
  return (
    <svg className="" viewBox="0 0 100 100">
      <BTreePage title="foo" />
    </svg>
  );
}
