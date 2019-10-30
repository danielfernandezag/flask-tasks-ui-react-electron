import axios from 'axios';

const url = 'http://192.168.1.18:5000/tasks';

// REDUX CALLS

const fetchLoading = () => ({
	type: 'FETCH_LOADING'
});

const fetchDone = () => ({
	type: 'FETCH_DONE'
});

const setTasks = tasks => ({
	type: 'SET_TASKS',
	tasks
});

const addTask = task => ({
	type: 'ADD_TASK',
	task
});

const deleteTask = task => ({
	type: 'DELETE_TASK',
	id: task.id
});

const toggleTaskDone = task => ({
	type: 'TOGGLE_TASK_DONE',
	id: task.id,
	done: task.done
});

const updateTaskName = task => ({
	type: 'UPDATE_TASK_NAME',
	id: task.id,
	name: task.name
});

const updateTaskContent = task => ({
	type: 'UPDATE_TASK_CONTENT',
	id: task.id,
	content: task.content
});

const toggleAllDone = () => ({
	type: 'ALL_DONE'
});

const toggleAllTodo = () => ({
	type: 'ALL_TODO'
});

const deleteAllTasks = () => ({
	type: 'DELETE_ALL_TASKS'
});

export const selectTask = id => ({
	type: 'SELECT_TASK',
	id
});

export const filterTasks = (filter, keyword = '') => ({
	type: 'FILTER_TASKS',
	filter,
	keyword
});

// API CALLS

export const fetchTasks = () => dispatch => {
	dispatch(fetchLoading());
	setTimeout(
		() =>
			axios
				.get(url + '/all', { mode: 'cors' })
				.then(response => {
					dispatch(setTasks(response.data));
					dispatch(fetchDone());
				})
				.catch(error => {
					console.error(error);
					dispatch(fetchDone());
				}),
		1500
	);
};

export const fetchAddTask = (content, name) => dispatch => {
	dispatch(fetchLoading());
	setTimeout(
		() =>
			axios
				.post(url, {
					name,
					content
				})
				.then(response => {
					dispatch(addTask(response.data));
					dispatch(fetchDone());
				})
				.catch(error => {
					console.error(error);
					dispatch(fetchDone());
				}),
		1500
	);
};

export const fetchDeleteTask = id => dispatch => {
	dispatch(fetchLoading());
	setTimeout(
		() =>
			axios
				.delete(url + '/' + id)
				.then(response => {
					dispatch(deleteTask(response.data));
					dispatch(fetchDone());
				})
				.catch(error => {
					console.error(error);
					dispatch(fetchDone());
				}),
		1500
	);
};

export const fetchToggleTaskDone = id => dispatch => {
	axios
		.put(url + '/done/' + id)
		.then(response => {
			dispatch(toggleTaskDone(response.data));
		})
		.catch(error => {
			console.error(error);
		});
};

export const fetchUpdateTaskName = (id, name) => dispatch => {
	axios
		.put(url + '/name/' + id, {
			name
		})
		.then(response => {
			dispatch(updateTaskName(response.data));
		})
		.catch(error => {
			console.error(error);
		});
};

export const fetchUpdateTaskContent = (id, content) => dispatch => {
	axios
		.put(url + '/content/' + id, {
			content
		})
		.then(response => {
			dispatch(updateTaskContent(response.data));
		})
		.catch(error => {
			console.error(error);
		});
};

export const fetchUpdateTaskDoneAll = done => dispatch => {
	axios
		.put(url + '/done/all', {
			done: done.toString()
		})
		.then(() => {
			if (done) {
				dispatch(toggleAllDone());
			} else {
				dispatch(toggleAllTodo());
			}
		})
		.catch(error => {
			console.error(error);
		});
};

export const fetchDeleteTasksAll = () => dispatch => {
	axios
		.delete(url + '/all')
		.then(() => {
			dispatch(deleteAllTasks());
		})
		.catch(error => {
			console.error(error);
		});
};
