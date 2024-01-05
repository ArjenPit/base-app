"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TasksPage() {
  const [name, setName] = React.useState("");
  const [tasks, setTasks] =React.useState([]);
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
        console.log(data);
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        {tasks.map((item) => <div>{item.name}</div>)}
      </Box>
    </Container>
  );
}
