interface LyraLogoProps {
  className?: string;
}

export function LyraLogo({ className = "h-8 w-8" }: LyraLogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main constellation pattern */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(258 90% 66%)" />
          <stop offset="100%" stopColor="hsl(258 95% 56%)" />
        </linearGradient>
      </defs>
      
      {/* Constellation dots */}
      <circle cx="8" cy="8" r="2" fill="url(#logoGradient)" />
      <circle cx="16" cy="6" r="1.5" fill="url(#logoGradient)" />
      <circle cx="24" cy="10" r="2" fill="url(#logoGradient)" />
      <circle cx="12" cy="16" r="1.5" fill="url(#logoGradient)" />
      <circle cx="20" cy="20" r="2" fill="url(#logoGradient)" />
      <circle cx="6" cy="24" r="1.5" fill="url(#logoGradient)" />
      
      {/* Connecting lines */}
      <path
        d="M8 8 L16 6 L24 10 M16 6 L12 16 M24 10 L20 20 M12 16 L6 24 M12 16 L20 20"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        opacity="0.6"
      />
      
      {/* Outer glow effect */}
      <circle cx="16" cy="16" r="14" fill="none" stroke="url(#logoGradient)" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}