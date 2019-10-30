import React, { Component } from 'react';
import { connect } from 'react-redux';
import storeActions from '../redux/actions/index';

export class TaskForm extends Component {
	nameRef = React.createRef();
	contentRef = React.createRef();

	state = {
		name: '',
		content: '',
		nameError: false,
		contentError: false,
		existsError: false
	};

	onNameChange = e => this.setState({ name: e.target.value });
	onContentChange = e => this.setState({ content: e.target.value });
	onSubmit = e => {
		e.preventDefault();
		const alreadyExists = this.props.tasks.find(task => task.name === e.target.name.value);
		if (e.target.name.value !== '' && e.target.content.value !== '' && alreadyExists === undefined) {
			this.setState({ nameError: false, contentError: false, existsError: false }, () => {
				this.props.fetchAddTask(this.state.content, this.state.name);
				this.setState({ name: '', content: '' }, this.nameRef.current.focus());
			});
		} else if (e.target.name.value === '') {
			this.setState({ nameError: true, contentError: false, existsError: false }, this.nameRef.current.focus());
		} else if (e.target.content.value === '') {
			this.setState({ nameError: false, contentError: true, existsError: false }, this.contentRef.current.focus());
		} else if (alreadyExists !== undefined) {
			this.setState({ nameError: false, contentError: false, existsError: true, name: '' }, this.nameRef.current.focus());
		}
	};

	render() {
		const { name, content, nameError, contentError, existsError } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<div className='form-group'>
					<label htmlFor='task-input-name'>Task name</label>
					<input
						ref={this.nameRef}
						type='text'
						value={name}
						name='name'
						className='form-control'
						id='task-input-name'
						aria-describedby='task-name-help'
						placeholder='name'
						onChange={this.onNameChange}
					/>
					<small id='task-name-help' className={`form-text ${nameError || existsError ? 'text-danger' : 'text-muted'}`}>
						{existsError ? 'task already exists' : 'add task name.'}
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='task-input-content'>Task content</label>
					<input
						ref={this.contentRef}
						type='text'
						value={content}
						name='content'
						className='form-control'
						id='task-input-content'
						aria-describedby='task-content-help'
						placeholder='content'
						onChange={this.onContentChange}
					/>
					<small id='task-content-help' className={`form-text ${contentError ? 'text-danger' : 'text-muted'}`}>
						add task content.
					</small>
				</div>
				<button type='submit' className='btn btn-primary btn-block'>
					Add
				</button>
			</form>
		);
	}
}

TaskForm.defaultProps = {
	fetchAddTask: () => console.log('no action provided')
};

const mapDispatchToProps = {
	fetchAddTask: storeActions.fetchAddTask
};

export default connect(
	null,
	mapDispatchToProps
)(TaskForm);
