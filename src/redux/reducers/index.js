import { combineReducers } from 'redux';

import tasksState, * as fromTasks from './tasksReducer';

export default combineReducers({
	tasksState
});

export const getTasks = state => fromTasks.getTasks(state.tasksState);
export const getTasksTodo = state => fromTasks.getTasksTodo(state.tasksState);
export const getTasksDone = state => fromTasks.getTasksDone(state.tasksState);
