import React from 'react';
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";


function getModalStyle() {
	const top = 40;
	const left = 46;
	const height = 30;
	const width = 50;

	return {
		top: `${top}%`,
		width: `${width}%`,
		left: `${left}%`,
		height: `${height}%`,
		transform: `translate(-${top}%, -${left}%`,
	};
}

const useStyles = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		borderRadius: '10px',
		outline: 'none',
		backgroundColor: 'white',
	},
}));

export default function SimpleModal(props) {
	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);

	const extraStyle = (props.extraStyle ? props.extraStyle : {});

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
