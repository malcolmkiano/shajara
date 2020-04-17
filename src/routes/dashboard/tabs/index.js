// tab icons
import { HomeIcon, EntriesIcon, MoodsIcon, SearchIcon, SettingsIcon } from '../../../images'

// tab components
import { default as  Home } from './home/'
import { default as Entries } from './entries'
import { default as Moods } from './moods'
import { default as Search } from './search'
import { default as Settings } from './settings'

const withBase = (path='') => '/dashboard/' + path
const tabs = [
  { route: withBase(), component: Home, title: 'Home', icon: HomeIcon, exact: true },
  { route: withBase('entries'), component: Entries, title: 'Entries', icon: EntriesIcon },
  { route: withBase('moods'), component: Moods, title: 'Moods', icon: MoodsIcon, premium: true },
  { route: withBase('search'), component: Search, title: 'Search', icon: SearchIcon, premium: true },
  { route: withBase('settings'), component: Settings, title: 'Settings', icon: SettingsIcon }
]

export { tabs }