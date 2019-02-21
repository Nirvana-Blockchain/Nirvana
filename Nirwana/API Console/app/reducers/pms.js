import { GET_PMS_LIST, GET_PMS_DATA } from '../actions/pms'


const initialState = {
	pmsList:[],
	pmsData:{}
} 

export const pmsReducerHandler = (state = initialState, actionResponse) => {
	console.log('Action in pmsReducerHandler: ', actionResponse)
	switch(actionResponse.type) {
		case GET_PMS_LIST :
			return {
				...state,
				pmsList: actionResponse.data
			}
		case GET_PMS_DATA :
			return {
				...state,
				pmsData: actionResponse.data
			}
		default:
			return  state
	}
}