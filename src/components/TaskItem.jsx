import React, { Component } from 'react';
import { connect } from 'react-redux';
import storeActions from '../redux/actions/index';

export class TaskItem extends Component {
	render() {
		const { task, fetchToggleTaskDone, fetchDeleteTask } = this.props;
		return (
			<div className='card container'>
				<div className='card-body px-0'>
					<div className='container'>
						<div className='row'>
							<div className='col-sm'>
								<h5 className='card-title text-dark'>{task.name}</h5>
							</div>
							<div className='col-sm'>
								<h6>
									<span class={`badge ${task.done ? 'badge-success' : 'badge-info'}`}>{task.done ? 'done' : 'todo'}</span>
								</h6>
							</div>
						</div>
					</div>
					<p className='card-text text-dark'>{task.content}</p>
					<div class='row'>
						<div class='col-sm'>
							<a href={false} className={`btn btn-sm ${task.done ? 'btn-success' : 'btn-info'} btn-block`} onClick={() => fetchToggleTaskDone(task.id)}>
								{task.done ? 'Not done' : 'Done'}
							</a>
						</div>
						<div class='col-sm'>
							<a href={false} className='btn btn-sm btn-danger btn-block' onClick={() => fetchDeleteTask(task.id)}>
								Delete
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TaskItem.defaultProps = {
	task: {
		name: 'mock task name',
		content: 'mock task content',
		done: false
	},
	fetchToggleTaskDone: () => console.log('no action provided'),
	fetchDeleteTask: () => console.log('no action provided')
};

const mapDispatchToProps = {
	fetchToggleTaskDone: storeActions.fetchToggleTaskDone,
	fetchDeleteTask: storeActions.fetchDeleteTask
};

export default connect(
	null,
	mapDispatchToProps
)(TaskItem);
