import { createContext, FC, useEffect, useState, useRef } from 'react'
import useSize from '@react-hook/size'
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

enum SiderCollapsed { false = '0', true = '1' }
const siderCollapsedKey = 'siderCollapsed'
const siderCollapsedBreakpoint = 640

const App: FC = () => {
  const appRef = useRef(null)

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

  const [collapsed, setCollapsed] = useState(localStorage.getItem(siderCollapsedKey) === SiderCollapsed.true)
  useEffect(() => {
    localStorage.setItem(siderCollapsedKey, collapsed ? SiderCollapsed.true : SiderCollapsed.false)
  })
  const appSize = useSize(appRef)
  const [lastAppSize, setLastAppSize] = useState([0, 0])
  useEffect(() => {
    const lastAppWidth = lastAppSize[0]
    const appWidth = appSize[0]
    if (lastAppWidth === 0) {
      setLastAppSize(appSize)
    } else if (appWidth < siderCollapsedBreakpoint) {
      if (lastAppWidth >= siderCollapsedBreakpoint) {
        setLastAppSize(appSize)
        setCollapsed(true)
      }
    } else {
      if (lastAppWidth < siderCollapsedBreakpoint) {
        setLastAppSize(appSize)
        setCollapsed(false)
      }
    }
  }, [appSize[0]])

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <div className={css.app} ref={appRef}>
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
