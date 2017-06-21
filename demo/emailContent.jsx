import React from 'react'
import PorpTypes from 'prop-types'
import { Table } from 'antd'

export default class EmailContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillRecevieProps(nextProps) {


    }

    render() {
        const emails = this.props.emails
        const content = emails.length ? emails.map((item, index) => <li key={index}>{item}</li>) : <li>Nothing!</li>
        return (
            <ul>
                {content}
            </ul>
        )
    }

}

//限定控件传入的属性类型
EmailContent.propTypes = {

}

//设置默认属性
EmailContent.defaultProps = {

}