import React from 'react'
import PorpTypes from 'prop-types'
import { Input } from 'antd';
const Search = Input.Search;


export default class EmailSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillRecevieProps(nextProps) {


    }
    handleSubmit() {

    }
    render() {

        return (
            <Search
                placeholder="input search text"
                style={{ width: 200 }}
                onSearch={value => this.props.search(value)}
            />
        )
    }

}

//限定控件传入的属性类型
EmailSearch.propTypes = {

}

//设置默认属性
EmailSearch.defaultProps = {

}