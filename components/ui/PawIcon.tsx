import React from 'react';

export function PawIcon({ className = 'w-4 h-4', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main Pad */}
      <path d="M12 10.5 C8.5 10.5 7 13.5 7 16 C7 18.5 9 21 12 21 C15 21 17 18.5 17 16 C17 13.5 15.5 10.5 12 10.5 Z" />
      {/* Toe 1 (Leftmost) */}
      <circle cx="5.5" cy="11.5" r="2.2" />
      {/* Toe 2 */}
      <circle cx="9" cy="6.5" r="2.4" />
      {/* Toe 3 */}
      <circle cx="15" cy="6.5" r="2.4" />
      {/* Toe 4 (Rightmost) */}
      <circle cx="18.5" cy="11.5" r="2.2" />
    </svg>
  );
}

