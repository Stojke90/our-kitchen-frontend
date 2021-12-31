import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Hidden,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import HidenImage from "./HidenImage/HidenImage";
import {
  blueColor,
  center,
  formStyle,
  gridCon,
  gridConStyle,
  submitButton,
} from "./style";

const NewRecipe = ({ value, index }) => {
  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);
  // state for food image
  const [foodImg, setFoodImg] = useState("");

  // use form from react hook form
  const {
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      meal_name: "",
      image_meal: "",
      food_ingredients: [{ ingredient: "" }],
      cooking: "",
      preparation_time: 0,
      cook_id: user._id,
    },
  });

  // for array of object with ingredients
  const { fields, append, remove } = useFieldArray({
    control,
    name: "food_ingredients",
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

  // fun for set image to state for show and convert file to img base64,and put value to image_meal
  const uploadImage = async (e) => {
    const base64 = await convertBase64(e.target.files[0]);
    setFoodImg(base64);
  };

  // submit form,send recipe to data base
  const onSubmit = (data, e) => {
    axios
      .post(process.env.REACT_APP_RECIPES_BASE, {
        ...data,
        createdAt: new Date(),
        cook_name: user.cook_name,
        image_meal: foodImg,
      })
      .then((res) => {
        if (res.statusText === "Created") {
          setFoodImg("");
          setValue("food_ingredients", [{ ingredient: "" }]);
          reset();
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
        <Grid sx={gridCon} item>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
            sx={center}
            style={gridConStyle}
          >
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="meal_name"
                render={({ field }) => (
                  <TextField
                    sx={blueColor}
                    margin="normal"
                    error={errors.meal_name ? true : false}
                    label="Meal name"
                    variant="standard"
                    type="text"
                    {...field}
                  />
                )}
                rules={{
                  required: { value: true, message: "Put meal name!!!" },
                }}
              />
              {errors.meal_name && (
                <Typography variant="caption" color="error" paragraph>
                  {errors.meal_name.message}
                </Typography>
              )}

              <Hidden mdUp>
                <HidenImage center={center} foodImg={foodImg} />
              </Hidden>

              <Controller
                control={control}
                name="image_meal"
                render={({ field: { onChange } }) => (
                  <TextField
                    sx={blueColor}
                    margin="normal"
                    error={errors.image_meal ? true : false}
                    onChange={(e) => {
                      onChange(e);
                      uploadImage(e);
                    }}
                    label="image meal"
                    variant="standard"
                    type="file"
                  />
                )}
                rules={{
                  required: { value: true, message: "Need food image!!!" },
                }}
              />
              {errors.image_meal && (
                <Typography variant="caption" color="error" paragraph>
                  {errors.image_meal.message}
                </Typography>
              )}

              {fields.map((item, index) => (
                <div key={item.id}>
                  <Controller
                    control={control}
                    name={`food_ingredients.${index}.ingredient`}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        sx={blueColor}
                        margin="normal"
                        error={
                          errors?.["food_ingredients"]?.[index] ? true : false
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {fields.length > 1 && (
                                <IconButton
                                  onClick={() => remove(index)}
                                  aria-label="delete"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                        label="ingredient"
                        variant="standard"
                        type="text"
                        {...field}
                      />
                    )}
                    rules={{
                      required: {
                        value: true,
                        message: "Fill input",
                      },
                    }}
                  />

                  {errors.food_ingredients && (
                    <Typography variant="caption" color="error" paragraph>
                      {
                        errors?.["food_ingredients"]?.[index]?.["ingredient"]?.[
                          "message"
                        ]
                      }
                    </Typography>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => append({ ingredient: "" })}
              >
                Add ingredient
              </Button>

              <Controller
                control={control}
                name="cooking"
                render={({ field }) => (
                  <TextField
                    sx={{
                      ".css-66dh3a-MuiInputBase-input-MuiInput-input": {
                        color: "blue",
                      },
                    }}
                    margin="normal"
                    error={errors.cooking ? true : false}
                    label="Preparation"
                    multiline
                    maxRows={6}
                    variant="standard"
                    type="text"
                    {...field}
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Need instruction about cooking!!!",
                  },
                }}
              />

              {errors.cooking && (
                <Typography variant="caption" color="error" paragraph>
                  {errors.cooking.message}
                </Typography>
              )}

              <Controller
                control={control}
                name="preparation_time"
                render={({ field: { onChange } }) => (
                  <TextField
                    sx={blueColor}
                    margin="normal"
                    error={errors.preparation_time ? true : false}
                    onChange={(e) => {
                      onChange(e);
                      setValue("preparation_time", parseInt(e.target.value));
                    }}
                    InputProps={{
                      inputProps: { min: 0 },
                      endAdornment: (
                        <InputAdornment position="end">min</InputAdornment>
                      ),
                    }}
                    label="preparation time"
                    variant="standard"
                    type="number"
                  />
                )}
                rules={{
                  required: {
                    value: true,
                    message: "You need preparation time",
                  },
                  min: {
                    value: 1,
                    message: "Need time for preparation,can't be 0!!!",
                  },
                }}
              />

              {errors.preparation_time && (
                <Typography variant="caption" color="error" paragraph>
                  {errors.preparation_time.message}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={submitButton}
              >
                Create recipe
              </Button>
            </form>
          </Grid>

          <Hidden mdDown>
            <HidenImage center={center} foodImg={foodImg} />
          </Hidden>
        </Grid>
      )}
    </div>
  );
};

export default NewRecipe;
