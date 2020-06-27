const envVariables = process.env 

const config = {}

Object.keys (envVariables).forEach(variable =>
    if(variable.includes('REACT_APP')){
        const envKey = variable.replace('REACT_APP_', "")
        Config[envKey] = envVariables[variable]
    }
    )


export default Config;