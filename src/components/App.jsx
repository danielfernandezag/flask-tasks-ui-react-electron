import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasks, getTasksTodo, getTasksDone } from '../redux/reducers/index';
import storeActions from '../redux/actions/index';
import NavBar from './NavBar';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';

export class App extends Component {
	componentDidMount() {
		this.props.fetchTasks();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.tasks !== this.props.tasks && this.props.tasks.length > 0) {
			const id = this.props.tasks[0].id;
			this.props.selectTask(id);
		}
	}

	render() {
		const { tasks, tasksDone, tasksTodo, filter, loading } = this.props;
		return (
			<div className='container-fluid px-0 mx-0'>
				<NavBar title='Tasks App' />
				<div className='row px-0 mx-0'>
					<div className='col-sm-2' />
					<div className='col-sm-8'>
						<div className='card '>
							<div className='card-header text-white bg-dark'>
								<TaskForm tasks={tasks} />
							</div>
							<div className='card-body text-white bg-dark'>
								<div className='container'>
									{loading ? (
										<div className='row'>
											<div class='spinner-grow text-primary mx-auto' style={{ width: '4rem', height: '4rem' }} role='status'>
												<span class='sr-only'>Loading...</span>
											</div>
										</div>
									) : (
										<div className='row'>
											{tasks.length > 0 && (
												<div className='col-sm '>
													<h5 className='text-white'>{filter}</h5>
													<TaskList type='all' />
												</div>
											)}
											{tasksTodo.length > 0 && (
												<div className='col-sm '>
													<h5 className='text-white'>To do</h5>
													<TaskList type='todo' />
												</div>
											)}
											{tasksDone.length > 0 && (
												<div className='col-sm'>
													<h5 className='text-white'>Done</h5>
													<TaskList type='done' />
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className='col-sm-2' />
				</div>
			</div>
		);
	}
}

App.defaultProps = {
	tasks: [],
	tasksTodo: [],
	tasksDone: [],
	filter: 'all',
	loading: true,
	fetchTasks: () => console.log('no action provided'),
	selectTask: () => console.log('no action provided')
};

const mapStateToProps = state => ({
	filter: state.tasksState.filter,
	tasks: getTasks(state),
	tasksTodo: getTasksTodo(state),
	tasksDone: getTasksDone(state),
	loading: state.tasksState.loading
});

const mapDispatchToProps = {
	fetchTasks: storeActions.fetchTasks,
	selectTask: storeActions.selectTask
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
