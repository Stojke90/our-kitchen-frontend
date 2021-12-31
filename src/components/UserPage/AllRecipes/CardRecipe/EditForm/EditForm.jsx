import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import {
  borderBtnImage,
  formStyle,
  inputMultiline,
  inputStyles,
} from "./style";

const EditForm = ({
  recipe,
  changeFoodImage,
  newImage,
  changeArrayWithOneRecipe,
  handleExpandClick,
  index,
  showMessage,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { ...recipe, new_image_food: "" },
  });

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
    changeFoodImage(base64);
  };

  // set value for new image
  useEffect(() => {
    newImage !== "" && setValue("image_meal", newImage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newImage]);

  // send edit recipe
  const onSubmit = (data) => {
    axios
      .put(process.env.REACT_APP_RECIPES_EDIT_RECIPE, { data })
      .then((res) => {
        if (res.status === 201) {
          changeArrayWithOneRecipe(res.data, index);
          handleExpandClick();
          showMessage(true);
          setTimeout(() => showMessage(false), 2500);
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="new_image_food"
          control={control}
          render={({ field: { onChange } }) => (
            <TextField
              margin="normal"
              fullWidth
              variant="standard"
              label="Food image"
              type="file"
              onChange={(e) => uploadImage(e)}
              sx={borderBtnImage}
            />
          )}
        />
        <Controller
          name="meal_name"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              fullWidth
              error={errors.meal_name ? true : false}
              variant="standard"
              label="Meal name"
              type="text"
              sx={inputStyles}
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

        {fields.map((item, index) => (
          <Controller
            key={item.id}
            name={`food_ingredients.${index}.ingredient`}
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                fullWidth
                error={errors?.["food_ingredients"]?.[index] ? true : false}
                variant="standard"
                label="Food ingredient"
                type="text"
                sx={inputStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {fields.length > 1 && (
                        <IconButton
                          onClick={() => remove(index)}
                          aria-label="Delete ingredient"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
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
        ))}

        {errors.food_ingredients && (
          <Typography variant="caption" color="error" paragraph>
            {errors?.["food_ingredients"]?.[index]?.["ingredient"]?.["message"]}
          </Typography>
        )}

        <Button
          sx={{ margin: "1rem auto 2rem auto" }}
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => append({ ingredient: "" })}
        >
          Add ingredient
        </Button>

        <Controller
          name="cooking"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              error={errors.cooking ? true : false}
              multiline
              maxRows={6}
              fullWidth
              variant="standard"
              label="Cooking"
              type="text"
              sx={inputMultiline}
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
          name="preparation_time"
          control={control}
          render={({ field }) => (
            <TextField
              margin="normal"
              error={errors.preparation_time ? true : false}
              fullWidth
              variant="standard"
              label="Preparation time"
              type="number"
              sx={inputStyles}
              {...field}
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
          endIcon={<SaveIcon />}
          sx={{ marginTop: "1.2rem" }}
        >
          Save recipe
        </Button>
      </form>
    </>
  );
};

export default EditForm;
