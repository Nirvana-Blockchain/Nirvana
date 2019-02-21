import Services from '../utils'
import * as practiceActions from './practice'
import _get from 'lodash/get'
import * as Loader from './loader'
export const GET_SUBSCRIPTION_LIST = 'GET_SUBSCRIPTION_LIST'
export const MANAGE_SUBSCRIPTION = 'MANAGE_SUBSCRIPTION'
import { toast } from 'react-toastify';

// This gets called for transforming action response into reducer format
export const getSubscriptionList = data => (
    {
        type: GET_SUBSCRIPTION_LIST,
        data
    }
)

export const manageSubscriptionData = data => (
    {
        type: MANAGE_SUBSCRIPTION,
        data
    }
)

// This function should do network call for action and then dispatch response to reducer
export const fetchSubscriptionList = (subId) => dispatch => {
    return Services.fetchSubscriptionList(subId).then(data => dispatch(getSubscriptionList(data)))
}

export const manageSubscription = (reqObj, subId) => (dispatch,getState) => {
    dispatch(Loader.startLoading())
    return Services.manageSubscription(reqObj).then(data => {
        dispatch(Loader.endLoading()) 
        dispatch(manageSubscriptionData(data))
        //let pmsId = _get(getState(),'pmsReducerHandler.pmsData.pms_id')
        console.log('​exportmanageSubscription -> subId()', subId)
        dispatch(fetchSubscriptionList(subId))
    })
}
