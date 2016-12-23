import React,{Component, PropTypes} from 'react'
import classnames from 'classnames'
import style from './toolbar.scss'

export default class ToolBar extends Component {

  constructor(props){
    super(props)
  }

  static defaultProps = {
    classname: "",
    leftMenus: ['bold','italics', 'divider', 'link', 'quote',
                 'code','image','divider', 'olist', 'ulist', 'head','hr',
                  'divider','undo', 'redo','divider','help'],
    rightMenus: ['preview', 'muted', 'edit', 'divider', 'full']
  };

  static propTypes = {
    classname: PropTypes.any,
    leftMenus: PropTypes.array,
    rightMenus: PropTypes.array
  }

  render(){
    const {classname, leftMenus, rightMenus} = this.props;
    return (
      <div className={classnames(style.toolbar, classname)}>
        {leftMenus && <ul className={style.leftMenu}>
          {leftMenus.map((title,i)=>
            <BarMenu key={i} title={title} />
          )}
        </ul>}
        {rightMenus && <ul className={style.rightMenu}>
          {rightMenus.map((title,i)=>
            <BarMenu key={i} title={title} />
          )}
        </ul>}
      </div>
    )
  }
}

const BarMenu = ({title})=>
  <li className={classnames(style.menu,{[style[title]]:(title==='divider')})} title={title} >
    {title !== 'divider' ? <a className={style[title]}></a> : null}
  </li>