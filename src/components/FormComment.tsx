import React, { useEffect, useRef, useState } from "react";
import { TextField, Box, FormControl, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

interface FormData {
  email: string;
  body: string;
}

interface Props {
  refresh?: () => void;
  replyToId?: number | null;
  tagReplyTo?: string | null;
  onSubmit?: () => void;
  parent?: any;
}

export const FormComment: React.FC<Props> = (props) => {
  const initFormData = { email: "", body: props?.tagReplyTo != null ? `@${props?.tagReplyTo}` : "" };
  const [formData, setFormData] = useState<FormData>(initFormData);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    axios.post("http://localhost:3001/comments", { ...formData, replyToId: props.replyToId }).then(() => {
      if (props.refresh) props.refresh();
      if (props.onSubmit) props.onSubmit();
      setFormData(initFormData);
    });
  };

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", width: "100%" }} onSubmit={handleSubmit}>
      <FormControl size="small" fullWidth={false}>
        <TextField inputRef={emailInputRef} label="Email" name="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} required type="email" />
        <TextField label="Add a comment" name="body" value={formData.body} onChange={handleChange} multiline sx={{ mb: 2 }} required type="text" />
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          type="submit"
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <SendIcon sx={{ color: "white" }} fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
