
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Sample texts for typing test
const sampleTexts = [
  "Artificial intelligence is transforming how we interact with technology. The future of AI lies in its integration with daily human activities.",
  "Machine learning algorithms can identify patterns in data that humans might miss. This capability enables predictive analytics across many fields.",
  "Natural language processing allows computers to understand human communication. This technology powers virtual assistants and translation services.",
  "The ethical implications of AI development are important considerations. We must build systems that align with human values and priorities.",
  "Data science combines statistics, programming, and domain knowledge. Effective data scientists blend technical skills with business acumen."
];

// Fantasy firework component
const FantasyFirework = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const createParticles = () => {
      const newParticles: JSX.Element[] = [];
      const colors = [
        '#9b87f5', '#8B5CF6', '#D946EF', '#F97316', 
        '#0EA5E9', '#33C3F0', '#ea384c', '#7E69AB'
      ];
      
      // Create multiple particles with random positions, colors, and animations
      for (let i = 0; i < 100; i++) {
        const size = Math.random() * 8 + 4; // Random size between 4-12px
        const x = Math.random() * 100; // Random horizontal position
        const y = Math.random() * 100; // Random vertical position
        const duration = Math.random() * 2 + 1; // Random animation duration
        const delay = Math.random() * 0.5; // Random delay
        const color = colors[Math.floor(Math.random() * colors.length)]; // Random color
        
        newParticles.push(
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              left: `${x}%`,
              top: `${y}%`,
              opacity: 0,
              transform: 'scale(0)',
              animation: `
                fireworkFade ${duration}s ease-out ${delay}s forwards,
                fireworkScale ${duration}s ease-out ${delay}s forwards,
                fireworkMove ${duration}s ease-out ${delay}s forwards
              `
            }}
          />
        );
      }
      
      setParticles(newParticles);
    };
    
    createParticles();
    
    // Cleanup
    return () => {
      setParticles([]);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {particles}
      <style>
        {`
          @keyframes fireworkFade {
            0% { opacity: 0; }
            10% { opacity: 1; }
            80% { opacity: 0.8; }
            100% { opacity: 0; }
          }
          @keyframes fireworkScale {
            0% { transform: scale(0); }
            10% { transform: scale(1); }
            100% { transform: scale(0); }
          }
          @keyframes fireworkMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px); }
          }
        `}
      </style>
    </div>
  );
};

export const TypingSpeedTest: React.FC = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [cpm, setCpm] = useState(0); // Changed from wpm to cpm
  const [accuracy, setAccuracy] = useState(100);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const startTest = () => {
    // Set expanded state first for animation
    setIsExpanded(true);
    
    // Small delay to allow animation to play before starting the test
    setTimeout(() => {
      // Get a random text from the sample texts
      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setText(randomText);
      setUserInput('');
      setTimer(0);
      setIsActive(true);
      setIsComplete(false);
      setStartTime(Date.now());
      setShowFireworks(false);
      
      // Focus the input after expansion animation
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }, 400);
  };

  const resetTest = () => {
    setText('');
    setUserInput('');
    setTimer(0);
    setIsActive(false);
    setIsComplete(false);
    setCpm(0); // Changed from wpm to cpm
    setAccuracy(100);
    setShowFireworks(false);
    setIsExpanded(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);
    
    // Check if the test is complete
    if (value === text) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - startTime) / 60000;
      const charactersCount = text.length; // Count characters instead of words
      const calculatedCpm = Math.round(charactersCount / timeInMinutes); // Calculate CPM instead of WPM
      
      setCpm(calculatedCpm); // Changed from wpm to cpm
      setIsActive(false);
      setIsComplete(true);
      
      // Show fireworks if accuracy is 100%
      if (accuracy === 100) {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 3000); // Hide fireworks after 3 seconds
      }
      
      toast.success(`Test completed! Your speed: ${calculatedCpm} CPM`, { // Changed from WPM to CPM
        description: `Accuracy: ${accuracy}%`
      });
    }
    
    // Calculate accuracy
    let correctChars = 0;
    const inputLength = value.length;
    
    for (let i = 0; i < inputLength; i++) {
      if (value[i] === text[i]) {
        correctChars++;
      }
    }
    
    const calculatedAccuracy = Math.round((correctChars / inputLength) * 100) || 100;
    setAccuracy(calculatedAccuracy);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 relative">
      {showFireworks && <FantasyFirework />}
      
      <AnimatePresence>
        {!isExpanded ? (
          // Initial small window with centered button
          <motion.div 
            key="small-view"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-10"
          >
            <Button 
              onClick={startTest} 
              variant="outline"
              className="border-purple-500 text-purple-300 hover:text-white hover:bg-purple-700 px-8 py-6 text-lg"
            >
              Start Test
            </Button>
          </motion.div>
        ) : (
          // Expanded view with the typing test
          <motion.div
            key="expanded-view"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-4">
              <Button 
                onClick={isComplete ? resetTest : startTest} 
                variant="outline"
                className="border-purple-500 text-purple-300 hover:text-white hover:bg-purple-700"
              >
                {isComplete ? 'New Test' : isActive ? 'Restart Test' : 'Start Test'}
              </Button>
              {isActive && (
                <div className="text-white font-mono text-lg">
                  {formatTime(timer)}
                </div>
              )}
            </div>
            
            {isActive || isComplete ? (
              <>
                <div className="relative mb-4">
                  {/* Text display - using min-height to ensure sufficient space */}
                  <div className="absolute inset-0 p-4 text-gray-500 pointer-events-none font-mono text-lg bg-transparent whitespace-pre-wrap min-h-[180px] overflow-y-auto">
                    {text}
                  </div>
                  {/* User input field */}
                  <div className="relative">
                    <textarea
                      ref={inputRef}
                      value={userInput}
                      onChange={handleChange}
                      disabled={isComplete}
                      className="w-full p-4 bg-transparent border border-purple-500/50 rounded-md font-mono text-lg text-white caretColor-purple-500 outline-none focus:border-purple-500 min-h-[180px]"
                      style={{ color: 'transparent', caretColor: 'white', resize: 'none' }}
                    />
                    <div className="absolute inset-0 p-4 pointer-events-none font-mono text-lg whitespace-pre-wrap min-h-[180px] overflow-y-auto">
                      {userInput.split('').map((char, index) => (
                        <span key={index} className={char === text[index] ? 'text-green-400' : 'text-red-500'}>
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-purple-200">
                  <div className={accuracy === 100 ? "text-yellow-300 font-bold animate-pulse" : ""}>
                    Accuracy: {accuracy}%
                  </div>
                  {isComplete && <div>Speed: {cpm} CPM</div>} {/* Changed from WPM to CPM */}
                </div>
              </>
            ) : (
              <div className="text-center text-purple-200 p-4 min-h-[180px] flex items-center justify-center">
                Click the button above to start a typing test
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
