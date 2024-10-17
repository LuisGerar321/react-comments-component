import React, { useState } from "react";
import { TextField, Button, Box, FormControl } from "@mui/material";

interface FormData {
  key: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ key: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box component="form" sx={{}} onSubmit={handleSubmit}>
      <FormControl>
        <TextField label="Key" name="key" value={formData.key} onChange={handleChange} sx={{}} />
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default Form;
