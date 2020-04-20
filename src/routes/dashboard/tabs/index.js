// tab icons
import { HomeIcon, EntriesIcon, MoodsIcon, SearchIcon, SettingsIcon } from '../../../images'

// tab components
import { default as Home } from './home/'
import { default as Entries } from './entries'
import { default as Moods } from './moods'
import { default as Search } from './search'
import { default as Settings } from './settings'
import { default as EntryForm } from './entry-form'

const withBase = (path = '') => '/dashboard/' + path
const tabs = [
  { route: withBase(), component: Home, title: 'Home', icon: HomeIcon, exact: true },
  { route: withBase('entries'), component: Entries, title: 'Entries', icon: EntriesIcon },
  { route: withBase('moods'), component: Moods, title: 'Moods', icon: MoodsIcon },
  { route: withBase('search'), component: Search, title: 'Search', icon: SearchIcon },
  { route: withBase('settings'), component: Settings, title: 'Settings', icon: SettingsIcon }
]

export { Home, Entries, Moods, Search, Settings, EntryForm }

export default tabs