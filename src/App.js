import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

import uuidv4 from 'uuid/v4';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: [], //id: unique, name, status
      isDisplayForm: false,
      isEditItem: null,
      filter: {
        filterName: '',
        filterStatus: -1,
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    }
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks
      })

    }
  }

  onGenerateData = () => {
    let tasks = [
      {
        id: uuidv4(),
        name: 'React Js',
        status: true
      },
      {
        id: uuidv4(),
        name: 'Venky',
        status: false
      },
      {
        id: uuidv4(),
        name: 'Awesome',
        status: false
      },
      {
        id: uuidv4(),
        name: 'Loveeee',
        status: true
      },
      {
        id: uuidv4(),
        name: 'huhu',
        status: true
      }
    ];
    this.setState({
      tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onShowAddForm = () => {
    if (this.state.isDisplayForm && this.state.isEditItem !== null) {
      this.setState({ isEditItem: null });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        isEditItem: null
      });
    }

  }

  onShowEditForm = () => {
    this.setState({ isDisplayForm: true });
  }

  onCloseForm = () => {
    this.setState({ isDisplayForm: !this.state.isDisplayForm });
  }

  onSubmit = (formData) => {
    var task = {
      id: formData.id,
      name: formData.name,
      status: formData.status
    }

    if (task.id === '') {
      task.id = uuidv4();
      let oldTask = JSON.parse(localStorage.getItem('tasks'));
      let newTask = [...oldTask, task];
      localStorage.setItem('tasks', JSON.stringify(newTask));
      this.state.tasks.push(task);
      this.setState({
        tasks: this.state.tasks
      })
    } else {
      let index = this.findIndexById(task.id);
      if (index !== -1) {
        let tasks = this.state.tasks;
        tasks[index] = task;
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  }

  onChangeStatus = (id) => {
    let index = this.findIndexById(id);
    let { tasks } = this.state;
    tasks[index].status = !tasks[index].status;
    this.setState({ tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findIndexById(id) {
    let result = -1;
    this.state.tasks.forEach((task, index) => {
      if (task.id === id) result = index;
    })
    return result;
  }

  onRemoveItem = (id) => {
    let index = this.findIndexById(id);
    let { tasks } = this.state;
    tasks.splice(index, 1)
    this.setState({ tasks });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onEditItem = (id) => {
    let index = this.findIndexById(id);
    let { tasks } = this.state;
    this.setState({ isEditItem: tasks[index] })
    this.onShowEditForm();
  }

  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        filterName,
        filterStatus
      }
    })
  }

  onSearch = (keyword) => {
    this.setState({ keyword })
  }

  onSort = (name, value) => {
    console.log(name, '-', value)
    this.setState({
      sort: {
        by: name,
        value
      }
    })
  }


  render() {
    let { tasks, isDisplayForm, isEditItem, filter, keyword, sort } = this.state;
    console.log(filter)
    if (keyword !== '') {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
      })
    }
    if (filter) {
      if (filter.filterName !== '') {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.filterName.toLowerCase()) > -1
        })
      }

      tasks = tasks.filter((tasks) => {
        if (filter.filterStatus === -1 || filter.filterStatus === '-1') {
          return tasks;
        }
        else {
          return tasks.status === (filter.filterStatus === 1 || filter.filterStatus === '1'  ? true : false);
        }
      });

    }
    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) { return sort.value }
        else if (a.name < b.name) { return -sort.value }
        else return 0;
      })
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value
        else if (a.status < b.status) return sort.value
        else return 0
      })
    }

    let elmTaskForm = isDisplayForm === true
      ? <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} task={isEditItem} /> : '';
    return (
      <div className='container mt-50'>

        <h2 className='text-center'>To Do List</h2>
        <hr />
        <div className='row'>
          <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4'>
            {/* TaskForm */}
            {elmTaskForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <div className='form-group'>
              <div className='row form-group'>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={this.onShowAddForm}
                  ><i className='fa fa-plus'></i> Add To Do</button>
                  <button
                    type='button'
                    className='btn btn-danger ml-5'
                    onClick={this.onGenerateData}
                  ><i className='fa fa-clone'></i> Generate Data</button>
                </div>
              </div>
              {/* TaskSearchSort */}
              <TaskControl
                onSearch={this.onSearch}
                onSort={this.onSort}
                sort={sort} />

              <TaskList
                tasks={tasks}
                onChangeStatus={this.onChangeStatus}
                onRemoveItem={this.onRemoveItem}
                onEditItem={this.onEditItem}
                filter={filter}
                onFilter={this.onFilter} />
            </div>
          </div>
        </div>
        <hr />
      </div>

    );
  }
}

export default App;
