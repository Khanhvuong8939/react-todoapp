import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentWillMount() {
        let { task } = this.props;
        if (task != null) {
            console.log(task.id)
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        } else if (nextProps.task === null) {
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onHandleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();
        let formData = {
            id: this.state.id,
            name: this.state.name,
            //status: this.state.status === 'true' || true ? true : false
            status: this.state.status === 'true' ? true : false
        }
        this.props.onSubmit(formData);
        this.onClear();
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    render() {
        let { name, status, id } = this.state;
        return (<div className='panel panel-warning'>
            <div className='panel-heading'>
                <h3 className='panel-title'>{id === '' ? 'Add To-do list' : 'Update To-do list'}
                    <span className='fa fa-times-circle pull-right pointer' onClick={this.props.onCloseForm}></span>
                </h3>
            </div>
            <div className='panel-body'>

                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            onChange={this.onHandleChange}
                            value={name}
                            placeholder='Input field'
                        />
                    </div>

                    <label htmlFor='name'>Status:</label>
                    <select
                        name='status'
                        id='status'
                        className='form-control'
                        required='required'
                        value={status}
                        onChange={this.onHandleChange}>
                        <option value={true}>Active</option>
                        <option value={false}>Hidden</option>
                    </select>

                    <br />
                    <div className='text-center'>
                        <button type='submit' className='btn btn-warning'><i className='fa fa-plus'></i> Submit </button> &nbsp;
                        <button type='button' className='btn btn-danger' onClick={this.onClear}><i className='fa fa-remove'></i> Cancel  </button>
                    </div>

                </form>
            </div>
        </div>
        );
    }
}

export default TaskForm;
