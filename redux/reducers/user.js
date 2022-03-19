import {  CLEAR_DATA, EMAIL_STATE_CHANGE, FETCH_USER_FREINDS_STATE_CHNAGE, USER_STATE_CHANGE, FETCH_FRIENDS_STATE_CHANGE, FETCH_USER_FRIENDS_TATE_CHANGE, PASSWORD_STATE_CHANGE, USERNAME_STATE_CHANGE, FULLNAME_STATE_CHANGE  } from "./../constants/index"

const initialState = {
    currentUser: {},
    posts: [],
    friends: [],
    requestList:[],
    email:"",
    password:"",
    username:"",
    fullname:"",
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case PASSWORD_STATE_CHANGE:
            return {...state,password:action.payload}
        case EMAIL_STATE_CHANGE:
            return {...state,email:action.payload}
        case USERNAME_STATE_CHANGE:
            return {...state,username:action.payload}
        case FULLNAME_STATE_CHANGE:
            return {...state,fullname:action.payload}
        case USER_STATE_CHANGE:
            return {...state,currentUser:action.payload}
        case FETCH_USER_FRIENDS_TATE_CHANGE:
            return{ ...state, friends:action.payload }
        case CLEAR_DATA:
            return initialState;
        case FETCH_USER_FREINDS_STATE_CHNAGE:
            return {
                ...state,
                requestList:action.payload
            }
        default:
            return state;
    }
}