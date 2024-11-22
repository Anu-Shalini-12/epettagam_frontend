import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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
    width: "65%",
    maxHeight: "95%",
    outline: "none",
    // overflowY: "scroll",
    // overflowX: "scroll",
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
