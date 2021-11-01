import { createContext, FC, useEffect, useState } from 'react'
import Apps from './pages/Apps'
import css from './App.module.css'

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
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = ''
    }
    localStorage.setItem(themeModeKey, themeMode.toString())
  }
  autoTheme.addEventListener('change', setTheme)
  useEffect(setTheme)

  const [collapsed, setCollapsed] = useState(false)

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <div className={css.app}>
        <div className={`${css.sider} ${collapsed ? css.siderCollapsed : ''}`}>
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
        <div className={css.content}>
          <Apps></Apps>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
