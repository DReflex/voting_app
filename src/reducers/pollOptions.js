const stateInit = [{
  id: String,
  values: Number
}]
const pollOptions = (state= stateInit, action) =>{
  switch(action.type){
    case 'EDIT_OPTION':
    return state.map(data => data.map(option => option.id === action.id ? {
      ...option,
      values: action.value}
      :option
    ))

    case 'DELETE_OPTION':
    return state.map(
          (option) => option.filter(data => data.id !== action.id)
        )

    case 'ADD_OPTION':
    return state.map(option =>[
      ...option,
      {
        id: action.id,
        values: 0
      }
    ]
    )
    case 'RESET_OPTION':
    return [{}]

    default:
    return state
  }
}
export default pollOptions

// state.map(option =>
// option.id === action.id ?{
//   ...option, values:action.value
// }:option)
