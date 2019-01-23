import React, { Component } from 'react'
import TaskItem from './TaskItem';

class TaskList extends Component {

    onChange = (event) => {
        let filterName = event.target.name === 'filterName' ? event.target.value : '';
        let filterStatus = event.target.name === 'filterStatus' ? event.target.value : -1;
        this.props.onFilter(filterName, filterStatus);
    }

    render() {
        let { tasks, filter } = this.props;
        

        let elmTasks = tasks.map((task, index) => {
            return <TaskItem 
                key={task.id}
                task={task}
                index={index}
                onChangeStatus={this.props.onChangeStatus}
                onRemoveItem={this.props.onRemoveItem}
                onEditItem={this.props.onEditItem}
                onFilter={this.props.onFilter} />
        })
        return (
            <div className='row form-group'>
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th className='text-center'>No</th>
                                <th className='text-center'>Name</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input type='text' name='filterName' id='filterName' className='form-control' value={filter.filterName} onChange={this.onChange} />
                                </td>
                                <td>
                                    <select name='filterStatus' id='filterStatus' value={filter.filterStatus} onChange={this.onChange} className='form-control'>
                                        <option value={-1}>All</option>
                                        <option value={0}>Hidden</option>
                                        <option value={1}>Active</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elmTasks}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default TaskList;