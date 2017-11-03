
const stateInit = []
const polls = (state = stateInit, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          desc: action.desc,
          data: action.data,
          creator: action.creator
        }
      ]
      case 'RESET':
      return state =[]

      default:
      return state
  }

}

export default polls
