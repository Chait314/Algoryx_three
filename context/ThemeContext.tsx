"use client"
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = "dark" | "light"

interface ThemeContextType {
    theme : Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType| undefined>(undefined);

export function ThemeProvider({children}: {children: React.ReactNode}){
    const [ theme, setTheme ] = useState<Theme>('light');
    useEffect(()=> {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const sysprefersdark = window.matchMedia('(prefers-color-scheme: dark)').matches

        const initialTheme = savedTheme || (sysprefersdark ? 'dark':'light');
        if(initialTheme==='dark'){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }
    },[]);

    const toggleTheme = () => {
        const newTheme = theme==='light'?'dark':'light';
        setTheme(newTheme);
        localStorage.setItem('theme',newTheme);
    }
    return (
        <ThemeContext.Provider value = {{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error('useTheme should be inside a themeprovider');
    }
    return context;
}
