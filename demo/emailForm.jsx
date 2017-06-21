import React from 'react'
import PorpTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

class EmailForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }
    componentWillRecevieProps(nextProps) {
        if (nextProps.token !== this.props.token) {
            this.setState({ value: '' })
            this.props.submit('')
        }

    }

    handleChange(value) {
        this.setState({ value })
        this.props.submit(value)
    }
    render() {
        return (
            <Input
                type="textarea"
                rows={12}
                onChange={(e) => this.handleChange(e.target.value)}
                value={this.state.value} />
        )
    }

}

//限定控件传入的属性类型
EmailForm.propTypes = {

}

//设置默认属性
EmailForm.defaultProps = {

}

export default Form.create()(EmailForm);