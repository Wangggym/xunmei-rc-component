import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'
//******************************************** */
//                  分页器控件
//******************************************** */
export default class PaginationWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    handleChange(pageIndex) {
        const pageChange = this.props.pageChange
        if (pageChange) pageChange(pageIndex)
    }
    render() {
        return (
            <Pagination
                {...this.props}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}
//限定控件传入的属性类型
PaginationWidget.propTypes = {
    total: PropTypes.number,        //总数量
    current: PropTypes.number,      //当前页面数
    pageSize: PropTypes.number,     //每页条目数
    pageChange: PropTypes.func,     //改变页码时回传paginIndex
}

//设置默认属性
PaginationWidget.defaultProps = {
    total: 0,
    current: 1,
    pageSize: 10,
}