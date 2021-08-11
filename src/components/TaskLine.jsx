import React from "react";
import {
  Typography,
  IconButton,
  Box,
  Menu,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";

const TaskLine = ({
  status,
  allTasks,
  moveTask,
  setSelectedTask,
  hadleOpenDeleteDialog,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(status);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectedItem = (e, id, status) => {
    let newStatus = e.target.value;
    moveTask(id, newStatus);
    handleClose();
  };
  let taskList, tasksForStatus;

  if (allTasks) {
    tasksForStatus = allTasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task, index) => {
      return (
        <Box
          p='5px 10px'
          bgcolor='background.light'
          boxShadow={1}
          borderRadius={5}
          className='task'
          key={index}>
          <Menu
            id='fade-menu'
            anchorEl={anchorEl}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={open}
            onClose={handleClose}>
            <Box m='5px 10px'>
              <RadioGroup
                aria-label='quiz'
                name='quiz'
                value={value}
                onChange={(e, id, status) =>
                  handleSelectedItem(e, task.id, task.status)
                }>
                <FormControlLabel
                  value='Backlog'
                  control={<Radio color='primary' />}
                  label='Backlog'
                />
                <FormControlLabel
                  value='Progress'
                  control={<Radio color='primary' />}
                  label='Progress'
                />
                <FormControlLabel
                  value='Done'
                  control={<Radio color='primary' />}
                  label='Done'
                />
              </RadioGroup>
            </Box>
          </Menu>
          <Box bgcolor={`urgency.${task.level}`} className='level'></Box>
          <Box className='header'>
            <Typography variant='subtitle1' className='title'>
              {task.title}
            </Typography>
            <Typography variant='subtitle2'>{task.description}</Typography>
          </Box>
          <Box className='actionsContainer'>
            <Tooltip title='Delete'>
              <IconButton
                aria-label='delete'
                color='primary'
                onClick={(e, id) => {
                  hadleOpenDeleteDialog();
                  setSelectedTask(task.id);
                }}>
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Move'>
              <IconButton
                aria-label='move'
                color='primary'
                onClick={(e) => handleClick(e)}>
                <SwapHorizIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      );
    });
  }

  return (
    <Box className='taskline'>
      <Typography variant='h6' align='center'>
        {status}
      </Typography>
      <Box className='tasksSection'>{taskList}</Box>
    </Box>
  );
};
export default TaskLine;
