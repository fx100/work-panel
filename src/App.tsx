import { createContext, FC, useEffect, useState } from 'react'

export enum ThemeMode { auto, light, dark }
export const themeModeKey = 'themeMode'
const themeModeLocal = localStorage.getItem(themeModeKey)
const themeModeDefault = {
  themeMode: ThemeMode.auto,
  setThemeMode: (themeMode: ThemeMode) => {},
}
export const ThemeContext = createContext(themeModeDefault)
const autoTheme = matchMedia('(prefers-color-scheme: dark)')

const App: FC = () => {
  const [themeMode, setThemeMode] = useState(themeModeLocal ? parseInt(themeModeLocal) : themeModeDefault.themeMode)
  const setTheme = () => {
    if (themeMode === ThemeMode.auto ? autoTheme.matches : themeMode === ThemeMode.dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem(themeModeKey, themeMode.toString())
  }
  autoTheme.addEventListener('change', setTheme)
  useEffect(setTheme)

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <div className="h-screen bg-white dark:bg-dark-900 text-black dark:text-white text-opacity-85 dark:text-opacity-85">
        <ThemeContext.Consumer>{(value) => {
          switch(value.themeMode) {
            case ThemeMode.auto:
              return '自动'
            case ThemeMode.light:
              return '浅色'
            case ThemeMode.dark:
              return '深色'
          }
        }}</ThemeContext.Consumer>
        <br />
        <button onClick={() => setThemeMode(ThemeMode.auto)}>自动</button>
        <button onClick={() => setThemeMode(ThemeMode.light)}>浅色</button>
        <button onClick={() => setThemeMode(ThemeMode.dark)}>深色</button>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
