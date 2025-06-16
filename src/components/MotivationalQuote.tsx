
import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MotivationalQuote: React.FC = () => {
  const quotes = [
    {
      text: "Honey badger don't care about your excuses!",
      author: "Nature's Most Fearless"
    },
    {
      text: "Be like a honey badger: small in size, unlimited in determination.",
      author: "Wildlife Wisdom"
    },
    {
      text: "When life gets tough, channel your inner honey badger.",
      author: "Badger Philosophy"
    },
    {
      text: "Honey badgers tackle challenges head-on. No task is too big!",
      author: "Badger Mindset"
    },
    {
      text: "Fearless, focused, and absolutely unstoppable.",
      author: "The Honey Badger Way"
    },
    {
      text: "Size doesn't matter when you have honey badger attitude.",
      author: "Small But Mighty"
    },
    {
      text: "Adapt, overcome, and never give up - that's the badger way!",
      author: "Survival Instinct"
    },
    {
      text: "Be so determined that even the impossible becomes possible.",
      author: "Badger Determination"
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  const getNewQuote = () => {
    const newIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(newIndex);
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black text-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">💪 Daily Motivation</h3>
        <Button
          size="sm"
          variant="ghost"
          onClick={getNewQuote}
          className="text-white hover:bg-gray-700 p-2"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      <blockquote className="mb-4">
        <p className="text-lg font-medium leading-relaxed mb-3">
          "{quotes[currentQuote].text}"
        </p>
        <footer className="text-amber-400 font-semibold">
          — {quotes[currentQuote].author}
        </footer>
      </blockquote>
    </div>
  );
};

export default MotivationalQuote;
