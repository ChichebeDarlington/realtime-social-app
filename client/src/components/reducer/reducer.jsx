import {
    HANDLE_CHANGE,
    HANDLE_REGISTRATION,
    HANDLE_LOGIN,
    LOG_OUT,
    RELOAD
} from "../action/action"

const reducer = (state,action)=>{

   

if(action.type === HANDLE_CHANGE){
    return {...state, [action.payload.name]:action.payload.value}
}

if(action.type === HANDLE_REGISTRATION){
    return {...state, user: action.payload}
}

if(action.type === HANDLE_LOGIN){
    return {...state, user: action.payload}
}

if(action.type === RELOAD){
    return {...state, user: action.payload}
}

if(action.type === LOG_OUT){
    return {...state, user: null}
}

    return state;
}

export default reducer