import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import style from './edit.scss'

export default class Edit extends Component {
  constructor(props){
    super(props)
    this.state={
      html:'',
      height:0,
      mouse:0,
      isPress:false
    }
  }

  static defaultProps = {
    
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (this.state.height === nextState.height && this.state.html === nextState.html){
      return false
    }

    return true
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleEdit = () =>{
    let value = this.refs.edit.value
    this.setState({html: value})
  }

  handleMouseMove = ({pageY})=>{
    const {isPress, height, mouse} = this.state;
    if (isPress){
      this.setState({height: height + pageY - mouse, mouse: pageY })
    }
  }

  handleResizeMouseDown = ({pageY}) =>{
    this.setState({mouse: pageY, isPress: true, height: this.refs.edit.offsetHeight})
  }

  handleMouseUp = ()=>{
    if(this.state.isPress){
     this.setState({isPress: false, mouse: 0})
    }
   
  }

  render(){
    const {height} = this.state;
    return(
      <div>
        <div className={classnames(style.wrap)}>
          <textarea style={{height:height}} onChange={this.handleEdit} ref='edit' className={style.edit}></textarea>
          <div className={style.preview}
          dangerouslySetInnerHTML={{__html: this.state.html }}
          ></div>
        </div>
        <a className={style.resize} 
          onMouseDown={this.handleResizeMouseDown}
        ></a>
      </div>
    )
  }
}