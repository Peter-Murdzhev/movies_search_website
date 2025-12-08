

export default function Spinner({
  size = 60,
  thickness = 4,
  color = "#0ea5e9",
  ringColor,
  speed = 800,
  className = "",
  label = "Loading…",
}) {
  const toPx = (v) => (typeof v === "number" ? `${v}px` : v);
  const style = {
    "--sp-size": toPx(size),
    "--sp-thickness": toPx(thickness),
    "--sp-color": color,
    "--sp-ring": ringColor || color,
    "--sp-speed": `${speed}ms`,
  };

  return (
    <div
      className={`spinner ${className}`}
      style={style}
      role="status"
      aria-label={label}
      aria-live="polite"
    />
  );
}