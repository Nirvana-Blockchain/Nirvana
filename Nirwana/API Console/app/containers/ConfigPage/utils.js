const getConfigFields = () =>{
    let configs = {
        'Generic Configurations': {
            'Encryption (true/false)': {
                'value': 'false',
                'status': 'active',
                'mandatory': 'true'
            },
            'Data Threshold (in days)': {
                'value': '7',
                'status': 'active',
                'mandatory': 'false'
            },
            'Email Notification (true/false)': {
                'value': 'false',
                'status': 'active',
                'mandatory': 'false'
            },
            'Message Timeout (in seconds)': {
                'value': '180',
                'status': 'active',
                'mandatory': 'true'
            }
        },
        'Practice Configurations': {
            'Location': {
                'value': 'location name',
                'status': 'active',
                'mandatory': 'true'
            },
            'Provider': {
                'value': 'provider name',
                'status': 'active',
                'mandatory': 'true'
            },
            'Resource': {
                'value': 'resource name',
                'status': 'active',
                'mandatory': 'true'
            }
        },
        'Practice Management System Configurations': {
            'Read Service': {
                'value': 'http://pms-server:port/service/read/data',
                'status': 'active',
                'mandatory': 'true'
            },
            'Baseline Service': {
                'value': 'http://pms-server:port/service/bl/data',
                'status': 'active',
                'mandatory': 'true'
            },
            'Write Service': {
                'value': 'http://pms-server:port/service/write/data',
                'status': 'active',
                'mandatory': 'true'
            },
            'Connection Key': {
                'value': 'pms-key',
                'status': 'active',
                'mandatory': 'true'
            },
            'Connection Secret': {
                'value': 'pms-secret',
                'status': 'active',
                'mandatory': 'true'
            }
        },
        'Scheduler Configurations': {
            'Read frequency (in seconds)': {
                'value': '30',
                'status': 'active',
                'mandatory': 'true'
            },
            'Baseline frequency (list of times in a day)': {
                'value': '0300,1100,1900',
                'status': 'active',
                'mandatory': 'true'
            }
        }
    }
    return configs
}


export default {
    getConfigFields: getConfigFields
}