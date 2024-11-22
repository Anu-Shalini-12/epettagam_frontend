import certificateReducer from './certificates/reducers'
import esevaiReducer from './esevai/reduder'
import adminReducer from './admin/reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  certificate: certificateReducer,
  esevai: esevaiReducer,
  admin: adminReducer,
})

export default rootReducer
