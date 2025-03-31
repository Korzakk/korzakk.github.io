import { Heart } from './heart';
import { useState } from 'react';

interface LoveLetterProps {
  message: string;
}

export function LoveLetter({ message }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="love-letter-container mt-8" onClick={() => setIsOpen(!isOpen)}>
      <div className="love-letter">
        <div className={`envelope ${isOpen ? 'envelope-open' : ''}`}>
          <div className="envelope-front">
            <Heart className="h-16 w-16 text-deep-rose opacity-90" />
          </div>
          <div className="envelope-back">
            <div className="letter-content">
              {message}
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-2 text-sm text-gray-600 italic">
        {isOpen ? "Click to close" : "Click to open your love letter"}
      </p>
    </div>
  );
}