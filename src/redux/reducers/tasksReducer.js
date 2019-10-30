import { createSelector } from 'reselect';

const initialTasksState = {
	tasks: [],
	filter: 'all',
	keyword: '',
	loading: false,
	selectedTask: {}
};

export const getTasks = createSelector(
	state => state.tasks,
	state => state.filter,
	state => state.keyword,
	(tasks, filter, keyword) => {
		switch (filter) {
			case 'done':
				return tasks.filter(task => task.done !== false);
			case 'todo':
				return tasks.filter(task => task.done !== true);
			case 'search':
				return tasks.filter(task => (task.name.toLowerCase().includes(keyword.toLowerCase()) || task.content.toLowerCase().includes(keyword.toLowerCase())) && task);
			case 'all':
				return tasks;
			default:
				return tasks;
		}
	}
);

export const getTasksDone = createSelector(
	state => state.tasks,
	tasks => tasks.filter(task => task.done !== false)
);

export const getTasksTodo = createSelector(
	state => state.tasks,
	tasks => tasks.filter(task => task.done !== true)
);

const tasksState = (state = initialTasksState, action) => {
	switch (action.type) {
		case 'FETCH_LOADING':
			return {
				...state,
				loading: true
			};
		case 'FETCH_DONE':
			return {
				...state,
				loading: false
			};
		case 'SET_TASKS':
			return {
				...state,
				tasks: action.tasks
			};
		case 'ADD_TASK':
			return {
				...state,
				tasks: [...state.tasks, action.task]
			};
		case 'DELETE_TASK':
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== action.id)
			};
		case 'TOGGLE_TASK_DONE':
			return {
				...state,
				tasks: state.tasks.map(task => (task.id === action.id ? { ...task, done: action.done } : task))
			};
		case 'UPDATE_TASK_NAME':
			return {
				...state,
				tasks: state.tasks.map(task => (task.id === action.id ? { ...task, name: action.name } : task))
			};
		case 'UPDATE_TASK_CONTENT':
			return {
				...state,
				tasks: state.tasks.map(task => (task.id === action.id ? { ...task, content: action.content } : task))
			};
		case 'FILTER_TASKS':
			return {
				...state,
				filter: action.filter,
				keyword: action.keyword
			};
		case 'SELECT_TASK':
			return {
				...state,
				selectedTask: state.tasks.filter(task => task.id === action.id)
			};
		case 'ALL_DONE':
			return {
				...state,
				tasks: state.tasks.map(task => ({ ...task, done: true }))
			};
		case 'ALL_TODO':
			return {
				...state,
				tasks: state.tasks.map(task => ({ ...task, done: false }))
			};
		case 'DELETE_ALL_TASKS':
			return {
				...state,
				tasks: [],
				filter: 'all',
				keyword: '',
				loading: false,
				selectedTask: {}
			};

		default:
			return state;
	}
};

export default tasksState;
