import React, { Component } from 'react'

class TaskSort extends Component {

    onSort = (name, value) => {
        this.props.onSort(name, value)
    }

    render() {
        let { sort } = this.props;
        return (
            <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                <div className='dropdown'>
                    <button className='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>
                        Sort &nbsp;
                        <span className='fa fa-sort'></span>
                    </button>
                    <ul className='dropdown-menu'>
                        <li onClick={() => this.onSort('name', 1)} className={'pointer'} ><button><i className='fa fa-sort-alpha-asc'></i>From A-Z </button>{sort.by === 'name' && sort.value === 1 ? <i className="fa fa-check"></i> : ''}</li>
                        <li onClick={() => this.onSort('name', -1)} className={'pointer'} ><button><i className='fa fa-sort-alpha-asc'></i>From Z-A </button>{sort.by === 'name' && sort.value === -1 ? <i className="fa fa-check "></i> : ''}</li>
                        <li onClick={() => this.onSort('status', 1)} className={'pointer'} ><button>Status: Active </button>{sort.by === 'status' && sort.value === 1 ? <i className="fa fa-check "></i> : ''}</li>
                        <li onClick={() => this.onSort('status', -1)} className={'pointer'} ><button>Status: Hidden </button>{sort.by === 'status' && sort.value === -1 ? <i className="fa fa-check "></i> : ''}</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default TaskSort;