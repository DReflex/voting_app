let nextTodoId = 0;

//polls
export const addPoll = (data) =>{
    return{
    type: 'ADD_TODO',
    id: data.id,
    name: data.name,
    desc: data.desc,
    data: data.data,
    creator: data.creator
  }
}
export const resetRedux = () =>{
    return{
    type: 'RESET',
    }
  }
export const resetShow = () =>{
    return{
    type: 'RESET_SHOW',
    }
  }
export const showPoll = (data) => {
  return{
    type: 'ACTIVE',
    id: data.id,
    name: data.name,
    desc: data.desc,
    data: data.data,
  }
}
export const showing = (show) =>{
  return{
    type: "HIDE",
    showing: show
  }
}
//user
export const userLogin = (data) =>{
  return{
    type:'LOGIN',
    id: data.id,
    loginStatus: data.loginStatus
  }
}
export const userLogout = () =>{
  return{
    type:'LOGOUT'
  }
}
export const addName = (name) => {
  return{
    type:'NAME',
    name: name
  }
}
//create poll
export const createName = (name) =>{
  return{
    type:"EDIT_NAME",
    name
  }
}
export const createDesc = (desc) =>{
  return{
    type:"EDIT_DESC",
    desc
  }
}

export const resetPoll= () =>{
  return{
    type: "RESET_POLL"
  }
}
//poll options
export const addOption = (id) =>{
  return {
    type: "ADD_OPTION",
    id
  }
}
export const editOption = (value, id) => {
  return{
    type: "EDIT_OPTION",
    value,
    id
  }
}
export const deleteOption = (id) =>{
  return{
    type: 'DELETE_OPTION',
    id
  }

}
export const resetOption =() =>{
  return{
    type:"RESET_OPTION"
  }
}
