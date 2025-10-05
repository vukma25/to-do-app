const ACTIONS = {
    ADD_TASK: "add_task",
    REMOVE_TASK: "remove_task",
    UPDATE_TASK: "update_task",
    DELETE_ALL: "delete_all",
    BACK_UP: "back_up",
    MESSAGE: "message"
}

const createAction = (t, p = null) => {
    if (!p) {
        return { type: t}
    }
    return {
        type: t,
        payload: p
    }
}

export const JOBS = {
    handleAddTask: (payload) => createAction(ACTIONS.ADD_TASK, payload),
    handleRemoveTask: (payload) => createAction(ACTIONS.REMOVE_TASK, payload),
    handleUpdateTask: (payload) => createAction(ACTIONS.UPDATE_TASK, payload),
    handleDeleteAll: () => createAction(ACTIONS.DELETE_ALL),
    handleBackUp: (payload) => createAction(ACTIONS.BACK_UP, payload),
    handleSendMessage: (payload) => createAction(ACTIONS.MESSAGE, payload),
} 

export default ACTIONS