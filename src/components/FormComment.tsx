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
  const initFormData = { email: "", body: "" };
  const [formData, setFormData] = useState<FormData>(initFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    axios.post("http://localhost:3001/comments", formData).then(() => {
      if (props.refresh) {
        props.refresh();
        setFormData(initFormData);
      }
    });
  };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", width: "100%" }} onSubmit={handleSubmit}>
      <FormControl size="small" fullWidth={false}>
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} required type="email" />
        <TextField label="Add a comment" name="body" value={formData.body} onChange={handleChange} multiline sx={{ mb: 2 }} required type="text" />
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button size="small" type="submit" variant="contained" color="primary" sx={{ width: 100 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
