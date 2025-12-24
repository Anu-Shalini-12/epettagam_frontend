import React from "react";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "95%",
    maxHeight: "95%",
    outline: "none",
    borderRadius: "10px",
    padding: "20px",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const extraStyle = props.extraStyle ? props.extraStyle : {};

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleCloseModal}
      >
        <div style={{ ...modalStyle, ...extraStyle }} className={classes.paper}>
          {props.children}
          <SimpleModal />
        </div>
      </Modal>
    </div>
  );
}
