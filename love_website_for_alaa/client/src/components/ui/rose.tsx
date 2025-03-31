import { SVGProps } from "react";

export function Rose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      {...props}
    >
      {/* Outer petals */}
      <path d="M50,0 C55,25 70,40 90,45 C70,50 55,65 50,90 C45,65 30,50 10,45 C30,40 45,25 50,0 Z" 
        fill="#d46c6c" 
        opacity="0.9" 
      />
      
      {/* Inner petals */}
      <path d="M50,10 C53,28 64,38 80,42 C64,46 53,56 50,74 C47,56 36,46 20,42 C36,38 47,28 50,10 Z" 
        fill="#e57373" 
        opacity="0.95" 
      />
      
      {/* Center */}
      <circle cx="50" cy="42" r="8" fill="#c45858" opacity="0.85" />
      
      {/* Stem */}
      <path 
        d="M47,15 C50,15 53,18 53,20 C53,25 50,35 50,35 C50,35 47,25 47,20 C47,18 44,15 47,15 Z" 
        fill="#8bc34a" 
      />
      
      {/* Leaf */}
      <path 
        d="M53,24 C57,22 60,24 59,28 C58,32 54,32 52,30 C53,28 53,26 53,24 Z" 
        fill="#8bc34a" 
        opacity="0.9" 
      />
    </svg>
  );
}
