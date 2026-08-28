
import { useContext, useState } from 'react'
import { ThemeContext, ThemeProvider } from '../context/themeContext'

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false)

    const { theme } = useContext(ThemeContext)

    return (
        // <section className=''>
        //     <h1 className=''>Hello Workd without dark</h1>
        // </section>
    <ThemeProvider>
        <div className="bg-orange-700 text-amber-50">
                <h2 className=''>Dark Mode</h2>
                <p>{ theme }</p>
        </div>          
    </ThemeProvider>
  )
}

export default DarkMode
