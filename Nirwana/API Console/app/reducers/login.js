import { LOGIN } from '../actions/login'
import { REGISTER_USER } from '../actions/login'
import { GET_PROFILE_DATA } from '../actions/login'
import { UPDATE_PROFILE_DATA } from '../actions/login'
import {FORGOT_PASSWORD } from '../actions/login'
import {UPDATE_PASSWORD } from '../actions/login'
import {UPDATE_USER_PASSWORD} from '../actions/login'

const initialState = {
    user : {},
    isLoggedIn: false,
	loginResponse: null,
	isUserRegistered: false,
    registerUserResponse: {},
    profileData: {}
} 

export const loginReducerHandler = (state = initialState, actionResponse) => {
	console.log('Action in loginReducerHandler: ', actionResponse)
	switch(actionResponse.type) {
		case LOGIN :
		return {
			...state,
            loginResponse: actionResponse.data,
            isLoggedIn: actionResponse.data.success
		}

		case REGISTER_USER :
			return {
				...state,
				registerUserResponse: actionResponse.data,
				isUserRegistered: actionResponse.data.success
			}	
			
			case GET_PROFILE_DATA :
			return {
				...state,
				profileData: actionResponse.data.subscribers[0]
            }	
            
            case FORGOT_PASSWORD :
			return {
				...state,
				forgetPassword: actionResponse.data,
                forgotStatus: actionResponse.data.success
            }

            case UPDATE_PASSWORD :
			return {
				...state,
				updatePassword: actionResponse.data,
                updateSuccess: actionResponse.data.success
            }

			case UPDATE_PROFILE_DATA :
			return {
				...state,
				updateStatus: actionResponse.data 
            }	

            case UPDATE_USER_PASSWORD :
			return {
				...state,
				passwordUpdate: actionResponse.data 
            }	
            
		default:
		return  state
	}
}