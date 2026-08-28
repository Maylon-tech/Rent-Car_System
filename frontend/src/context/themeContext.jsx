import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light") 
    
    const ToggleTheme = () => {
        const updateTheme = theme === "light" ? "dark" : "light"
        setTheme(updateTheme)
    }

    return (
        <ThemeContext.Provider
            value={{ theme, ToggleTheme }}
        >
            { children }
        </ThemeContext.Provider>
    )
}


 