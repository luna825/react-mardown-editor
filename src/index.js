import React from 'react'
import ReactDOM from 'react-dom'

import Editor from './components/Editor'


class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      markValue:''
    }
  }

  render(){
    console.log(this.state.markValue)
    return (<div>
      <Editor inputRef={ref => this.editor = ref } />
      <button onClick={()=>console.log(this.editor.value)}>submit</button>
    </div>)
  }

}

ReactDOM.render(
  <App />, document.getElementById('app'))