import {
  APPLY_THEME,
  CREATE_THEME,
  UPDATE_THEME,
} from '../actions/themes'

export function themes(state = {}, action) {
  let {type, themes} = action
  switch (type) {
    case CREATE_THEME:
    case UPDATE_THEME:
      return themes
    default: return state
  }
}

export function theme(state = {}, action) {
  let {type, theme} = action
  switch (type) {
    case APPLY_THEME:
      return theme
    default: return state
  }
}
