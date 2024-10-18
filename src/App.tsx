import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Comments } from "./components/Comments";

function App() {
  return (
    <Box sx={{ backgroundColor: "whitesmoke", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Comments></Comments>} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
