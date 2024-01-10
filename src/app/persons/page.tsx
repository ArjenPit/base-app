import SearchBar from "@/components/SearchBar";
import { Add } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Page() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Persons Page
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <SearchBar label="Search persons" placeholder="Search persons"></SearchBar>
          <Button
            href="/persons/create"
            style={{ width: "300px" }}
            variant="contained"
          >
            <Add style={{ marginRight: "10px" }} />
            Add new person
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
