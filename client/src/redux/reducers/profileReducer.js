import { 
    GET_PROFILE, 
    PROFILE_LOADING, 
    CLEAR_CURRENT_PROFILE, 
    GET_PROFILES, 
    GET_FILTERED_PROFILES,
    SET_SEARCH_STRING
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    searchString: '',
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };
        case GET_FILTERED_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            };
        case SET_SEARCH_STRING:
            return {
                ...state,
                searchString: action.payload
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}