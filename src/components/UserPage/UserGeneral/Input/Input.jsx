import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import hide from "../../../../images/hide.png";
import show from "../../../../images/show.png";

const Input = ({ control, errors, type, name, label }) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            margin="dense"
            type={name === "password" ? (showPassword ? type : "text") : type}
            label={label}
            variant="standard"
            {...field}
            InputProps={
              name === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="toggle password visibility"
                          edge="end"
                          sx={{ right: "0.5rem", bottom: "0.2rem" }}
                        >
                          <img
                            src={showPassword ? hide : show}
                            alt={
                              showPassword ? "Hide password" : "Show password"
                            }
                            style={{
                              width: "1.8rem",
                              height: "1.8rem",
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {}
            }
          />
        )}
        rules={{
          required: { value: true, message: "The field cannot be empty!!!" },
        }}
      />
      {errors?.[name]?.message && (
        <Typography variant="subtitle1" color="error" align="center">
          {errors?.[name]?.message}
        </Typography>
      )}
    </>
  );
};

export default Input;
