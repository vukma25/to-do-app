import { useContext, useMemo } from "react";
import { TODO } from "../App.js";
import Task from "./Task.js"
import { JOBS } from "../ManageState/Action.js";
import { Button } from "@mui/material"
import { DeleteForever } from "@mui/icons-material";

function List() {
    const app = useContext(TODO)
    const len = app.toDoApp.list.length

    const deleteAll = () => {
        app.dispatch(JOBS.handleDeleteAll())
    }
    const start = useMemo(() => (app.page - 1) * 8, [app.page])

    return (
        <div className="cols">
            {
                app.toDoApp.list.slice(start, start + 8).map(t =>
                    <Task
                        key={t.task}
                        task={t}
                    />
                )
            }
            {len !== 0 && 
                <Button 
                    variant="contained"
                    startIcon={<DeleteForever />}
                    onClick={() => {deleteAll()}}
                >Delete all
                </Button>}
        </div>
    )
}

export default List;