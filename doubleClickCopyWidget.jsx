import React from 'react'
import PropTypes from 'prop-types'
import { Popover, message } from 'antd'
//******************************************** */
//                 双击复制控件
//******************************************** */
export default class DoubleClickCopyWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }
    handleDoubleClick() {
        this.refs.CopyText.select()
        document.execCommand('Copy')
        message.success(`复制代码${this.props.hideContent}成功`)
    }
    handleVisibleChange(visible) {
        this.setState({ visible })
    }
    render() {
        const { PopoverContent, showContent, hideContent } = this.props
        const buttonStyle = {
            border: 'none',
            background: 'none',
            outline: 'none',
        }
        const textareaStyle = {
            opacity: 0,
            width: 0,
            height: 0,
            outline: 'none',
            resize: 'none',
        }
        const content = (
            <div>
                <p>{PopoverContent}</p>
                <p>{hideContent}</p>
            </div>
        )
        return (
            <Popover
                placement='bottom'
                content={content}
                trigger='hover'
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange.bind(this)} >
                <button style={buttonStyle} onDoubleClick={this.handleDoubleClick.bind(this)}>{showContent}</button>
                <textarea style={textareaStyle} ref='CopyText' value={hideContent} />
            </Popover>
        )
    }
}

//限定控件传入的属性类型
DoubleClickCopyWidget.propTypes = {
    PopoverContent: PropTypes.string,       //默认标题
    showContent: PropTypes.number,          //显示的内容
    hideContent: PropTypes.string,          //双击要复制的内容
}

//设置默认值
DoubleClickCopyWidget.defaultProps = {
    PopoverContent: '双击复制整个代码'
}