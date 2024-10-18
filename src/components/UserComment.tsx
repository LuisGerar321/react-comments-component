import { Avatar, Box, Card, CardContent, CardHeader, CardActions, IconButton, Typography, Collapse, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { FC, useState } from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit"; // Asegúrate de tener estos íconos instalados
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import { IComment } from "../interfaces";
import stc from "string-to-color";
import { FormComment } from "./FormComment";

export const UserComment: FC<{ commentPayload: IComment; refresh?: () => void }> = ({ commentPayload, refresh }) => {
  const friendlyDate = moment(commentPayload.createdAt).format("MMMM D, YYYY h:mm A");
  const avatarColor = stc(commentPayload.email);
  const [openReply, setOpenReply] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);
  const { replies } = commentPayload;
  const isAReplyComment = commentPayload.parentCommentId !== null;
  console.log(refresh);

  return (
    <Box>
      <Card
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
          zIndex: 10,
          mt: 4,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          p: 1,
        }}
      >
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
          <Typography sx={{ mr: 10 }} variant="body1">
            {commentPayload.body}
            {commentPayload.parentCommentId}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setOpenReply((prev) => !prev);
            }}
          >
            <ReplyIcon />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      {replies?.length > 0 && (
        <Button
          variant="text"
          sx={{ mt: -6 }}
          size="small"
          onClick={() => {
            setOpenReplies((prev) => !prev);
          }}
        >
          <Typography variant="body2">{replies.length} replies</Typography>
        </Button>
      )}

      <Collapse in={openReplies}>
        <Box sx={{ width: "80%", pl: 10 }}>
          {replies?.map((comment, index) => (
            <div key={index}>
              <UserComment commentPayload={comment} refresh={refresh}></UserComment>
            </div>
          ))}
        </Box>
      </Collapse>

      <Collapse in={openReply} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 10 }}>
          <FormComment replyToId={commentPayload.id} refresh={refresh} tagReplyTo={isAReplyComment ? commentPayload.email : null} />
        </Box>
      </Collapse>
    </Box>
  );
};
