
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Sample texts for typing test
const sampleTexts = [
  "Artificial intelligence is transforming how we interact with technology. The future of AI lies in its integration with daily human activities.",
  "Machine learning algorithms can identify patterns in data that humans might miss. This capability enables predictive analytics across many fields.",
  "Natural language processing allows computers to understand human communication. This technology powers virtual assistants and translation services.",
  "The ethical implications of AI development are important considerations. We must build systems that align with human values and priorities.",
  "Data science combines statistics, programming, and domain knowledge. Effective data scientists blend technical skills with business acumen."
];

export const TypingSpeedTest: React.FC = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  const startTest = () => {
    // Get a random text from the sample texts
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setUserInput('');
    setTimer(0);
    setIsActive(true);
    setIsComplete(false);
    setStartTime(Date.now());
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    
    // Check if the test is complete
    if (value === text) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - startTime) / 60000;
      const wordsCount = text.split(' ').length;
      const calculatedWpm = Math.round(wordsCount / timeInMinutes);
      
      setWpm(calculatedWpm);
      setIsActive(false);
      setIsComplete(true);
      toast.success(`Test completed! Your speed: ${calculatedWpm} WPM`, {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Button 
          onClick={startTest} 
          variant="outline"
          className="border-purple-500 text-purple-300 hover:text-white hover:bg-purple-700"
        >
          {isActive ? 'Restart Test' : 'Start Test'}
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
            <div className="absolute inset-0 p-4 text-gray-500 pointer-events-none font-mono text-lg bg-transparent whitespace-pre-wrap min-h-[120px] overflow-y-auto">
              {text}
            </div>
            {/* User input field */}
            <div className="relative">
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={userInput}
                onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                disabled={isComplete}
                className="w-full p-4 bg-transparent border border-purple-500/50 rounded-md font-mono text-lg text-white caretColor-purple-500 outline-none focus:border-purple-500 min-h-[120px]"
                style={{ color: 'transparent', caretColor: 'white', resize: 'none' }}
              />
              <div className="absolute inset-0 p-4 pointer-events-none font-mono text-lg whitespace-pre-wrap min-h-[120px] overflow-y-auto">
                {userInput.split('').map((char, index) => (
                  <span key={index} className={char === text[index] ? 'text-green-400' : 'text-red-500'}>
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-purple-200">
            <div>Accuracy: {accuracy}%</div>
            {isComplete && <div>Speed: {wpm} WPM</div>}
          </div>
        </>
      ) : (
        <div className="text-center text-purple-200 p-4 min-h-[120px] flex items-center justify-center">
          Click the button above to start a typing test
        </div>
      )}
    </div>
  );
};
