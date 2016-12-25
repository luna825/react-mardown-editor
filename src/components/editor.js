import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import { removeNonHTMLProps, createChainFunc } from '../utils/utils'
import marked from 'marked'

import style from './editor.scss';
import markdownStyle from './markdown.scss';

// const sanCov = getSanitizingConverter()

export default class Eidtor extends Component {

  constructor(props){
    super(props)
    this.state = {
      //UI状态，需要重新RENDER
      full: false,
      status: props.status || 'muted',
      html: '' ,
      height: props.minHeight,
      //辅助状态，不用改变UI
      mouse: 0,
      isPress: false
    }
  }

  static defaultProps = {
    minHeight: 400,
    leftMenus: ['bold','italics', 'divider', 'link', 'quote',
                 'code','image','divider', 'olist', 'ulist', 'head','hr',
                  'divider','undo', 'redo','divider','help'],
    rightMenus: ['preview', 'muted', 'edit', 'divider']
  };

  static propTypes = {
    
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.changeSizeEnd)
    window.addEventListener('mousemove', this.changeSize)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { html, height, status, full } = this.state;
    if (html === nextState.html &&
      height === nextState.height &&
      full === nextState.full &&
      status === nextState.status &&
      this.props === nextProps
       ){
      return false
    }
    return true;
  }

  // 编辑区函数
  handleEdit = (e)=>{
    this.setState({html: marked(e.target.value)})
  }
  //切换显示模式
  changeStatus = (status)=>{
    this.setState({status: status})
  }

  changeFull = ()=>{
    this.setState({full: !this.state.full, height:'100%'})
  }

  //改变编辑区大小 START
  changeSizeStart = ({pageY})=>{
    const {height} = this.state;
    const {minHeight} = this.props;
    this.setState({
      height: height < minHeight ? minHeight : height,
      isPress: true,
      mouse: pageY
    })
  }

  changeSizeEnd = ()=>{
    if(this.state.isPress){
     this.setState({mouse:0, isPress:false})
    }
  }

  changeSize = ({pageY})=>{
    const {isPress, height, mouse} = this.state;
    if(isPress){
      this.setState({
        height: height + pageY - mouse,
        mouse: pageY
      })
    }
  }
  //改变编辑区大小 END

  render(){
    console.log(this.state)
    const {leftMenus, rightMenus, minHeight, value} = this.props;
    const {status, height, html, full} = this.state;
    return(
      <div className={classnames(style.editor, { [style.fullpage] : full }) } >
        <div className={style.toolbar} >
          <ul className={style.leftMenu}>
            {leftMenus.map((title, i)=>
              <li key={i} className={classnames(style.menu, {[style[title]]:(title==='divider')})}>
                {title === 'divider' ? null :
                  <a
                  className={classnames(style[title],{[style.active]:(title === status)})}></a>
                }
              </li>
            )}
          </ul>
          <ul className={style.rightMenu}>
            {rightMenus.map((title,i)=>
              <li key={i} className={classnames(style.menu, {[style[title]]:(title==='divider')})}>
                {title === 'divider' ? null :
                  <a onClick={()=>this.changeStatus(title)}
                  className={classnames(style[title],{[style.active]:(title === status)})}></a>
                }
              </li>
            )}
              <li className={style.menu}><a onClick={this.changeFull} className={full ? style.unfull : style.full} ></a></li>
          </ul>
        </div>
        <div className={classnames(style[status], style['edit-container'])}>
          <div className={classnames(style.wrap)}>
            <textarea style={{height:height, minHeight: minHeight}} 
            ref={this.props.inputRef} className={style.editarea}
            onChange={createChainFunc(this.handleEdit, this.props.onChange)}
            {...removeNonHTMLProps(this.props)}
            ></textarea>
            <div className={classnames(style.previewarea, markdownStyle.markdown)}
            dangerouslySetInnerHTML={{__html: html }}
            ></div>
          </div>
          <a className={style.resize} onMouseDown={this.changeSizeStart}
          ></a>
        </div>
      </div>
    )
  }
}