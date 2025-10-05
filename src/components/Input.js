import { useState, useRef, useContext, useEffect } from "react";
import { Button } from "@mui/material"
import { JOBS } from "../ManageState/Action";
import time from '../Time'
import { TODO } from "../App";


function Input() {

    const app = useContext(TODO)
    const [task, setTask] = useState('');
    const focusInput = useRef(null);

    const handleInput = (e) => {
        setTask(e.target.value)
    }

    const handleFocusInput = () => {
        focusInput.current.focus();
    }

    const handleSubmit = () => {
        if (task === "") {
            app.dispatch(JOBS.handleSendMessage("Not leave empty!"))
            app.handleOpen()
            return
        }

        const list = app.toDoApp.list
        if (list.some(t => t.task === task)) {
            app.dispatch(JOBS.handleSendMessage("You had this task yet. So please complete it!"))
            app.handleOpen()
            setTask("")
            return
        }

        app.dispatch(JOBS.handleAddTask({
            task,
            timestamp: time()
        }))
        handleFocusInput()
        setTask("")
    }

    useEffect(() => {
        const listen = (e) => {
            
            if (e.key === "Enter") {
                e.preventDefault()
                handleSubmit()
            } else return
        }

        focusInput.current.addEventListener("keydown", listen)

        return () => focusInput.current.removeEventListener("keydown", listen)
    }, [handleSubmit])

    return (
        <div className="input-controller">
            <textarea
                value={task}
                ref={focusInput}
                placeholder="Enter your task"
                onChange={handleInput}
            >
            </textarea>
            <Button
                variant="contained"
                onClick={() => {handleSubmit()}}>
                Add
            </Button>
        </div>
    )
}

export default Input;