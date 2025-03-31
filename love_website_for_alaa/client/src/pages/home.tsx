import { useEffect, useState, useCallback } from "react";
import { Heart } from "@/components/ui/heart";
import { Rose } from "@/components/ui/rose";
import { RosePetal } from "@/components/ui/rose-petal";
import { LoveLetter } from "@/components/ui/love-letter";
import { differenceInDays, format } from "date-fns";
import "./home.css";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [daysTogether, setDaysTogether] = useState(0);
  const [secondsTogether, setSecondsTogether] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [heartBursts, setHeartBursts] = useState<{ id: string; x: number; y: number; color: string }[]>([]);
  const [showPetals, setShowPetals] = useState(true);
  
  // Love letter content
  const loveLetter = `My dearest Alaa,
  
Every moment with you is a gift that I cherish more than words can express. Your love has transformed my life in ways I never thought possible.

When we're together, time seems to stand still, and when we're apart, the minutes feel like eternity. You have captured my heart completely, and I am yours forever.

The way you smile, the sound of your laughter, the warmth of your embrace – these are the treasures that fill my heart with joy every single day.

With all my love,
Forever yours.`;
  
  // Love quotes collection
  const loveQuotes = [
    "Every time I see you, I fall in love all over again.",
    "In a sea of people, my eyes will always search for you.",
    "You're the first person I want to talk to when I wake up and the last person I want to hear from before I go to sleep.",
    "If I had to choose between breathing and loving you, I would use my last breath to say 'I love you.'",
    "You are my today and all of my tomorrows.",
    "My heart is and always will be yours.",
    "I love you not only for what you are, but for what I am when I am with you.",
    "You make my heart smile.",
    "I fell in love with you because you loved me when I couldn't love myself.",
    "When I look into your eyes, I see the mirror of my soul."
  ];
  
  // Calculate days together since October 9, 2024
  const startDate = new Date(2024, 9, 9); // Note: month is 0-based, so 9 = October
  const formattedStartDate = format(startDate, "MMMM d, yyyy");
  
  // Update the time counter
  useEffect(() => {
    // Function to calculate time difference
    const updateTimeTogether = () => {
      const now = new Date();
      const diffInDays = differenceInDays(now, startDate);
      setDaysTogether(diffInDays);
      
      // Calculate total seconds together
      const diffInMilliseconds = now.getTime() - startDate.getTime();
      const totalSeconds = Math.floor(diffInMilliseconds / 1000);
      setSecondsTogether(totalSeconds);
    };
    
    // Initialize
    updateTimeTogether();
    
    // Update every second
    const timer = setInterval(updateTimeTogether, 1000);
    
    // Cleanup
    return () => clearInterval(timer);
  }, []);
  
  // Rotate through love quotes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === loveQuotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change quote every 8 seconds
    
    return () => clearInterval(quoteInterval);
  }, [loveQuotes.length]);

  // Handle heart click to create burst effect
  const handleHeartClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const burstId = `burst-${Date.now()}`;
    const color = window.getComputedStyle(e.currentTarget).color;
    
    setHeartBursts(prev => [
      ...prev, 
      { id: burstId, x, y, color }
    ]);
    
    // Remove the burst effect after animation completes
    setTimeout(() => {
      setHeartBursts(prev => prev.filter(burst => burst.id !== burstId));
    }, 800);
  }, []);
  
  // Create rose petals falling effect
  useEffect(() => {
    if (!showPetals) return;
    
    const petalsContainer = document.getElementById('petals-container');
    if (!petalsContainer) return;
    
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      
      // Randomize petal properties
      const size = Math.floor(Math.random() * 20) + 10; // 10-30px
      const colorOptions = ['#f8c3c3', '#e57373', '#d46c6c', '#d46c6c', '#cf5f5f'];
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const left = `${Math.random() * 100}%`;
      const rotationStart = Math.floor(Math.random() * 360);
      const rotationEnd = rotationStart + Math.floor(Math.random() * 360);
      const duration = Math.floor(Math.random() * 10) + 10; // 10-20s
      
      // Apply styles
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.left = left;
      petal.style.top = '-5%';
      petal.style.backgroundColor = color;
      petal.style.borderRadius = '50% 50% 0 50%';
      petal.style.transform = `rotate(${rotationStart}deg)`;
      petal.style.animationDuration = `${duration}s`;
      
      petalsContainer.appendChild(petal);
      
      // Remove petal after animation
      setTimeout(() => {
        if (petal.parentNode === petalsContainer) {
          petalsContainer.removeChild(petal);
        }
      }, duration * 1000);
    };
    
    // Create initial petals
    for (let i = 0; i < 15; i++) {
      setTimeout(createPetal, Math.random() * 1000);
    }
    
    // Add new petals periodically
    const petalInterval = setInterval(createPetal, 1000);
    
    return () => {
      clearInterval(petalInterval);
    };
  }, [showPetals]);
  
  useEffect(() => {
    // Create and position hearts randomly when component mounts
    const generateHearts = () => {
      const heartsContainer = document.getElementById('hearts-container');
      if (!heartsContainer) return;
      
      // Clear any existing hearts first
      heartsContainer.innerHTML = '';
      
      const numberOfHearts = window.innerWidth < 768 ? 20 : 35;
      const animationClasses = ['float-slow', 'float-medium', 'float-fast'];
      
      for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-element');
        
        // Randomize heart properties
        const size = Math.floor(Math.random() * 25) + 15; // 15-40px
        const opacity = (Math.random() * 0.5 + 0.3).toFixed(1); // 0.3-0.8
        const colorOptions = ['#e8a3a3', '#c45858', '#e57373', '#d46c6c', '#ff7b7b', '#d8315b'];
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        const animationDelay = `${Math.random() * 5}s`;
        const animationClass = animationClasses[Math.floor(Math.random() * animationClasses.length)];
        
        // Position hearts randomly
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.opacity = opacity;
        heart.style.backgroundColor = color;
        heart.style.animationDelay = animationDelay;
        heart.classList.add(animationClass);
        
        // Create a unique ID for this heart
        const heartId = `heart-${i}`;
        heart.id = heartId;
        
        // Create style for pseudoelements
        const styleElement = document.createElement('style');
        styleElement.textContent = `
          #${heartId}:before, #${heartId}:after {
            background-color: ${color};
            height: ${size}px;
            width: ${size}px;
          }
          #${heartId}:before {
            top: -${size / 2}px;
          }
          #${heartId}:after {
            left: ${size / 2}px;
          }
        `;
        document.head.appendChild(styleElement);
        
        heartsContainer.appendChild(heart);
      }
    };
    
    generateHearts();
    
    // Add animation to reveal the message
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    // Regenerate hearts on window resize
    const handleResize = () => {
      generateHearts();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-love">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>
      </div>
      
      {/* Rose Corners */}
      <div className="rose-corner rose-top-left animate-appear">
        <Rose className="hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="rose-corner rose-top-right animate-appear animation-delay-300">
        <Rose className="hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="rose-corner rose-bottom-left animate-appear animation-delay-600">
        <Rose className="hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="rose-corner rose-bottom-right animate-appear animation-delay-900">
        <Rose className="hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Small decorative roses */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-60 animate-float-small animation-delay-400">
        <Rose />
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-8 h-8 opacity-60 animate-float-small animation-delay-800">
        <Rose />
      </div>
      
      {/* Falling Rose Petals */}
      <div id="petals-container" className="petals-container"></div>
      
      {/* Floating Hearts Container */}
      <div id="hearts-container" className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      {/* Main Content */}
      <div className={`z-10 text-center max-w-4xl mx-auto relative px-4 transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 md:p-14 rounded-3xl shadow-2xl border border-soft-rose border-opacity-40">
          <h1 className="font-great-vibes text-7xl sm:text-8xl md:text-9xl mb-6 text-deep-rose animate-glow">
            Alaa
          </h1>
          
          <p className="font-dancing-script text-4xl sm:text-5xl md:text-6xl text-soft-rose mb-8 animate-gentle-bounce">
            I love you
          </p>
          
          {/* Decorative heart divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-soft-rose"></div>
            <Heart 
              className="h-10 w-10 mx-4 text-soft-rose animate-pulse-slow interactive-heart relative" 
              onClick={handleHeartClick}
            />
            <div className="h-0.5 w-24 bg-gradient-to-l from-transparent to-soft-rose"></div>
          </div>

          {/* Interactive heart burst effects */}
          {heartBursts.map(burst => (
            <div 
              key={burst.id}
              className="heart-burst"
              style={{
                left: `${burst.x}px`,
                top: `${burst.y}px`,
                color: burst.color
              }}
            >
              <Heart className="h-10 w-10 text-current" />
            </div>
          ))}
          
          {/* Personal message */}
          <div className="max-w-2xl mx-auto italic text-gray-700 leading-relaxed mb-8 text-lg md:text-xl">
            <p className="mb-4 font-dancing-script">
              Every day with you feels like a beautiful dream. Your smile lights up my world, and your laughter is the most beautiful melody I've ever heard.
            </p>
            <p className="mb-4 font-dancing-script">
              You're not just beautiful on the outside, but your kind heart and caring soul make you truly extraordinary. I'm the luckiest person alive to have you in my life.
            </p>
            <p className="font-dancing-script">
              Forever yours, with all my heart and soul.
            </p>
          </div>
          
          {/* Date Counter Section */}
          <div className="mt-8 mb-6 bg-soft-rose bg-opacity-10 rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="font-dancing-script text-2xl text-deep-rose mb-2">Together Since</h3>
            <div className="font-great-vibes text-3xl text-deep-rose mb-3">{formattedStartDate}</div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart 
                className="h-4 w-4 text-soft-rose interactive-heart" 
                onClick={handleHeartClick}
              />
              <span className="text-gray-700 font-dancing-script text-xl">
                {daysTogether} {daysTogether === 1 ? 'day' : 'days'} of love
              </span>
              <Heart 
                className="h-4 w-4 text-soft-rose interactive-heart" 
                onClick={handleHeartClick}
              />
            </div>
            
            {/* Detailed time counter */}
            <div className="flex flex-wrap justify-center gap-3 text-center">
              <div className="bg-white bg-opacity-50 px-3 py-2 rounded-lg w-20 sm:w-24">
                <div className="text-xl sm:text-2xl font-semibold text-deep-rose">
                  {Math.floor(secondsTogether / 86400)}
                </div>
                <div className="text-xs text-gray-600">Days</div>
              </div>
              
              <div className="bg-white bg-opacity-50 px-3 py-2 rounded-lg w-20 sm:w-24">
                <div className="text-xl sm:text-2xl font-semibold text-deep-rose">
                  {Math.floor((secondsTogether % 86400) / 3600).toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-600">Hours</div>
              </div>
              
              <div className="bg-white bg-opacity-50 px-3 py-2 rounded-lg w-20 sm:w-24">
                <div className="text-xl sm:text-2xl font-semibold text-deep-rose">
                  {Math.floor((secondsTogether % 3600) / 60).toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-600">Minutes</div>
              </div>
              
              <div className="bg-white bg-opacity-50 px-3 py-2 rounded-lg w-20 sm:w-24">
                <div className="text-xl sm:text-2xl font-semibold text-deep-rose animate-pulse-slow">
                  {(secondsTogether % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-600">Seconds</div>
              </div>
            </div>
          </div>
          
          {/* Love Quote Carousel */}
          <div className="mt-10 mb-8">
            <h3 className="font-dancing-script text-2xl text-deep-rose mb-4">Love Notes</h3>
            <div className="quote-carousel bg-soft-rose bg-opacity-10 rounded-2xl p-6 max-w-lg mx-auto relative shadow-inner">
              {/* Decorative quotes */}
              <div className="absolute -top-2 -left-2 text-4xl text-soft-rose opacity-30">"</div>
              <div className="absolute -bottom-6 -right-2 text-4xl text-soft-rose opacity-30">"</div>
              
              {loveQuotes.map((quote, index) => (
                <div 
                  key={index} 
                  className={`quote-slide ${index === currentQuoteIndex ? 'active' : ''}`}
                >
                  <p className="text-gray-700 italic font-dancing-script text-xl px-4">"{quote}"</p>
                </div>
              ))}
              
              {/* Indicator dots */}
              <div className="flex justify-center gap-1 mt-6">
                {loveQuotes.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex 
                        ? 'bg-soft-rose w-4' 
                        : 'bg-soft-rose bg-opacity-30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Love Letter */}
          <LoveLetter message={loveLetter} />
          
          {/* Decorative footer */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Heart 
              className="h-6 w-6 text-soft-rose opacity-70 interactive-heart" 
              onClick={handleHeartClick}
            />
            <Heart 
              className="h-6 w-6 text-soft-rose opacity-70 interactive-heart" 
              onClick={handleHeartClick}
            />
            <Heart 
              className="h-6 w-6 text-soft-rose opacity-70 interactive-heart" 
              onClick={handleHeartClick}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
