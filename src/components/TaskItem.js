import React, { Component } from 'react'

class TaskItem extends Component {

    onChangeStatus = () => {
        this.props.onChangeStatus(this.props.task.id)
    }

    onRemoveItem = () => {
        this.props.onRemoveItem(this.props.task.id);
    }

    onEditItem = () => {
        this.props.onEditItem(this.props.task.id)
    }

    render() {
        var { task, index } = this.props
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className='text-center'>
                    <span className={task.status === true ? 'label label-success' : 'label label-danger'} onClick={this.onChangeStatus}>{task.status === true ? 'Active' : 'Hidden'}</span>
                </td>
                <td className='text-center'>
                    <button
                        type='button'
                        className='btn btn-warning'
                        onClick={this.onEditItem}>
                        <i className='fa fa-edit'></i> Edit
                    </button>
                    &nbsp;
                    <button
                        type='button'
                        className='btn btn-danger'
                        onClick={this.onRemoveItem}>
                        <i className='fa fa-trash'></i> Delete
                    </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem;