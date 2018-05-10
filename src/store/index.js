import { combineReducers, createStore } from 'redux';
import * as types from './actionTypes'

//state
const initialState = {
	isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
	width: document.body.clientWidth,
	isSmallScreen:  document.body.clientWidth <= 992
};
const size = (state = initialState, action) => {
	switch(action.type) {
    case types.WINDOW_RESIZE: 
      return {
				...state,
				...action.data
			}
		default: 
			return { ...state }
	}
}

const reducers = combineReducers({ 
  size
});

export default createStore(reducers)