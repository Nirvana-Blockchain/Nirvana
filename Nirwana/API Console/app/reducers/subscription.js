import { GET_SUBSCRIPTION_LIST, MANAGE_SUBSCRIPTION } from '../actions/subscription'



const initialState = {
    subscriptionList:[],
    practiceData:{}
} 

export const subscriptionReducerHandler = (state = initialState, actionResponse) => {
	
	switch(actionResponse.type) {
		case GET_SUBSCRIPTION_LIST :
			return {
				...state,
				subscriptionList: actionResponse.data
			}		
        case MANAGE_SUBSCRIPTION :
			return {
				...state,
				practiceData: actionResponse.data
			}
		default:
			return  state
	}
}