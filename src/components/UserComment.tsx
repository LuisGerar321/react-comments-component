import { Box, Button, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { IComment } from "../interfaces";

export const UserComment: FC<{ commentPayload: IComment }> = ({ commentPayload }) => {
  return (
    <Box sx={{ m: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <Typography variant="h1" fontSize={18} fontWeight="bold">
        {commentPayload.email}
      </Typography>
      <Typography variant="h4" fontSize={18}>
        {commentPayload.body}
      </Typography>

      <Box>
        <Grid container>
          <Grid item xs={4}>
            <Button size="small">Edit</Button>
          </Grid>
          <Grid item xs={4}>
            <Button size="small">Reply</Button>
          </Grid>
          <Grid item xs={4}>
            <Button size="small">Delete</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
