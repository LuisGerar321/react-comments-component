import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Greating } from "./components/Greating";
import { Typography } from "@mui/material";
import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Greating message="Luis">
              <Typography>Jueves</Typography>
              <Form></Form>
            </Greating>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
