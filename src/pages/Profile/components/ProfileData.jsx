import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React from "react";

export const ProfileData = () => {
  return (
    <>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input id="my-input" area-describedby="my-helper-text"></Input>
        <FormHelperText id="my-helper-text"> ops</FormHelperText>
      </FormControl>
    </>
  );
};
