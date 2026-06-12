export function CablesAnimationOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 top-16 z-0 bg-white"
    >
      <iframe
        src="/cables-animation/overlay.html"
        title="Animación Hystera"
        className="h-full w-full border-0 bg-transparent opacity-[0.15] [filter:sepia(1)_saturate(8)_hue-rotate(330deg)_brightness(0.9)]"
        allow="autoplay"
      />
    </div>
  );
}
