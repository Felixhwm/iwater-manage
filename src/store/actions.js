import * as types from './actionTypes'
//actions

export const windowResize = (data) => ({
  type: types.WINDOW_RESIZE,  
  data
})