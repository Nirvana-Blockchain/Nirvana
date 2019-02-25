import {combineReducers} from 'redux'
import {pendingTasksReducer} from 'react-redux-spinner'

import {loginReducerHandler} from './login.js'
import {pmsReducerHandler} from './pms.js'
import {practiceReducerHandler} from './practice.js'
import {subscriptionReducerHandler} from './subscription.js'

export default combineReducers({
    loginReducerHandler,
    pmsReducerHandler,
    practiceReducerHandler,
    subscriptionReducerHandler,
    pendingTasks: pendingTasksReducer
})