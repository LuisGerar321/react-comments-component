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
    <Paper sx={{ width: 1200, display: "flex", backgroundColor: "white", flexDirection: "column", alignItems: "start", p: 4 }}>
      <Typography variant="h3"> Leave comments</Typography>
      <FormComment
        refresh={() => {
          setRefresh((prev) => !prev);
        }}
      ></FormComment>
      {comments.map((comment, index) => (
        <div key={index}>
          <UserComment commentPayload={comment}></UserComment>
        </div>
      ))}
    </Paper>
  );
};
