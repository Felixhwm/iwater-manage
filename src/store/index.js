import { combineReducers, createStore } from 'redux';

//state
const initialState = [
  { text: 'JavaScript', complete: false, id: 0}
]

//action-type
export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'


const todos = (state = initialState, action) => {
	switch(action.type) {
    case ADD_TODO:
    console.log(action)
      return [
        {
          id: 2,
          text: action.text,
          completed: false   
        },
        ...state
      ]
    case DELETE_TODO:
      return state.filter(item => item.id !== action.id)
		default: 
			return state
	}
}

const reducers = combineReducers({ 
  todos
});

export default createStore(reducers)