
const stateInit={
  name:"",
  id:Number,
  loginStatus: false
}
const user =(state = stateInit, action) => {
  switch(action.type){
    case 'LOGIN':
    return{
      ...state,
      id:action.id,
      loginStatus: action.loginStatus
    }
    case 'LOGOUT':
    return{
      ...state,
       loginStatus:false
     }
     case 'NAME':
     return{
       ...state,
       name: action.name
     }

    default:
    return state
  }
}


export default user
