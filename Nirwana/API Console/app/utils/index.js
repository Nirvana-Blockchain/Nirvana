
const baseUrl = "/api/";

let commonHeaders = {
    'Content-Type': 'application/json'
}


const updateUserPassword = (payload) => fetch(`${baseUrl}auth/update`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
        //'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(response => response.json());


const updatePassword = (payload, token) => fetch(`${baseUrl}auth/updatepassword${token}`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
        //'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(response => response.json());



const forgotPassword = (payload) => fetch(`${baseUrl}auth/verifyemail`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
        //'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(response => response.json());

const login = (payload) => fetch(`${baseUrl}auth/authorize`, {
    method: 'POST',
    headers: {
        ...commonHeaders,
        //'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(response => response.json());

// Fetch list of PMS
const fetchPMSList = () => fetch(`${baseUrl}pms/list`, {
    method: 'GET',
    headers: {
        ...commonHeaders
    }
}).then(response => response.json());


// Fetch PMS data
const fetchPMSData = (pmsId) => fetch(`${baseUrl}pms/${pmsId}`, {
    method: 'GET',
    headers: {
        ...commonHeaders
    }
}).then(response => response.json());

// Fetch Practice List
const fetchPracticeList = () => fetch(`${baseUrl}practice/list`, {
    method: 'GET',
    headers: {
        ...commonHeaders
    }
}).then(response => response.json());

// Fetch Practice List
const fetchPracticeListByPmsId = (pmsId) => fetch(`${baseUrl}practice/list?pmsId=${pmsId}`, {
    method: 'GET',
    headers: {
        ...commonHeaders
    }
}).then(response => response.json());

// Fetch Practice config
const fetchPracticeConfigByPsId = (pmsId) => fetch(`${baseUrl}practice/config/${pmsId}`, {
    method: 'GET',
    headers: {
        ...commonHeaders
    }
}).then(response => response.json());

// Update Practice config
const updatePracticeConfig = (reqObj) => fetch(`${baseUrl}practice/config`, {
    method: 'POST',
    headers: {
        ...commonHeaders
    },
    body: JSON.stringify(reqObj)
}).then(response => response.json());


// Register User
const registerUser = (registerUserData) => fetch(`${baseUrl}register/registerUser`, {
    method: 'POST',
    headers: {
        ...commonHeaders
    },
    body: JSON.stringify(registerUserData)
}).then(response => response.json());

// Get profile data
const getProfileData = (subcriberInfo) => fetch(`${baseUrl}register/getprofile`, {
    method: 'POST',
    headers: {
        ...commonHeaders
    },
    body: JSON.stringify(subcriberInfo)
}).then(response => response.json());

// Get profile data
const updateProfileInfo = (subcriberInfo) => fetch(`${baseUrl}register/updateprofile`, {
	method: 'POST',
    headers: {
        ...commonHeaders
    },
    body: JSON.stringify(subcriberInfo)
}).then(response => response.json());

const fetchSubscriptionList = (subscriptionId) => fetch(`${baseUrl}subscription/${subscriptionId}`, {
    method: 'GET',
    headers: {
        ...commonHeaders
    }
}).then(response => response.json());

const manageSubscription = (reqObj) => fetch(`${baseUrl}subscription/manage`, {
    method: 'POST',
    headers: {
        ...commonHeaders
    },
    body: JSON.stringify(reqObj)
}).then(response => response.json());


export default {
    login: login,
    fetchPMSList: fetchPMSList,
    fetchPMSData: fetchPMSData,
    fetchPracticeList: fetchPracticeList,
    fetchPracticeListByPmsId: fetchPracticeListByPmsId,
    registerUser:registerUser,
    getProfileData:getProfileData,
    updateProfileInfo:updateProfileInfo,
    fetchSubscriptionList : fetchSubscriptionList,
    manageSubscription: manageSubscription,
    fetchPracticeConfigByPsId: fetchPracticeConfigByPsId,
    updatePracticeConfig: updatePracticeConfig,
    forgotPassword:forgotPassword,
    updatePassword:updatePassword,
    updateUserPassword:updateUserPassword
}