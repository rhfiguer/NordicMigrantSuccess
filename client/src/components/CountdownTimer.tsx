
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedEndTime = localStorage.getItem('offerEndTime');
    if (savedEndTime) {
      const remaining = Math.max(0, parseInt(savedEndTime) - Date.now());
      return remaining > 0 ? remaining : 24 * 60 * 60 * 1000;
    }
    const endTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('offerEndTime', endTime.toString());
    return 24 * 60 * 60 * 1000;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - 1000);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="font-mono mt-2 text-center">
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default CountdownTimer;
