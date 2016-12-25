

const INVALIDPROPS = ['minHeight', 'leftMenus', 'rightMenus', 'inputRef', 'onChange']

export function removeNonHTMLProps(props, invalidProps=INVALIDPROPS){

  return invalidProps.reduce((pre, curr)=>{
    if (pre.hasOwnProperty(curr)){
      delete pre[curr]
    }
    return pre
  }, Object.assign({}, props))

}

export function createChainFunc(){
  let args = [].slice.call(arguments, 0)
  if (args.length === 1){
    return args[0]
  }

  return function chainFunc(){
    for(let i = 0; i < args.length; i ++){
      if (args[i] && args[i].apply){
        args[i].apply(this, arguments)
      }
    }
  }
}