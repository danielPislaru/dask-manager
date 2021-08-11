import React from "react";

import { Dialog, Button, TextField, Box } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { v4 as uuidv4 } from "uuid";

const TaskDialog = ({
  onClose,
  open,
  addTask,
  newTask,
  setNewTask,
  setUrgencyLevel,
  urgencyLevel,
  levels,
}) => {
  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    setNewTask((prevState) => {
      return { ...prevState, [inputName]: inputValue, id: uuidv4() };
    });
  };

  const clickedButtonHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let level = e.currentTarget.name;
    setUrgencyLevel(level);
    setNewTask((prevState) => {
      return { ...prevState, level: level };
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className='taskDialog'>
        <TextField
          name='title'
          variant='outlined'
          placeholder='Task Name'
          label='Task Name'
          size='small'
          fullWidth
          onChange={handleOnChange}
        />
        <TextField
          name='description'
          multiline
          rowsmin={2}
          maxRows={4}
          variant='outlined'
          placeholder='Task Description'
          label='Task Description'
          fullWidth
          size='small'
          onChange={handleOnChange}
        />
        <Box className='urgencyLevelContainer'>
          {levels.map((btn) => {
            return (
              <Box
                key={btn}
                bgcolor={`urgency.${btn}`}
                color='#fefefe'
                className='urgencyLevel'>
                <Button
                  name={btn}
                  size='small'
                  onClick={clickedButtonHandler}
                  disabled={urgencyLevel === btn}>
                  {btn}
                </Button>
              </Box>
            );
          })}
        </Box>

        <Button
          variant='contained'
          size='small'
          startIcon={<SaveIcon />}
          className='saveButton'
          onClick={addTask}
          disabled={
            newTask.title.length > 0 && newTask.description.length > 0
              ? false
              : true
          }>
          Submit Task
        </Button>
      </div>
    </Dialog>
  );
};
export default TaskDialog;
