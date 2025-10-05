import { useState, useContext, useRef, useEffect, useMemo } from "react"
import { TODO } from "../App.js"
import { JOBS } from "../ManageState/Action.js";
import time from "../Time.js";
import {
    Button,
    Tooltip
} from "@mui/material"
import {
    EditSquare,
    DoneAll,
    Delete,
    CalendarMonth
} from "@mui/icons-material"

function Task({ task }) {
    const app = useContext(TODO)

    const [updateTask, setUpdateTask] = useState(task.task)
    const [disabled, setDisable] = useState(true);

    const focusInput = useRef(null);

    const handleFocusInput = () => {
        focusInput.current.focus();
    }

    const deleteTask = (task) => {
        app.dispatch(JOBS.handleRemoveTask(task))
    }

    const editTask = () => {
        setDisable(false);
    }

    const saveTask = () => {
        if (task.task === updateTask) {
            setDisable(true)
            return
        }

        const tasks = app.toDoApp.list
        if (tasks.some(t => t.task === updateTask)) {
            app.dispatch(JOBS.handleSendMessage('Oh no! You already have this task'))
            app.handleOpen()
            return;
        }
        if (!updateTask) {
            app.dispatch(JOBS.handleSendMessage("You shouldn't have an empty task"))
            app.handleOpen()
            return;
        }

        app.dispatch(JOBS.handleUpdateTask({ task: task.task, content: updateTask, latestModified: timestamp }))
        setDisable(true)
    }

    const timestamp = useMemo(() => time(), [updateTask, disabled])

    useEffect(() => {
        if (!disabled) {
            handleFocusInput();
        }
    }, [disabled])

    return (
        <div className="rows">
            <textarea
                className="task"
                onChange={(e) => { setUpdateTask(e.target.value) }}
                value={updateTask}
                disabled={disabled}
                ref={focusInput}
            />
            <Tooltip title={task.timestamp}>
                <CalendarMonth sx={{ color: "hsl(210deg 100% 45.1%)" }} />
            </Tooltip>
            <div className="btn-group">
                <Button
                    variant="contained"
                    size="small"
                    sx={{ background: "green" }}
                    startIcon={disabled ? <EditSquare /> : <DoneAll />}
                    onClick={disabled ? editTask : saveTask}
                >
                    {disabled ? "Edit" : "Save"}
                </Button>
                <Button
                    variant="contained"
                    sx={{ background: "red" }}
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => { deleteTask(task.task) }}
                >Delete</Button>
            </div>
        </div>
    );
}

export default Task;
