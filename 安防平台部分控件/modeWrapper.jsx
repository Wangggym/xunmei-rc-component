import React from 'react'
import PropTypes from 'prop-types'
import { message, Form } from 'antd'
import { webApi } from '../../__share'
//******************************************** */
//      modal弹出框逻辑、请求高阶控件
//******************************************** */
function modeWrapper(getUrl, postOrPutUrl) {
    return function (model) {
        class FormComponent extends React.Component {
            constructor(props) {
                super(props)
                this.state = {
                    visible: false,
                    loading: false,
                }
            }
            componentWillRecevieProps(nextProps) {
                if (nextProps.onOff !== undefined && nextProps.onOff !== this.props.onOff) {
                    this.setState({ visible: nextProps.onOff })
                    !nextProps.onOff && this.props.form.resetFields()
                }
            }
            showModal() {
                this.toggle(true)
                const { extraValue, code } = this.props
                if (getUrl) {
                    if (code) {
                        this.setState({ loading: true })
                        webApi.get(getUrl(code)).then(result => {
                            if (!result.flag) return message.error(result.errorMessage)
                            this.props.form.setFieldsValue(this.getDeal(result.returnValue))
                            this.setState({ loading: false })
                        })
                    }
                } else if (extraValue) {
                    this.props.form.setFieldsValue(extraValue)
                }
            }
            handleSubmit(value) {
                this.setState({ loading: true })
                let method = 'put'
                let operationType = '添加'
                if (this.props.code) {
                    method = 'post'
                    operationType = '修改'
                }
                webApi[method](postOrPutUrl(), value).then(result => {
                    this.setState({ loading: false })
                    if (!result.flag) return message.error(result.errorMessage)
                    result.operationType = operationType
                    this.toggle(false)
                    this.props.callback(result)
                    this.props.form.resetFields()
                })
                console.log(method, value)
            }

            handleCancel() {
                this.toggle(false)
                this.props.form.resetFields()
            }

            handleOk(value) {
                if (value) return this.handleSubmit(this.postDeal(value))
                if (!postOrPutUrl) return message.error('请在代码中传入post或者putAPI')
                this.props.form.validateFields((err, value) => {
                    if (err) return message.error('请填入正确信息！')
                    this.handleSubmit(this.postDeal(value))
                })
            }

            toggle(boolean) {
                const { changeOnOff } = this.props
                changeOnOff ? changeOnOff(boolean) : this.setState({ visible: boolean })
            }

            //******************************************************提交代码函数处理 */
            postDeal(value) {
                const { code, extraValue } = this.props
                if (value.labels && value.labels.length && value.labels !== '') {
                    for (let i = 0; i < value.labels.length; i++) {
                        value.labels[i].key = value.labels[i].label
                        delete value.labels[i].label
                    }
                }
                if (value.orgUnitCode) value.orgUnitCode = value.orgUnitCode.value
                if (extraValue) value = Object.assign({}, extraValue, value)
                code && (Array.isArray(code) ? value.codes = code : (value.code ? '' : value.code = code))
                return value
            }

            //******************************************************后台返回数据处理 */
            getDeal(data) {
                if (data.labels && data.labels.length && data.labels !== '') {
                    for (let i = 0; i < data.labels.length; i++) {
                        data.labels[i] = {
                            label: data.labels[i],
                            value: data.labels[i]
                        }
                    }
                }
                if (data.orgUnitCode && data.orgUnitName) {
                    data.orgUnitCode = {
                        value: data.orgUnitCode,
                        label: data.orgUnitName,
                    }
                    delete data.orgUnitName
                }
                return data
            }
            render() {
                const { visible, loading } = this.state
                const { disabled, buttonStyle } = this.props
                const { getFieldDecorator } = this.props.form
                let Comp = model
                return (
                    <a
                        href='javascript:void(0)'
                        onClick={this.showModal.bind(this)}
                        disabled={disabled} >
                        {buttonStyle || <i className='fa fa-pencil-square-o'></i>}
                        {visible &&
                            <Comp
                                {...this.props}
                                visible={visible}
                                getFieldDecorator={getFieldDecorator}
                                loading={loading}
                                onOk={this.handleOk.bind(this)}
                                onCancel={this.handleCancel.bind(this)}
                            />}
                    </a>
                )
            }
        }
        //*****************************************限定控件传入的属性类型--说明书 */
        FormComponent.propsTypes = {
            callback: PropTypes.func.isRequired,    //回传到父组件方法
            code: PropTypes.string,                 //组件识别get,post方法唯一关键ID,也是修改ID.在修改组件中传入
            buttonStyle: PropTypes.object,          //自定义按钮样式
            extraValue: PropTypes.object,           //附加需要提交的数据，或者是在修改时显示数据
            disabled: PropTypes.bool,               //组件是否禁用，在传入自定义按钮样式时需要同样传入该属性

            //*************************扩展方法可在父级组件处控制modal的显示与隐藏 */
            onOff: PropTypes.bool,                  //当前显示隐藏状态
            changeOnOff: PropTypes.func,          //与父组件双向绑定回传参数
        }
        return Form.create()(FormComponent)
    }
}
export default modeWrapper