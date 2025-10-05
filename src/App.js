import { useState, useEffect, useReducer, createContext } from "react";
import { defaultState, reducer } from "./ManageState/Reducer.js";
import { JOBS } from "./ManageState/Action.js";
import Input from "./components/Input.js"
import List from "./components/List.js"
import { 
  Modal,
  Typography,
  Box,
  Pagination 
} from "@mui/material";
import style from "./style.js";

export const TODO = createContext()

function App() {

  const [toDoApp, dispatch] = useReducer(reducer, defaultState)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMovePage = (e, value) => {
    setPage(value)
  }

  useEffect(() => {
    if (toDoApp.action === "none") return

    localStorage.setItem("tasks", JSON.stringify(toDoApp.list))
  }, [toDoApp.action, toDoApp.list])

  useEffect(() => {
    const storage = localStorage.getItem("tasks")
    if (!storage) {
      localStorage.setItem("tasks", JSON.stringify([]))
      return
    }
    dispatch(JOBS.handleBackUp(JSON.parse(storage)))
  }, [])

  return (
    <div className="App">
      <TODO.Provider value={{ toDoApp, dispatch, page, handleOpen }}>
        <Input />
        <List />
      </TODO.Provider>
      <div className="paging">
        {toDoApp.list.length > 8 && <Pagination
          count={Math.ceil(toDoApp.list.length / 8)}
          shape="rounded"
          onChange={handleMovePage}
        />}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Warning: invalid action
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {toDoApp.message}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default App;
