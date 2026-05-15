type Props = {
  size?: number;
  className?: string;
  /** Use white fill instead of brand colors. Default true (matches the rest of the site's dark sections). */
  white?: boolean;
};

/**
 * Monochrome "play triangle" glyph commonly associated with Google Play.
 * We render it ourselves rather than recoloring Google's official badge
 * asset, which keeps the design consistent on dark sections without
 * touching Google's trademarked multicolor mark.
 */
export function GooglePlayIcon({ size = 24, className, white = true }: Props) {
  const fill = white ? "#FFFFFF" : "#0B3B2D";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M3.6 1.7c-.4.3-.6.8-.6 1.4v17.8c0 .6.2 1.1.6 1.4l9.8-10.6L3.6 1.7z"
        fill={fill}
        opacity={0.92}
      />
      <path
        d="M16.8 8.4 13.4 11.7l3.4 3.4 4-2.3c.9-.5.9-1.8 0-2.3l-4-2.1z"
        fill={fill}
      />
      <path
        d="M13.4 12.3 3.6 22.3c.3.2.7.2 1.1 0l11.7-6.8-3-3.2z"
        fill={fill}
        opacity={0.85}
      />
      <path
        d="M16.4 8.7 4.7 1.9c-.4-.2-.8-.2-1.1 0l9.8 10.4 3-3.6z"
        fill={fill}
        opacity={0.78}
      />
    </svg>
  );
}
