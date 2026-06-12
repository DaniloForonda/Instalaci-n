export function CablesAnimationOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 top-16 z-0 bg-white"
    >
      <iframe
        src="/cables-animation/overlay.html"
        title="Animación Hystera"
        className="h-full w-full border-0 bg-transparent opacity-90"
        allow="autoplay"
      />
    </div>
  );
}
