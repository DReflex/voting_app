const stateInit ={
  pollName: String,
  pollDesc: String,

}

const createPoll =(state = stateInit, action) => {
  switch(action.type){
    case 'EDIT_NAME':
    return{
      ...state,
      pollName:action.name
    }
    case 'EDIT_DESC':
    return{
      ...state,
      pollDesc:action.desc
    }

    case 'RESET_POLL':
    return{
      state: stateInit
    }
    default:
    return state
  }
}


export default createPoll

// case 'EDIT_OPTION':
// return state.options.map(option =>
// option.id === action.id ?{
//   ...option, values:action.values
// }:option
// )
// case 'DELETE_OPTION':
// return state.options.filter(option =>
//   option.id !== action.id
// )
// case 'ADD_OPTION':
// return state.state.options.map(option =>[
//   ...option,
//   {
//     id: action.id
//   }]
// )
