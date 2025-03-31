import { SVGProps } from "react";

export function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Main heart shape */}
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
      />
      
      {/* Highlight/Shine effect */}
      <path 
        d="M12 4.5C10.5 4 9 4.5 8 5.5C7 6.5 6.5 7.8 6.5 9.2C6.5 10.6 7 12 8 13C9 14 10.5 14.5 12 14"
        fill="none"
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
