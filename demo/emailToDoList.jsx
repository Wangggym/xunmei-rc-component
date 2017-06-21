import React from 'react'
import PorpTypes from 'prop-types'
import { message, Button } from 'antd'
import EmailForm from './emailForm'
import EmailSearch from './emailSearch'
import EmailContent from './emailContent'
//******************************************** */
//      emil输入搜索显示
//******************************************** */
export default class EmailToDoList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emails: [],
            searchWords: '',
            token: false,
        }
    }
    componentWillRecevieProps(nextProps) {


    }
    handleSubmit(value) {
        const emails = []
        let remainingEmails = value
        while (remainingEmails.indexOf('.com') !== -1) {
            let duan = remainingEmails.indexOf('.com') + 4;
            emails.push(remainingEmails.substring(0, duan).replace(/^\n+|\n+$/g, ""))
            remainingEmails = remainingEmails.substring(duan)
        }
        console.log(emails)
        this.setState({ emails })

    }
    handleSearch(searchWords) {
        if (searchWords !== this.state.searchWords) this.setState({ searchWords })
    }
    handleClick(value) {
        message.success(value)
        this.setState({ token: !this.state.token })
    }
    render() {
        const { searchWords, emails } = this.state
        const currentEmails = searchWords ? emails.filter(item =>
            item.indexOf(searchWords) !== -1
        ) : emails
        return (
            <div>
                <EmailForm submit={this.handleSubmit.bind(this)} token={this.state.token} />
                <EmailSearch search={this.handleSearch.bind(this)} />
                <EmailContent emails={currentEmails} />
                <Button onClick={() => this.handleClick(currentEmails)} >submit</Button>
            </div>
        )
    }

}

//限定控件传入的属性类型
EmailToDoList.propTypes = {

}

//设置默认属性
EmailToDoList.defaultProps = {

}