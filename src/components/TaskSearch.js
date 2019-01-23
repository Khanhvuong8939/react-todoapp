import React, { Component } from 'react'

class TaskSearch extends Component {

    constructor(props) {
        super(props)

        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }


    render() {
        let { keyword } = this.state.keyword
        return (
            <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                <div className='input-group'>
                    <input name='keyword' value={keyword} onChange={this.onChange} type='text' className='form-control' placeholder='Search' />
                    <span className='input-group-btn'>
                        <button type='button' className='btn btn-primary form-control btn-form-group' onClick={this.onSearch}><i className='fa fa-search'></i> Search</button>
                    </span>
                </div>
            </div>
        )
    }
}

export default TaskSearch;