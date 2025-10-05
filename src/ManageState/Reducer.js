import ACTIONS from "./Action";

export const defaultState = {
    list: [],
    action: "none",
    message: ""
}

export const reducer = (state, action) => {

    switch(action.type) {
        case ACTIONS.ADD_TASK:
            return {
                list: [ action.payload, ...state.list ],
                action: "add",
                message: ""
            }
        case ACTIONS.REMOVE_TASK: 
            const updateList = state.list.filter(t => t.task !== action.payload)

            return {
                list: updateList,
                action: "delete",
                message: ""
            }
        case ACTIONS.UPDATE_TASK:
            const { task, content, latestModified } = action.payload
            const modifiedList = state.list.map(t => {
                if (t.task === task) {
                    return {
                        task: content,
                        timestamp: latestModified
                    }
                }
                return t
            }) 

            return { list: modifiedList, action: "update", message: "" }
        case ACTIONS.DELETE_ALL: 
            return { list: [], action: "delete", message: "" }
        case ACTIONS.BACK_UP:
            return { list: action.payload, action: "backup", message: "" }
        case ACTIONS.MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            throw new Error("Invalid action!")
    }
}