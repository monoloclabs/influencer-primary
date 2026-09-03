/** Small Alfred brand mark: a subtle necktie glyph. */
export function TieMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M9 2h6l-1.4 3.2h-3.2L9 2Z"
        fill="currentColor"
      />
      <path
        d="M10.2 6.6h3.6l1.8 7.1c.2.8-.02 1.6-.6 2.2l-2.3 2.3a.98.98 0 0 1-1.4 0l-2.3-2.3a2.4 2.4 0 0 1-.6-2.2l1.8-7.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
