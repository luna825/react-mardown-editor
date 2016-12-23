import React, {Component, PropTypes} from 'react'
import { getSanitizingConverter } from '../lib/Markdown.Sanitizer'
import ToolBar from './toolbar/toolbar'
import Edit from './edit/edit'

import style from './editor.scss'

export default class Eidtor extends Component {

  render(){
    const sanCov = getSanitizingConverter()
    return(
      <div className={style.editor}>
        <ToolBar classname={style.toolbar} />
        <Edit />
      </div>
    )
  }
}