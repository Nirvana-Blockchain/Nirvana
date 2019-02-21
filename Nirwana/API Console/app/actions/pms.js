import Services from '../utils'
import * as Loader from './loader'

export const GET_PMS_LIST = 'GET_PMS_LIST'
export const GET_PMS_DATA = 'GET_PMS_DATA'

// This gets called for transforming action response into reducer format
export const getPMSList = data => (
    {
        type: GET_PMS_LIST,
        data
    }
)

export const getPMSData = data => (
    {
        type: GET_PMS_DATA,
        data
    }
)

// This function should do network call for action and then dispatch response to reducer
export const fetchPMSList = () => dispatch => {
    dispatch(Loader.startLoading())
    return Services.fetchPMSList().then(data =>{
        dispatch(getPMSList(data))
        dispatch(Loader.endLoading()) 
    })
}

export const fetchPMSData = (pmsId) => dispatch => {
    dispatch(Loader.startLoading())
    return Services.fetchPMSData(pmsId).then(data =>{
        dispatch(getPMSData(data))
        dispatch(Loader.endLoading()) 
    })
}
