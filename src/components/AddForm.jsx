import { Button, InputLabel, TextField, Container } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const AddForm = ({ addRequestHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Container sx={{ bgcolor: "#d7d7d7", p: 2, borderRadius:1 }}>
      <form onSubmit={handleSubmit((input) => addRequestHandler(input))}>
        <InputLabel
          htmlFor="request"
          sx={{ fontWeight: "bold", color: "black" }}
        >
          Запрос
        </InputLabel>
        <TextField
          size="small"
          id="request"
          name="request"
          {...register("request", { required: "Это обязательное поле" })}
          error={Boolean(errors.request)}
          helperText={errors.request?.message}
          InputProps={
            errors.request && {
              inputProps: {
                style: { color: "red" },
              },
            }
          }
          fullWidth
          placeholder="Введите запрос"
        />
        <InputLabel
          htmlFor="description"
          sx={{ fontWeight: "bold", color: "black", mt: 2 }}
        >
          Описание запроса
        </InputLabel>
        <TextField
          placeholder="Введите описание"
          id="description"
          name="description"
          {...register("description", { required: "Это обязательное поле" })}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
          InputProps={
            errors.description && {
              inputProps: {
                style: { color: "red" },
              },
            }
          }
          fullWidth
          multiline={true}
          minRows={5}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              textTransform: "none",
              textAlign: "left",
              bgcolor: "#42a5f5",
              mt: 2,
            }}
          >
            Отправить запрос
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddForm;
