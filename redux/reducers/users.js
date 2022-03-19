import {  CLEAR_DATA, FETCH_ALL_USER_STATE_CHANGE,FETCH_FRIENDS_STATE_CHANGE  } from "./../constants/index"

const initialState = {
    usersList:[],
    friendsList:[],
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_DATA:
            return initialState;
        case FETCH_ALL_USER_STATE_CHANGE:
            return {...state,usersList:action.payload}
        case FETCH_FRIENDS_STATE_CHANGE:
            return{
                ...state,
                usersList:state.usersList.map((res)=>
                    res.uid===action.uid ? {...res, status:action.status} : res
                )
            }
        default:
            return state;
    }
}