import { createContext, FC, useEffect, useState } from 'react'
import Apps from './pages/Apps'

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

  const [collapsed, setCollapsed] = useState(false)

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <div className="h-screen bg-white dark:bg-dark-900 text-black dark:text-white text-opacity-85 dark:text-opacity-85 flex">
        <div className={`box-content border-r border-r-light-500 dark:border-r-dark-500 transition-width ${collapsed ? 'w-12' : 'w-60'}`}>
          <button onClick={() => setCollapsed(!collapsed)}>切换</button>
          <br />
          <br />
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
          <br />
          <button onClick={() => setThemeMode(ThemeMode.auto)}>自动</button>
          <br />
          <button onClick={() => setThemeMode(ThemeMode.light)}>浅色</button>
          <br />
          <button onClick={() => setThemeMode(ThemeMode.dark)}>深色</button>
        </div>
        <div className="flex-1">
          <Apps></Apps>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
