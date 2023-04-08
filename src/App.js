import { Container, Button, Modal, Box, Typography } from "@mui/material";
import SearchForm from "./components/SearchForm";
import AddForm from "./components/AddForm";
import { useState } from "react";
import axios from "axios";

//стили для модального окна
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
    setFormVisible(false);
  };

  const addRequestHandler = (input) => {
    const { request, description } = input;
    axios
      .post(
        `http://87.249.222.54:19191/api/request_to_add?request=${request}&description=${description}`
      )
      .then((res) => {
        console.log(res);
        openModalHandler();
      })
      .catch((err) => console.log(err, "error"));
  };

  return (
    <>
      <Container maxWidth="sm">
        <SearchForm />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography style={{ fontWeight: "bold" }}>ККТ не была найдена?</Typography>
          <Button
            onClick={() => setFormVisible(true)}
            style={{ color: "#42a5f5", textTransform: "none" }}
          >
            + Добавить ККТ
          </Button>
        </div>
        {formVisible && <AddForm addRequestHandler={addRequestHandler} />}
      </Container>
      <Modal
        open={openModal}
        onClose={closeModalHandler}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width:200 }}>
          <h2 id="child-modal-title">Спасибо</h2>
          <p id="child-modal-description">
            Ваше сообщение с запросом на добавление ККТ успешно отправлено.
          </p>
          <Button onClick={closeModalHandler}>Закрыть</Button>
        </Box>
      </Modal>
    </>
  );
}

export default App;
