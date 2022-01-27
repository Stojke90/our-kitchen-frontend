import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Avatar from "../../../../images/cookAvatar.jpg";
import hide from "../../../../images/hide.png";
import loader from "../../../../images/loader.webp";
import show from "../../../../images/show.png";
import useStyles from "./style";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../../features/user";
import { closeModal } from "../../../../features/modal";

const Form = () => {
  const dispatch = useDispatch();
  // use history from react-router-dom to go on other route if user is log in
  const history = useHistory();
  // css style
  const classes = useStyles();
  // state for toogle password,show or hide password
  const [showPassword, setShowPassword] = useState(false);
  // state for birth input,show label
  const [value, setValue] = useState("");
  // state for image of user
  const [face, setFace] = useState("");
  // state for log or sign in,toogle
  const [signLog, setSignLog] = useState(false);
  // state for email and name for existing cooks
  const [cooksData, setCooksData] = useState({});
  // state if the cook does not exist
  const [exist, setExist] = useState("");
  // state for successfully created account
  const [successfully, setSuccessfully] = useState(false);
  // get current year
  const year = new Date().getFullYear();

  // from react hooks form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // on click submit button create new cook's or log in
  const onSubmit = async (data, e) => {
    data.image = data.image && (await convertBase64(data.image[0]));

    signLog
      ? axios
          .post(process.env.REACT_APP_COOK_BASE, { ...data })
          .then((res) => {
            res.status === 201 && setSuccessfully(!successfully);
            setFace("");
            e.target.reset();
            setTimeout(() => {
              dispatch(closeModal());
            }, 4500);
          })
          .catch((error) => alert(error.message))
      : axios
          .post(process.env.REACT_APP_COOK_LOGIN, { data })
          .then((res) => {
            if (res.status === 200 && res.data.role > 0) {
              dispatch(login(res.data));
              sessionStorage.setItem("User", JSON.stringify(res.data));
              setExist("");
              dispatch(closeModal());
              history.push("/Recipes");
            } else if (res.data.role === 0) {
              setExist("Your confirmation is pending ...");
              setTimeout(() => {
                dispatch(closeModal());
                setExist("");
              }, 4000);
            } else if (res.status === 204) {
              setExist("There is no Cook by this data");
            }
          })
          .catch((error) => alert(error.message));
  };

  // convert file to image
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      file && fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // picture of the cook at the top of the form,from file to img
  const uploadImage = async (e) => {
    const base64 = await convertBase64(e.target.files[0]);
    setFace(base64);
  };

  // handle between Sign in and Log In
  const handleSignLog = () => {
    setSignLog(!signLog);
    setExist("");
    setShowPassword(false);
  };

  // checking if the cook already exists in our base
  const isThereACook = (value, state) => {
    for (let i = 0; i < state.length; i++) {
      if (value === state[i]) {
        return signLog ? false : true;
      }
    }
  };

  // get all cooks names and cooks email for check
  useLayoutEffect(() => {
    let mounted = true;
    axios
      .get(process.env.REACT_APP_COOK_CHECK)
      .then((res) =>
        mounted && res.status === 200
          ? setCooksData(res.data)
          : window.location.reload()
      )
      .catch((error) => alert(error.message));
    return function cleanup() {
      mounted = false;
    };
  }, []);

  // reset form every time when switch between log in and sig in
  useEffect(() => {
    reset();
  }, [signLog, reset]);

  return !successfully ? (
    Object.keys(cooksData).length === 0 ? (
      <img className={classes.loader} src={loader} alt="loader" />
    ) : (
      <Grid>
        <img
          src={face ? face : Avatar}
          alt="cook's look"
          className={classes.cooksImage}
        />
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          {signLog && (
            <Controller
              control={control}
              render={() => (
                <FormControl variant="standard" className={classes.field}>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input
                    defaultValue=""
                    type="text"
                    id="firstName"
                    variant="standard"
                    {...register("first_name", {
                      required: true,
                      minLength: 3,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                </FormControl>
              )}
            />
          )}
          {errors?.first_name?.type === "required" && (
            <Typography variant="subtitle1" color="error">
              This field is required
            </Typography>
          )}
          {errors?.first_name?.type === "minLength" && (
            <Typography variant="subtitle1" color="error">
              The first name needs to contain at least 3 letters
            </Typography>
          )}
          {errors?.first_name?.type === "pattern" && (
            <Typography variant="subtitle1" color="error">
              Alphabetical characters only
            </Typography>
          )}

          {signLog && (
            <Controller
              control={control}
              render={() => (
                <FormControl variant="standard" className={classes.field}>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <Input
                    type="text"
                    id="lastName"
                    defaultValue=""
                    variant="standard"
                    {...register("last_name", {
                      required: true,
                      minLength: 3,
                      pattern: /^[A-Za-z]+$/i,
                    })}
                  />
                </FormControl>
              )}
            />
          )}
          {errors?.last_name?.type === "required" && (
            <Typography variant="subtitle1" color="error">
              This field is required
            </Typography>
          )}
          {errors?.last_name?.type === "minLength" && (
            <Typography variant="subtitle1" color="error">
              The Last name needs to contain at least 3 letters
            </Typography>
          )}
          {errors?.last_name?.type === "pattern" && (
            <Typography variant="subtitle1" color="error">
              Alphabetical characters only
            </Typography>
          )}

          {signLog && (
            <Controller
              control={control}
              render={() => (
                <FormControl variant="standard" className={classes.field}>
                  <InputLabel htmlFor="cooksName">Cook's Name</InputLabel>
                  <Input
                    defaultValue=""
                    type="text"
                    id="cooksName"
                    variant="standard"
                    {...register("cook_name", {
                      required: true,
                      minLength: 3,
                      pattern: /^[A-Z0-9. ]+$/i,
                      validate: (value) => isThereACook(value, cooksData.name),
                    })}
                  />
                </FormControl>
              )}
            />
          )}
          {errors?.cook_name?.type === "validate" && (
            <Typography variant="subtitle1" color="error">
              The name already exists
            </Typography>
          )}
          {errors?.cook_name?.type === "required" && (
            <Typography variant="subtitle1" color="error">
              This field is required
            </Typography>
          )}
          {errors?.cook_name?.type === "minLength" && (
            <Typography variant="subtitle1" color="error">
              The Cook's name needs to contain at least 3 characters
            </Typography>
          )}
          {errors?.cook_name?.type === "pattern" && (
            <Typography variant="subtitle1" color="error">
              Alphabetical characters only
            </Typography>
          )}

          <Controller
            control={control}
            render={() => (
              <FormControl variant="standard" className={classes.field}>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input
                  defaultValue=""
                  type="email"
                  id="email"
                  variant="standard"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    validate: (value) => isThereACook(value, cooksData.email),
                  })}
                />
              </FormControl>
            )}
          />
          {errors?.email?.type === "validate" && (
            <Typography variant="subtitle1" color="error">
              The e-mail already exists
            </Typography>
          )}
          {errors?.email?.type === "required" && (
            <Typography variant="subtitle1" color="error">
              This field is required
            </Typography>
          )}
          {errors?.email?.type === "pattern" && (
            <Typography variant="subtitle1" color="error">
              Invalid email address
            </Typography>
          )}

          <Controller
            control={control}
            render={() => (
              <FormControl variant="standard" className={classes.field}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  defaultValue=""
                  type={showPassword ? "text" : "password"}
                  variant="standard"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="toggle password visibility"
                        sx={{ marginBottom: "4px" }}
                      >
                        {showPassword ? (
                          <img
                            className={classes.iconShowPassword}
                            src={show}
                            alt="show password"
                          />
                        ) : (
                          <img
                            className={classes.iconShowPassword}
                            src={hide}
                            alt="hide password"
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...register("password", {
                    required: true,
                    minLength: 8,
                  })}
                />
              </FormControl>
            )}
          />
          {errors?.password?.type === "required" && (
            <Typography variant="subtitle1" color="error">
              This field is required
            </Typography>
          )}
          {errors?.password?.type === "minLength" && (
            <Typography variant="subtitle1" color="error">
              The password needs to contain at least 8 characters
            </Typography>
          )}

          {signLog && (
            <Controller
              control={control}
              render={() => (
                <FormControl variant="standard" className={classes.field}>
                  <Typography variant="p" color="primary">
                    Your picture
                  </Typography>
                  <Input
                    defaultValue=""
                    type="file"
                    variant="standard"
                    {...register("image", {
                      required: true,
                    })}
                    onChange={(e) => uploadImage(e)}
                  />
                </FormControl>
              )}
            />
          )}

          {errors?.image?.type === "required" && (
            <Typography variant="subtitle1" color="error">
              The image is required
            </Typography>
          )}

          {signLog && (
            <Controller
              control={control}
              render={() => (
                <FormControl variant="standard" className={classes.field}>
                  <InputLabel htmlFor="birth">
                    {value ? "Birth" : ""}
                  </InputLabel>
                  <Input
                    defaultValue=""
                    type="date"
                    id="birth"
                    inputProps={{ min: "1920-01-01", max: `${year - 6}-12-31` }}
                    variant="standard"
                    {...register("birth", {
                      required: true,
                    })}
                    onChange={() => setValue(!value)}
                  />
                </FormControl>
              )}
            />
          )}
          {errors?.birth?.type === "required" && (
            <Typography variant="subtitle1" color="error">
              The date is required
            </Typography>
          )}

          <Button
            variant="outlined"
            type="submit"
            style={{ width: "50%", marginTop: "1rem" }}
          >
            {signLog ? "Sign in" : "Log in"}
          </Button>

          {exist !== "" && (
            <Typography mt={2} variant="subtitle1" color="error">
              {exist}
            </Typography>
          )}

          <Typography mt={2}>
            {signLog ? "Alredy have account " : "Don't have account "}
            <span
              style={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => handleSignLog()}
            >
              {signLog ? "Log in" : "Sign in"}
            </span>
          </Typography>
        </form>
      </Grid>
    )
  ) : (
    <Grid style={{ position: "relative" }}>
      <Typography
        variant="caption"
        color="#22c3c3db"
        sx={{ fontWeight: "bolder", fontSize: "1rem" }}
      >
        Successfully created account please wait for admin confirmation
      </Typography>
      <Button
        sx={{
          position: "absolute",
          top: -10,
          right: -10,
          padding: 0,
          minWidth: "1rem",
        }}
        onClick={() => dispatch(closeModal())}
      >
        x
      </Button>
    </Grid>
  );
};

export default Form;
