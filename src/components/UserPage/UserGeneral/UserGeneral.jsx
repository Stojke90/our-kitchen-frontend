import {
  Alert,
  Button,
  Collapse,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "./Input/Input";
import { cardForm, formCon, textH, textH2 } from "./style";
import { useDispatch } from "react-redux";
import { login } from "../../../features/user";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const UserGeneral = ({ user, value, index }) => {
  const dispatch = useDispatch();

  // state for cook image to show
  const [cookImg, setCookImg] = useState(user.image);
  // state for open and close alert box
  const [openAlert, setOpenAlert] = useState(false);
  // state for switch button
  const [saving, setSaving] = useState(false);

  // from base64 to file
  const userImageFile = new File([user.image], "File name", {
    type: user.image.split(";")[0].split(":")[1],
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    setValue,
  } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      cook_name: user.cook_name,
      password: user.password,
      image: userImageFile,
      birth: user.birth,
      date: user.date,
      email: user.email,
      role: user.role,
      _id: user._id,
    },
  });

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

  // fun for set image to state for show and convert file to img base64,and put value to cook image
  const uploadImage = async (e) => {
    const base64 = await convertBase64(e.target.files[0]);
    setValue("image", base64);
    setCookImg(base64);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setSaving(true);

    if (typeof data.image !== "string") {
      data.image = user.image;
    }

    axios
      .put(process.env.REACT_APP_COOK_EDIT_COOK_DATA, { data })
      .then((res) => {
        if (res.status === 201) {
          dispatch(login(res.data));
          sessionStorage.setItem("User", JSON.stringify(res.data));
          reset(res.data);
          setOpenAlert(true);
          setSaving(false);
          setTimeout(() => setOpenAlert(false), 2200);
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box m={2}>
          <Typography
            mt={6}
            mb={6}
            align="center"
            variant="h4"
            color="primary"
            sx={textH}
          >
            <strong>Data change</strong>
          </Typography>
          <Typography
            mb={6}
            align="center"
            variant="h4"
            color="#fff"
            sx={textH2}
          >
            <em>
              Here you can change your data, be careful when entering new!
            </em>
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={formCon}>
            <Grid item xs={12} sm={8} md={5} lg={5} xl={5} sx={cardForm}>
              <Input
                control={control}
                errors={errors}
                type={"text"}
                name={"first_name"}
                label={"First name"}
              />
              <Input
                control={control}
                errors={errors}
                type={"text"}
                name={"last_name"}
                label={"Last name"}
              />
              <Input
                control={control}
                errors={errors}
                type={"text"}
                name={"cook_name"}
                label={"Cook name"}
              />
              <Input
                control={control}
                errors={errors}
                type={"password"}
                name={"password"}
                label={"Password"}
              />
              <img
                src={cookImg}
                alt="cook"
                style={{ width: "100%", padding: "1rem 0" }}
              />

              <Controller
                name="image"
                control={control}
                render={({ field: onChange }) => (
                  <TextField
                    fullWidth
                    sx={{ marginBottom: "0.7rem" }}
                    type="file"
                    label="Cook Image"
                    variant="standard"
                    onChange={uploadImage}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "The field cannot be empty!!!",
                  },
                }}
              />
              {errors?.image?.message && (
                <Typography variant="subtitle1" color="error" align="center">
                  {errors?.image?.message}
                </Typography>
              )}

              {saving ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                >
                  Saving data
                </LoadingButton>
              ) : (
                <Button
                  disabled={!isDirty}
                  type="submit"
                  variant="contained"
                  mt={4}
                >
                  Save the changes
                </Button>
              )}
            </Grid>
          </form>

          <Collapse
            in={openAlert}
            sx={{
              position: "fixed",
              width: "50%",
              bottom: "1rem",
              right: "1rem",
              zIndex: "999",
              "@media (max-width: 500px)": { width: "80%" },
            }}
          >
            <Alert sx={{ mb: 2 }}>Successfully saved data</Alert>
          </Collapse>
        </Box>
      )}
    </div>
  );
};

export default UserGeneral;
