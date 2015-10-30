import {
  Q,
  POST,
  GET,
} from '../middlewares/query-processor'

export const FETCH_THEMES = 'CHANGE_THEMES'
export function fetchThemes() {
  return {
    [Q]: {
      path: '',
    },
  }
}

export const CHANGE_THEME = 'CHANGE_THEME'
export function changeTheme(theme) {
  return {
    type: CHANGE_THEME,
    theme,
  }
}
