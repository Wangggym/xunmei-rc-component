import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DatePicker, InputNumber, Table, Icon } from 'antd';
import EmailToDoList from './emailToDoList'
function App() {
  return (
    <div style={{ margin: 100 }}>
      <h1>AntDesign Demo</h1>
      <EmailToDoList />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
