import { Avatar, Box, Card, CardContent, CardHeader, CardActions, IconButton, Typography, Collapse, Button, Chip, TextField, Skeleton, Snackbar, Alert } from "@mui/material";
import React, { FC, useRef, useState } from "react";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { IComment } from "../interfaces";
import stc from "string-to-color";
import { FormComment } from "./FormComment";
import axios from "axios";

export const UserComment: FC<{ commentPayload: IComment; refresh?: () => void }> = ({ commentPayload, refresh }) => {
  const friendlyDate = moment(commentPayload.createdAt).format("MMMM D, YYYY h:mm A");
  const avatarColor = stc(commentPayload.email);
  const [openReply, setOpenReply] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentPayload.body);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const userCommentRef = useRef<HTMLDivElement>(null);

  const { replies } = commentPayload;
  const isAReplyComment = commentPayload.parentCommentId !== null;

  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailMatch = commentPayload.body.match(emailPattern);
  const email = emailMatch ? emailMatch[0] : "";
  const remainingText = email ? commentPayload.body.replace(email, "").trim() : commentPayload.body;

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      await axios.patch(`http://localhost:3001/comments/${commentPayload.id}`, { body: editedComment });
      setIsEditing(false);
      if (refresh) refresh();
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`http://localhost:3001/comments/${commentPayload.id}`);
      if (refresh) refresh();
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    } finally {
    }
  };

  const handleReply = () => {
    setOpenReply(false);
    showSnackbar("Reply submitted successfully!");
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
          {email && <Chip label={email} color="primary" sx={{ mb: 1 }} />}
          {isSaving ? (
            <Skeleton variant="text" width={200} height={40} />
          ) : isEditing ? (
            <TextField fullWidth variant="outlined" value={editedComment} onChange={(e) => setEditedComment(e.target.value)} multiline />
          ) : (
            <Typography sx={{ mr: 10 }} variant="body1">
              {remainingText}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          {isEditing ? (
            <IconButton size="small" onClick={handleSaveEdit} disabled={isSaving || isDeleting}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={() => setIsEditing(true)} disabled={isSaving || isDeleting}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={() => {
              setOpenReply((prev) => !prev);
            }}
            disabled={isSaving || isDeleting}
          >
            <ReplyIcon />
          </IconButton>
          <IconButton size="small" onClick={handleDeleteComment} disabled={isSaving || isDeleting}>
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
      <Collapse in={openReply} timeout="auto" unmountOnExit>
        <Box sx={{ pl: 10 }}>
          <FormComment onSubmit={handleReply} replyToId={commentPayload.id} parent={userCommentRef} refresh={refresh} tagReplyTo={isAReplyComment ? commentPayload.email : null} />
        </Box>
      </Collapse>
      <Collapse in={openReplies}>
        <Box sx={{ width: "80%", pl: 10 }}>
          {replies?.map((comment, index) => (
            <div key={index}>
              <UserComment commentPayload={comment} refresh={refresh}></UserComment>
            </div>
          ))}
        </Box>
      </Collapse>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
