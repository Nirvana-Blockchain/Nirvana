import Services from '../utils'
import { toast } from 'react-toastify';
import * as Loader from './loader'

export const GET_PRACTICE_LIST = 'GET_PRACTICE_LIST'
export const GET_PRACTICE_CONFIG = 'GET_PRACTICE_CONFIG'
export const SAVE_PRACTICE_CONFIG = 'SAVE_PRACTICE_CONFIG'

// This gets called for transforming action response into reducer format
export const getPracticeList = data => (
    {
        type: GET_PRACTICE_LIST,
        data
    }
)

export const getPracticeConfig = data => (
    {
        type: GET_PRACTICE_CONFIG,
        data
    }
)

export const savePracticeConfig = data => (
    {
        type: SAVE_PRACTICE_CONFIG,
        data
    }
)


// This function should do network call for action and then dispatch response to reducer
export const fetchPracticeList = (pmsId) => dispatch => {
    console.log('action-> fetchPracticeList -> ​pmsId', pmsId)
    
    if(pmsId){
        dispatch(Loader.startLoading())
        return Services.fetchPracticeListByPmsId(pmsId).then(data => {
            dispatch(Loader.endLoading()) 
            dispatch(getPracticeList(data))
        })
    }else
    { dispatch(Loader.startLoading())
        return Services.fetchPracticeList().then(data =>{ 
            dispatch(Loader.endLoading()) 
            dispatch(getPracticeList(data))})
    }
}


export const fetchPracticeConfigByPsId = (psId) => dispatch => {
    console.log('action-> fetchPracticeList -> ​psId', psId)
    dispatch(Loader.startLoading())
    return Services.fetchPracticeConfigByPsId(psId).then(data => {
        dispatch(Loader.endLoading()) 
        dispatch(getPracticeConfig(data))
    })    
}

export const updatePracticeConfig = (reqObj) => dispatch => {
    console.log('action-> fetchPracticeList -> ​psId', reqObj)
    dispatch(Loader.startLoading())
    return Services.updatePracticeConfig(reqObj).then(data => {
        dispatch(savePracticeConfig(data))
        dispatch(Loader.endLoading()) 
        if(data.success){
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
        dispatch(fetchPracticeConfigByPsId(reqObj.practiceSubscriptionId))
        
    })    
}
