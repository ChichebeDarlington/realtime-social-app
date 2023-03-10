import {
    HANDLE_CHANGE,
    HANDLE_SUBMIT,
    HANDLE_LOGIN,
    RELOAD
} from "../action/action"

const reducer = (state,action)=>{

   

if(action.type === HANDLE_CHANGE){
    return {...state, [action.payload.name]:action.payload.value}
}

if(action.type === HANDLE_SUBMIT){
    return {...state, user: action.payload}
}

if(action.type === HANDLE_LOGIN){
    return {...state, redirect:true, user: action.payload}
}

if(action.type === RELOAD){
    return {...state, user: action.payload}
}

if(action.type === "LOG_OUT"){
    return {...state, user: null}
}

    return state;
}

export default reducer