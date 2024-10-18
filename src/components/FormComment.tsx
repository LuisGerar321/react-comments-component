import React, { useState } from "react";
import { TextField, Button, Box, FormControl } from "@mui/material";
import axios from "axios";

interface FormData {
  email: string;
  body: string;
}

interface Props {
  refresh?: () => void;
}

export const FormComment: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState<FormData>({ email: "", body: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    axios.post("http://localhost:3001/comments", formData).then(() => {
      if (props.refresh) {
        props.refresh();
      }
    });
  };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", position: "relative", width: "100%", height: 200 }} onSubmit={handleSubmit}>
      <FormControl>
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />

        <TextField label="Add a comment" value={formData.body} onChange={handleChange} name="body" sx={{ mb: 2, height: 200 }} />
      </FormControl>

      <Button type="submit" variant="contained" color="primary" sx={{ width: 100, height: 40, position: "absolute", right: 10, bottom: 0 }}>
        Submit
      </Button>
    </Box>
  );
};
