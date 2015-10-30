import {CHANGE_THEME} from '../actions/themes'

export function theme(state = {}, action) {
  let {type, theme} = action
  switch (type) {
    case CHANGE_THEME:
      return theme
    default: return state
  }
}
