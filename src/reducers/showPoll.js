
const stateInit = {
  id: "",
  name: "",
  desc: "",
  data: {},
  showing: ""
}
const showPoll = (state = stateInit, action) => {
  switch (action.type) {
    case 'ACTIVE':
      return{
        ...state,
          id: action.id,
          name: action.name,
          desc: action.desc,
          data: action.data,
          showing: action.showing
        }

      case 'RESET_SHOW':
      return state ={}

      case "HIDE":
      return{
        ...state,
        showing: action.showing
      }

      default:
      return state
  }

}

export default showPoll
