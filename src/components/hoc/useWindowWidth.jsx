import React, { useState, useEffect } from 'react';

const useWindowWidth = (WrappedComponent) => (props) => {
    const [width, setWidth] = useState(screen.width);
  
    useEffect(() => {
      const handleResize = () => {console.log(screen.width);setWidth(screen.width);}
  
      window.addEventListener('orientationchange', handleResize);
  
      return () => {
        window.removeEventListener('orientationchange', handleResize);
      };
    }, []);
  
    return (    <WrappedComponent {...props} width={width} />
    )
  }

export default useWindowWidth;