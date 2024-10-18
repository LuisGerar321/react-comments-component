import { Avatar, Box, Card, CardContent, CardHeader, CardActions, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { FC } from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit"; // Asegúrate de tener estos íconos instalados
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import { IComment } from "../interfaces";
import stc from "string-to-color";

export const UserComment: FC<{ commentPayload: IComment }> = ({ commentPayload }) => {
  const friendlyDate = moment(commentPayload.createdAt).format("MMMM D, YYYY h:mm A");
  const avatarColor = stc(commentPayload.email);

  return (
    <Card sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", p: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: avatarColor }} aria-label="recipe">
            {commentPayload.email[0].toUpperCase()}
          </Avatar>
        }
        title={commentPayload.email}
        subheader={friendlyDate}
      />

      <CardContent>
        <Typography sx={{ mr: 10 }} variant="body2">
          {commentPayload.body}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton size="small">
          <EditIcon />
        </IconButton>
        <IconButton size="small">
          <ReplyIcon />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
