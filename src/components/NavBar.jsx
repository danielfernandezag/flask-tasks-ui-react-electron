import React, { Component } from 'react';
import { connect } from 'react-redux';
import storeActions from '../redux/actions/index';

export class NavBar extends Component {
	state = {
		search: ''
	};
	onSearchChange = e =>
		this.setState({ search: e.target.value }, () => {
			if (this.state.search === '') {
				this.props.filterTasks('all');
			} else {
				this.props.filterTasks('search', this.state.search);
			}
		});
	onSubmit = e => {
		e.preventDefault();
	};
	render() {
		const { filterTasks, filter, fetchUpdateTaskDoneAll, fetchDeleteTasksAll } = this.props;
		return (
			<nav className='navbar navbar-expand-lg navbar-dark text-white bg-dark'>
				<a className='navbar-brand' href={false}>
					Tasks App
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<a className='nav-link' href={false} onClick={fetchDeleteTasksAll}>
								Delete All Tasks
							</a>
						</li>
						<li className='nav-item dropdown'>
							<a className='nav-link dropdown-toggle' href={false} id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
								{filter === 'search' && <span>Filter Tasks</span>}
								{filter === 'all' && <span>Filter Tasks</span>}
								{filter === 'done' && <span>Done</span>}
								{filter === 'todo' && <span>To do</span>}
							</a>
							<div className='dropdown-menu' aria-labelledby='navbarDropdown'>
								<a className='dropdown-item' href={false} onClick={() => filterTasks('all')}>
									All
								</a>
								<a className='dropdown-item' href={false} onClick={() => filterTasks('done')}>
									Done
								</a>
								<a className='dropdown-item' href={false} onClick={() => filterTasks('todo')}>
									To do
								</a>
							</div>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href={false} tabIndex='-1' aria-disabled='true' onClick={() => fetchUpdateTaskDoneAll(true)}>
								Mark All As Done
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href={false} tabIndex='-1' aria-disabled='true' onClick={() => fetchUpdateTaskDoneAll(false)}>
								Mark All To Do
							</a>
						</li>
					</ul>
					<form className='form-inline my-2 my-lg-0' onSubmit={this.onSubmit}>
						<input className='form-control mr-sm-2' value={this.state.search} onChange={this.onSearchChange} name='search' type='search' placeholder='Search' aria-label='Search' />
						<button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
							Search
						</button>
					</form>
				</div>
			</nav>
		);
	}
}

NavBar.defaultProps = {
	title: 'Title',
	filterTasks: () => console.log('no action provided'),
	fetchUpdateTaskDoneAll: () => console.log('no action provided'),
	fetchDeleteTasksAll: () => console.log('no action provided'),
	filter: 'all'
};

const mapStateToProps = state => ({
	filter: state.tasksState.filter
});

const mapDispatchToProps = {
	filterTasks: storeActions.filterTasks,
	fetchUpdateTaskDoneAll: storeActions.fetchUpdateTaskDoneAll,
	fetchDeleteTasksAll: storeActions.fetchDeleteTasksAll
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavBar);
