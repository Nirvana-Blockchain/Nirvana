// import * as FetchCategoriesAPI from '../utils/category-api';
// import * as FetchPostsAPI from '../utils/post-api'
import Services from '../utils'
import { toast } from 'react-toastify'
import * as Loader from './loader'

export const LOGIN = 'LOGIN'
export const REGISTER_USER = 'REGISTER_USER'
export const GET_PROFILE_DATA = 'GET_PROFILE_DATA'
export const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD'

// This gets called for transforming action response into reducer format
export const doLogin = data => (
    {
        type: LOGIN,
        data
    }
)


export const fotgotPassword = data => (
    {
        type: FORGOT_PASSWORD,
        data
    }
)

export const updatePass = data => (
    {
        type: UPDATE_PASSWORD,
        data
    }
)

export const updateUserPasswordData= data => (
    {
        type: UPDATE_USER_PASSWORD,
        data
    }
)



// This function should do network call for action and then dispatch response to reducer
export const updateUserPassword = (payload) => dispatch => {
    console.log('login called, payload is ', payload)
    dispatch(Loader.startLoading())
    return Services.updateUserPassword(payload).then(data => {
        if(data.success)
        {
            toast.success("Password updated successfully");
        }else{
            toast.error(data.message);
        }
        dispatch(updateUserPasswordData(data))
        dispatch(Loader.endLoading())      
    })
}



// This function should do network call for action and then dispatch response to reducer
export const updatePassword = (payload, token) => dispatch => {
    console.log('login called, payload is ', payload)
    dispatch(Loader.startLoading())
    return Services.updatePassword(payload, token).then(data => {
        dispatch(updatePass(data))
        dispatch(Loader.endLoading())     
    })
}

// This function should do network call for action and then dispatch response to reducer
export const login = (payload) => dispatch => {
    console.log('login called, payload is ', payload)
    dispatch(Loader.startLoading())
    return Services.login(payload).then(data => {
        console.log('TCL: login response data', data.sub_id);
        sessionStorage.setItem('subId', data.sub_id);
        sessionStorage.setItem('jwtToken', data.token);
        dispatch(doLogin(data))  
        dispatch(Loader.endLoading())      
    })
}

// This function should do network call for action and then dispatch response to reducer
export const forgotPassword = (payload) => dispatch => {
    console.log('login called, payload is ', payload)
    dispatch(Loader.startLoading())
    return Services.forgotPassword(payload).then(data => {
        dispatch(fotgotPassword(data))
        dispatch(Loader.endLoading())  
    })
}

// This gets called for transforming action response into reducer format
export const doRegister = data => (
    {
        type: REGISTER_USER,
        data
    }
)

// This function should do network call for action and then dispatch response to reducer
export const register = (payload) => dispatch => {
    console.log('login called, payload is ', payload)
    dispatch(Loader.startLoading())
    return Services.registerUser(payload).then(data => {
        console.log(data, 'adjjsj;ad')
        dispatch(doRegister(data))
        dispatch(Loader.endLoading())  
    })
}

// This gets called for transforming action response into reducer format
export const profileData = data => (
    {
        type: GET_PROFILE_DATA,
        data
    }
)

// This function should do network call for action and then dispatch response to reducer
export const getUserProfileData = (payload) => dispatch => {
    dispatch(Loader.startLoading())
    return Services.getProfileData(payload).then(data => {
        dispatch(profileData(data))
        dispatch(Loader.endLoading())  
    })
}

// This gets called for transforming action response into reducer format
export const updateProfile = data => (
    {
        type: UPDATE_PROFILE_DATA,
        data
    }
)

// This function should do network call for action and then dispatch response to reducer
export const updateProfileData = (payload) => dispatch => {
    console.log('login called, payload is ', payload)
    dispatch(Loader.startLoading())
    return Services.updateProfileInfo(payload).then(data => {
        if(data.success)
        {
            toast.success("Profile updated successfully");
        }else{
            toast.error(data.message);
        }
        dispatch(updateProfile(data))
        dispatch(getUserProfileData({subId:payload.sub_id}))  
        dispatch(Loader.endLoading())  
    })
}


