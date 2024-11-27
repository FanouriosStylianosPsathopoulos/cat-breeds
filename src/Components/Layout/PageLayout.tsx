import React, { useEffect, useState } from 'react';
import Header from './Header';
import Body from './Body';

const getPreferredScheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    
    const [colorScheme, setColorScheme] = useState(getPreferredScheme);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = () => setColorScheme(getPreferredScheme);
    
        mediaQuery.addEventListener('change', handleChange);
    
        return () => {
          mediaQuery.removeEventListener('change', handleChange);
        };
      }, []);

    return (
        <div className={`min-h-screen ${colorScheme === 'dark' ? 'dark' : ''} `}> 
        <div className='min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-white '>
            <Header colorScheme = {colorScheme} setColorScheme={setColorScheme}/>
            <Body>{children}</Body>
        </div >
        </div>
    );
};

export default PageLayout;