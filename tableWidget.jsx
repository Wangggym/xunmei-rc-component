import React from 'react'
import PorpTypes from 'prop-types'
import { cssPrefix } from 'cms5-components'
import { Table } from 'antd'
import PaginationWidget from './paginationWidget'
const cssRoot = cssPrefix + '-TableWidget'
//******************************************** */
//      Table控件带hover,分页器
//******************************************** */
export default class TableWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: null,
            dataSource: null,
        }
    }
    componentWillRecevieProps(nextProps) {
        const data = nextProps.dataSource
        if (data && data !== this.state.dataSource) {
            let number = 0
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === this.state.isSelected) {
                    number = i
                    break
                }
            }
            this.dataMethod(number, data)
        }

    }
    dataMethod(index, data) {
        let code = -1
        if (data && data.length) {
            data.map(item => item.isSelected = false)
            data[index].isSelected = true
            code = data[index].key
        }
        this.setState({ dataSource: data, isSelected: code })
        this.props.clickCallback && this.props.clickCallback(code)
    }
    handleRowClick(record, index) {
        this.dataMethod(index, this.state.dataSource)
    }
    handleRowClassName(record, index) {
        if (!this.props.noHover && record.isSelected)
            return 'table-isSelected'

    }
    render() {
        const {
            columns,
            dataSource,
            size,
            pageChange,
            pageSize,
            rowSelection,
            total,
            current,
            loading,
            noPagination,
        } = this.props
        const table = {
            columns,
            dataSource,
            rowSelection,
            size,
            loading,
        }
        const pagin = {
            pageChange,
            pageSize,
            total,
            current,
        }
        return (
            <div>
                <div className='basiceMarginBottom'>
                    <Table
                        {...table}
                        pagination={false}
                        onRowClick={(record, index) => this.handleRowClick(record, index)}
                        rowClassName={(record, index) => this.handleRowClassName(record, index)} />
                </div>
                <div className='basicePullRgitg'>
                    {!noPagination && <PaginationWidget {...pagin} />}
                </div>
            </div>
        )
    }

}

//限定控件传入的属性类型
TableWidget.propTypes = {
    columns: PropTypes.array.isRequired, //table每列样式
    dataSource: PropTypes.array,    //table显示数据
    pageChange: PropTypes.func,     //切换分页时方法
    size: PropTypes.string,         //table样式
    pageSize: PropTypes.number,     //显示的每页数量
    current: PropTypes.number,      //当前所在页面
    total: PropTypes.number,        //总条数
    rowSelection: PropTypes.object, //增加可选择功能
    noPagination: PropTypes.bool,   //是否显示分页器
    noHover: PropTypes.bool,        //是否显示点击选中hover效果
}

//设置默认属性
TableWidget.defaultProps = {
    size: 'small',
    pageSize: 10,
    total: 0,
    current: 1,
    rowSelection: null,
    noPagination: false,
    noHover: false,
}