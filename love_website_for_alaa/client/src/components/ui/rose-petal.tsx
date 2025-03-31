import { SVGProps } from 'react';

export function RosePetal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50,0 C60,20 80,20 90,30 C100,40 80,60 70,70 C60,80 60,100 50,100 C40,100 40,80 30,70 C20,60 0,40 10,30 C20,20 40,20 50,0 Z"
        fill="currentColor"
      />
    </svg>
  );
}