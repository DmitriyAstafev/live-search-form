import { Autocomplete, InputLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!inputValue) {
      setOptions([]);
    } else
      axios
        .get(
          `http://87.249.222.54:19191/api/device_models?search=${inputValue}&count=15&offset=0`
        )
        .then((res) => {
          let modelsArr = res.data;
          setOptions(modelsArr.map((obj) => obj.name));
        })
        .catch((err) => console.log(err));
  }, [inputValue]);
  return (
    <div>
      <InputLabel
        htmlFor="autocomplete"
        sx={{ fontWeight: "bold", color: "black" }}
      >
        Серийный номер или название модели ККТ:
      </InputLabel>
      <Autocomplete
        sx={{ mb: 6 }}
        disablePortal
        noOptionsText={"Моделей не найдено"}
        id="autocomplete"
        options={options}
        onInputChange={(event, newInputValue) => {
          setInputValue(() => newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ bgcolor: "#d7d7d7" }}
            size="small"
            placeholder="Введите серийный номер или название модели ККТ"
          />
        )}
      />
    </div>
  );
};

export default SearchForm;
