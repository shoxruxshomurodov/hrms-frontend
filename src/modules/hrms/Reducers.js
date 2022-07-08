import Actions from './Actions';
import AuthActions from "../auth/Actions";
import {get} from "lodash";

export default function mainReducer(state = {}, action) {
    switch (action.type) {
        case Actions.CHANGE_MODE.SUCCESS:
            let {mode} = action.payload;
            return {
                ...state,
                mode,
            };

        case Actions.CHANGE_LANG.SUCCESS:
            let {lang} = action.payload;
            return {
                ...state,
                lang,
            };
        case Actions.EMPLOYEE_INFORMATION_REQUEST.SUCCESS:
            return {
                ...state,
                isFetched: true,
                sendedInfo: get(action, "payload.result"),
            };
        case Actions.EMPLOYEE_INFORMATION_REQUEST.FAILURE:
            return {
                ...state,
                isFetched: false,
            };
        case Actions.EMPLOYEE_INFORMATION_REQUEST.REQUEST:
            return {
                ...state,
                isFetched: false,
            };
        case Actions.STRUCTURE_CHANGE_HIERARCHY.REQUEST:
            return {
                ...state,
                structure_tree: get(action, "payload.result")
            };
        case Actions.STRUCTURE_LINK_BATCH.REQUEST:
            return {
                ...state,
                structureLinkBatchIsFetched: false,
                hasError: false
            };
        case Actions.STRUCTURE_LINK_BATCH.SUCCESS:
            return {
                ...state,
                structureLinkBatchIsFetched: true,
                hasError: false
            };
        case Actions.STRUCTURE_LINK_BATCH.FAILURE:
            return {
                ...state,
                structureLinkBatchIsFetched: true,
                hasError: true
            };
        case Actions.STRUCTURE_ABS_SYNC.REQUEST:
            return {
                ...state,
                structureAbsSync: false,
                hasError: false
            };
        case Actions.STRUCTURE_ABS_SYNC.SUCCESS:
            return {
                ...state,
                structureAbsSync: true,
                hasError: false
            };
        case Actions.STRUCTURE_ABS_SYNC.FAILURE:
            return {
                ...state,
                structureAbsSync: true,
                hasError: true
            };
        case Actions.STRUCTURE_ABS_SYNC_FILIALS.REQUEST:
            return {
                ...state,
                structureAbsSyncFilials: false,
                hasError: false
            };
        case Actions.STRUCTURE_ABS_SYNC_FILIALS.SUCCESS:
            return {
                ...state,
                structureAbsSyncFilials: true,
                hasError: false
            };
        case Actions.STRUCTURE_ABS_SYNC_FILIALS.FAILURE:
            return {
                ...state,
                structureAbsSyncFilials: true,
                hasError: true
            };
        case AuthActions.SET_SIDEBAR_CONDITION.REQUEST:
            return ((action, state) => {
                return {
                    ...state,
                    isSidebarOpen:get(action,'payload')
                };
            })(action, state);
        default:
            return state;
    }
}
