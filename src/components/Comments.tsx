import { Box, Paper, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { FormComment } from "./FormComment";
import { UserComment } from "./UserComment";
import axios from "axios";
import { IComment } from "../interfaces";

interface Props {}

export const Comments: FC<Props> = (props: Props) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/comments").then((data) => setComments(data.data));
  }, [refresh]);
  return (
    <Paper
      sx={{ width: { xs: 400, sm: 550, md: 800, lg: 900 }, maxHeight: { xs: 800 }, display: "flex", backgroundColor: "white", flexDirection: "column", alignItems: "start", p: 4, overflow: "auto" }}
    >
      <Typography variant="h1" fontSize={50} sx={{ mb: 2 }}>
        Leave comments
      </Typography>
      <FormComment
        refresh={() => {
          setRefresh((prev) => !prev);
        }}
      ></FormComment>
      <Box sx={{ width: "100%" }}>
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <UserComment
              commentPayload={comment}
              refresh={() => {
                setRefresh((prev) => !prev);
              }}
            ></UserComment>
          </div>
        ))}
      </Box>
    </Paper>
  );
};
