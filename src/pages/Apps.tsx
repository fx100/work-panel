import { FC, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import css from './Apps.module.css'

const icons = import.meta.globEager('../assets/*.jpg')

interface App {
  id: number
  icon?: string
  name: string
  apps?: App[]
}

// 拖拽动画时长 单位：毫秒
const dragAnimation = 150

const Apps: FC = () => {
  const [apps, setApps] = useState<App[]>([
    {
      id: 1,
      name: '有图标',
      apps: [
        {
          id: 11,
          icon: icons['../assets/baidu.jpg'].default,
          name: '百度',
        },
        {
          id: 12,
          icon: icons['../assets/dingding.jpg'].default,
          name: '钉钉',
        },
        {
          id: 13,
          icon: icons['../assets/kugou.jpg'].default,
          name: '酷狗',
        },
        {
          id: 14,
          icon: icons['../assets/spotify.jpg'].default,
          name: 'Spotify',
        },
        {
          id: 15,
          icon: icons['../assets/tieba.jpg'].default,
          name: '贴吧',
        },
        {
          id: 16,
          icon: icons['../assets/toutiao.jpg'].default,
          name: '今日头条',
        },
        {
          id: 17,
          icon: icons['../assets/twitter.jpg'].default,
          name: 'Twitter',
        },
        {
          id: 18,
          icon: icons['../assets/wangyiyun.jpg'].default,
          name: '网易云音乐',
        },
        {
          id: 19,
          icon: icons['../assets/weibo.jpg'].default,
          name: '微博',
        },
        {
          id: 20,
          icon: icons['../assets/weixin.jpg'].default,
          name: '微信',
        },
        {
          id: 21,
          icon: icons['../assets/zhihu.jpg'].default,
          name: '知乎',
        },
      ],
    },
    {
      id: 2,
      name: '无图标',
      apps: [
        {
          id: 211,
          name: '百度',
        },
        {
          id: 212,
          name: '钉钉',
        },
        {
          id: 213,
          name: '酷狗',
        },
        {
          id: 214,
          name: 'Spotify',
        },
        {
          id: 215,
          name: '贴吧',
        },
        {
          id: 216,
          name: '今日头条',
        },
        {
          id: 217,
          name: 'Twitter',
        },
        {
          id: 218,
          name: '网易云音乐',
        },
        {
          id: 219,
          name: '微博',
        },
        {
          id: 220,
          name: '微信',
        },
        {
          id: 221,
          name: '知乎',
        },
      ],
    },
  ])
  const setSubApps = (index: number, subApps: App[]) => {
    const newApps = [...apps]
    newApps[index].apps = subApps
    setApps(newApps)
  }

  return (
    <div className={css.page}>
      <div className={css.header}>
        <div className={css.control}>
          全部应用
          <svg className={css.controlIcon} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z"></path>
          </svg>
        </div>
      </div>
      <ReactSortable
        className={css.groups}
        ghostClass={css.ghost}
        group="groups"
        list={apps}
        setList={setApps}
        animation={dragAnimation}
      >
        {apps.map((item, index) => (
          <div className={css.group} key={item.id}>
            <div className={css.groupName}>{item.name}</div>
            <ReactSortable
              className={css.apps}
              ghostClass={css.ghost}
              group="apps"
              list={item.apps}
              setList={(apps) => setSubApps(index, apps)}
              animation={dragAnimation}
            >
              {item.apps?.map((item) => (
                <div className={css.app} key={item.id}>
                  {item?.icon ? (
                    <img className={css.appLogo} src={item.icon} />
                  ) : (
                    <div className={`${css.appLogo} ${css.appLogoText}`}>{item.name.slice(0, 1)}</div>
                  )}
                  <div className={css.appName}>{item.name}</div>
                </div>
              ))}
            </ReactSortable>
          </div>
        ))}
      </ReactSortable>
    </div>
  )
}

export default Apps
