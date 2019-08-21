

export const AuthReducer = (state,action) => {
    switch(action.type) 
    {
 
        case "USER_LOADED" :
            return{
                ...state,
                isAuthenticiated:true,
                loading:false,
                user:action.payload
            }
        case "REGISTER_SUCCESS" :
        case "LOGIN_SUCCESS":
                localStorage.setItem("token",action.payload.token)
                return {
                    ...state,
                    ...action.payload, 
                    isAuthenticiated:true,
                    loading:false,
                };
        case "REGISTER_FAIL" :
        case "AUTH_ERROR" :
        case "LOGIN_FAIL" :
        case "LOGOUT":
            localStorage.removeItem("token")
            return{
                ...state,
                token:null,
                isAuthenticiated:false,
                loading:false,
                user:null,
                error:action.payload,
            } 
        case "CLEAR_ERRORS" :
            return {
                ...state,
                error:null
            }
        default :
        return state
    }
}