import { combineReducers } from 'redux'
import polls from './reducer'
import showPoll from './showPoll'
import user from './user'
import createPoll from './createPoll'
import pollOptions from './pollOptions'

const VoteApp = combineReducers({
  polls,
  showPoll,
  user,
  createPoll,
  pollOptions
})

export default VoteApp
