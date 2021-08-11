import React, { useState, useEffect } from "react";

import TaskDialog from "./components/TaskDialog.jsx";

import logo from "./assets/logo.png";

import {
  AppBar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TaskLine from "./components/TaskLine.jsx";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState("low");
  const levels = ["low", "medium", "high"];

  const [newTask, setNewTask] = useState({
    id: null,
    title: "",
    description: "",
    level: urgencyLevel,
    status: "Backlog",
  });

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const addTask = (taskToAdd) => {
    let newTaskList = [...tasks, taskToAdd];

    setTasks(newTaskList);

    saveTasksToLocalStorage(newTaskList);
    setOpenDialog(false);
  };

  const deleteTask = (e, taskId) => {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== selectedTask;
    });

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  };

  const moveTask = (taskId, newStatus) => {
    let filteredTasks = tasks.map((item, index) =>
      item.id === taskId ? { ...item, status: newStatus } : item
    );

    setTasks(filteredTasks);

    saveTasksToLocalStorage(filteredTasks);
  };

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    try {
      let loadedTasks = localStorage.getItem("tasks");

      let tasks = JSON.parse(loadedTasks);

      if (tasks) {
        setTasks(tasks);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);

  const hadleOpenDeleteDialog = (e, id) => {
    setOpenDeleteDialog(true);
  };

  const ConfirmDialog = (props) => {
    const { title, children, open, setOpen, deleteTask } = props;
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='confirm-dialog'>
        <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => setOpen(false)}
            color='secondary'>
            No
          </Button>
          <Button
            variant='contained'
            onClick={(e, selectedTask) => {
              setOpen(false);
              deleteTask(e, selectedTask);
            }}
            color='default'>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <div className='main'>
      <AppBar position='static' color='primary' className='toolbar'>
        <img src={logo} alt='logo' className='logo' />
        <Button
          variant='contained'
          size='small'
          color='secondary'
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenDialog(true)}>
          New Task
        </Button>
      </AppBar>

      <ConfirmDialog
        title='Delete Task?'
        open={openDeleteDialog}
        deleteTask={deleteTask}
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
        setOpen={setOpenDeleteDialog}>
        <Typography variant='h6'>
          Are you sure you want to delete this task? Reupload
        </Typography>
        <Typography variant='subtitle1'>{selectedTask}</Typography>
      </ConfirmDialog>

      <TaskDialog
        levels={levels}
        setUrgencyLevel={setUrgencyLevel}
        urgencyLevel={urgencyLevel}
        open={openDialog}
        onClose={handleClose}
        addTask={() => addTask(newTask)}
        setNewTask={setNewTask}
        newTask={newTask}></TaskDialog>

      <div className='dashboard'>
        <TaskLine
          hadleOpenDeleteDialog={hadleOpenDeleteDialog}
          setSelectedTask={setSelectedTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status='Backlog'
          allTasks={tasks}
          className='taskline'></TaskLine>
        <TaskLine
          hadleOpenDeleteDialog={hadleOpenDeleteDialog}
          setSelectedTask={setSelectedTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status='Progress'
          allTasks={tasks}
          className='taskline'></TaskLine>
        <TaskLine
          hadleOpenDeleteDialog={hadleOpenDeleteDialog}
          setSelectedTask={setSelectedTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status='Done'
          allTasks={tasks}
          className='taskline'></TaskLine>
      </div>
    </div>
  );
};

export default App;
