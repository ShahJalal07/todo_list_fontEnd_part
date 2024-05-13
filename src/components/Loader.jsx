
import { useState, useEffect } from 'react';

const Loader = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prev) => {
        if (prev.length === 3) {
          return '';
        } else {
          return prev + '.';
        }
      });
    }, 200);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className='flex items-center justify-center h-screen bg-red-200'>
      <h1 className='text-6xl font-bold'>Loading{dots}</h1>
    </div>
  )
}

export default Loader
