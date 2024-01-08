"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Numbers } from "@mui/icons-material";

export default function TasksPage() {
  const [name, setName] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };


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
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const listItems = tasks.map((item:{_id: Object, name: String}) => <li key={item._id.toString()}>{item.name}</li>)

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Tasks Page
        </Typography>
        <input name="name" value={name} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
        <Typography variant="h5" mt="16px" mb="0px">Tasks list</Typography>
        <ul>
          {listItems}
        </ul>
      </Box>
    </Container>
  );
}
