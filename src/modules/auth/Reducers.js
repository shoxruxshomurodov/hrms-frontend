import Actions from "./Actions";
export default function AuthReducer(state = {}, action) {
    switch (action.type) {
        case Actions.SHOW_WELCOME_NOTIFY.REQUEST:
            return {
                ...state,
                welcome: false,
            };
        case Actions.SHOW_WELCOME_NOTIFY.SUCCESS:
            return {
                ...state,
                welcome: true,
            };
        case Actions.SHOW_WELCOME_NOTIFY.TRIGGER:
            return {
                ...state,
                welcome: false,
            };


        default:
            return state;
    }
}



