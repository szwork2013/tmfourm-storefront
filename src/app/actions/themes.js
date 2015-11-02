import R from 'ramda'

import storage from '../storage'

const THEMES = 'themes'

export const FETCH_THEMES = 'FETCH_THEMES'
export function fetchThemes() {
  let themes = storage.get(THEMES)
  return {
    type: FETCH_THEMES,
    themes,
  }
}

export const CREATE_THEME = 'CREATE_THEME'
export function createTheme(name, theme) {
  let themes = storage.get(THEMES)
  let newThemes = R.merge(themes, {[name]: theme})
  storage.set(THEMES, newThemes)
  return {
    type: CREATE_THEME,
    themes: newThemes,
  }
}

export const UPDATE_THEME = 'UPDATE_THEME'
export function updateTheme(name, updated) {
  let themes = storage.get(THEMES)
  let theme = themes[name]
  let action = {
    type: UPDATE_THEME,
  }
  if (!R.isNil(theme)) {
    let newThemes = R.merge(themes, {[name]: updated})
    storage.set(THEMES, newThemes)
    return R.merge(action, {themes: newThemes})
  } else return R.merge(action, {themes: themes})
}

export const APPLY_THEME = 'APPLY_THEME'
export function applyTheme(name) {
  let themes = storage.get(themes)
  let theme = themes[name]
  return {
    type: APPLY_THEME,
    theme,
  }
}
