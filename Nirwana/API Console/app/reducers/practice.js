import { GET_PRACTICE_LIST, GET_PRACTICE_CONFIG, SAVE_PRACTICE_CONFIG } from '../actions/practice'



const initialState = {
	practiceList:[],
	configData:{},
	isSuccess : false
} 

export const practiceReducerHandler = (state = initialState, actionResponse) => {
	
	switch(actionResponse.type) {
		case GET_PRACTICE_LIST :
			return {
				...state,
				practiceList: actionResponse.data
			}
		
		case GET_PRACTICE_CONFIG :
			return {
				...state,
				configData: actionResponse.data.practice_configs
			}
		
		case SAVE_PRACTICE_CONFIG :
			return {
				...state,
				isSuccess: actionResponse.data.success
			}
			
		default:
			return  state
	}
}