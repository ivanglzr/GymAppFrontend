export default function Container({
  style,
  children,
}: {
  style: Object;
  children: React.ReactNode;
}) {
  return (
    <div id="container" style={style}>
      {children}
    </div>
  );
}
