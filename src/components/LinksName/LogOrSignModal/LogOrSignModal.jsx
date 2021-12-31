import { Backdrop, Fade, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form/Form";
import style from "./style";
import { closeModal } from "../../../features/modal";

const LogOrSignModal = () => {
  // getter form state for open and close modal
  const modal = useSelector((state) => state.modal.value);
  // redux,set state
  const dispatch = useDispatch();
  return (
    <Modal
      open={modal}
      onClose={() => dispatch(closeModal())}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 800,
      }}
    >
      <Fade in={modal}>
        <Box sx={style}>
          <Form />
        </Box>
      </Fade>
    </Modal>
  );
};

export default LogOrSignModal;
