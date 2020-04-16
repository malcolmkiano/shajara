// tab icons
import { HomeIcon, EntriesIcon, MoodsIcon, SearchIcon, SettingsIcon } from '../../../images'

// tab components
import { default as  Home } from './home/'

const withBase = path => '/dashboard/' + path
const tabs = [
  { route: withBase(''), component: Home, title: 'Home', icon: HomeIcon },
  { route: withBase('entries'), component: Home, title: 'Entries', icon: EntriesIcon },
  { route: withBase('moods'), component: Home, title: 'Moods', icon: MoodsIcon },
  { route: withBase('search'), component: Home, title: 'Search', icon: SearchIcon },
  { route: withBase('settings'), component: Home, title: 'Settings', icon: SettingsIcon }
]

export { tabs }