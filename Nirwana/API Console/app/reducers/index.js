import {combineReducers} from 'redux'
import {pendingTasksReducer} from 'react-redux-spinner'

import {loginReducerHandler} from './login.js'

export default combineReducers({
    loginReducerHandler,
    pendingTasks: pendingTasksReducer
})