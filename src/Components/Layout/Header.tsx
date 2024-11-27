import React from 'react';

interface HeaderProps {
    colorScheme: string;
    setColorScheme: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({colorScheme, setColorScheme}) => {
    console.log(window.matchMedia('(prefers-color-scheme: dark)'));

    return (
        <header className="bg-light-background shadow-md dark:bg-slate-800">
            <div className="flex items-center justify-between h-16 px-2">
                <h1 className="text-xl font-bold text-light-text dark:text-dark-text">
                    Cat Breeds App1
                </h1>
                <button
                    onClick={() => {
                        if (colorScheme === 'dark'){
                            setColorScheme('light');
                        }
                        else{
                            setColorScheme('dark');
                        }
                    }}
                    className="text-light-text dark:text-dark-text p-2 rounded focus:outline-none"
                >
                    {
                        colorScheme === 'dark' ?
                        <>
                             <span className="sr-only">Toggle Light Mode</span>
                             ☀️
                            </> :
                            <>
                            <span className="sr-only">Toggle Dark Mode</span>
                            🌙
                            </>
                    }
                </button> 
            </div>
        </header >
    );
};

export default Header;