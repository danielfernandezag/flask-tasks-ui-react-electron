import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasks, getTasksTodo, getTasksDone } from '../redux/reducers/index';
import TaskItem from './TaskItem';

export class TaskList extends Component {
	render() {
		const { type, tasks, tasksDone, tasksTodo } = this.props;
		return (
			<ul className='list-group'>
				{type === 'all' &&
					tasks.map(task => (
						<li key={task.id} className='list-group-item px-0 py-0 mx-0'>
							<TaskItem task={task} />
						</li>
					))}
				{type === 'todo' &&
					tasksTodo.map(task => (
						<li key={task.id} className='list-group-item px-0 py-0 mx-0'>
							<TaskItem task={task} />
						</li>
					))}
				{type === 'done' &&
					tasksDone.map(task => (
						<li key={task.id} className='list-group-item px-0 py-0 mx-0'>
							<TaskItem task={task} />
						</li>
					))}
			</ul>
		);
	}
}

TaskList.defaultProps = {
	tasks: [],
	tasksTodo: [],
	tasksDone: [],
	type: 'all'
};

const mapStateToProps = state => ({
	tasks: getTasks(state),
	tasksTodo: getTasksTodo(state),
	tasksDone: getTasksDone(state)
});

export default connect(
	mapStateToProps,
	null
)(TaskList);
