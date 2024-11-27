import { useEffect,useState } from "react";

const usePreferredColorScheme = () => {
    const getPreferredScheme = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
    const [colorScheme, setColorScheme] = useState(getPreferredScheme);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => setColorScheme(getPreferredScheme);
  
      mediaQuery.addEventListener('change', handleChange);
  
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }, []);
  
    return colorScheme;
  };

export default usePreferredColorScheme;