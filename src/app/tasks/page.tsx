"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Divider, IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteOneTask } from "@/actions";

export default function TasksPage() {
  const [name, setName] = React.useState("");
  const [tasks, setTasks] = React.useState([{name: "", _id: {} }]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDeleteTask = (id: string) => {
    deleteOneTask(id)
    setTasks(tasks.filter((task) => task._id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data na api task: ", data)
        setTasks([
          ...tasks,
          data
        ])
        setName("")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log('ik haal data op')
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log("ik render ofzo")

  const listItems = tasks.map((item:{ _id: {}, name: string }) => (
    <ListItem disablePadding key={item._id?.toString()}>
      <ListItemText primary={item.name} />
      <IconButton onClick={() => handleDeleteTask(item._id?.toString())}>
        <Delete />
      </IconButton>
    </ListItem>
    )
  )

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography sx={{ mt: 0, mb: 0 }} variant="h6">
          Tasks Page
        </Typography>
        <TextField label="Enter new task" variant="outlined" name="name" value={name} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        <Typography sx={{ mt: 3, mb: 0 }} variant="h6">Tasks list</Typography>
        <List dense>
          {listItems}
        </List>
      </Box>
    </Container>
  );
}
