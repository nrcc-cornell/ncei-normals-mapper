import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const AlertDialog = (props) => {
	const { alertStatus, handleAlertClose, alertText } = props;
 
	return (
		<div>
			<Dialog
				open={alertStatus}
				onClose={handleAlertClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-update-element"
			>
				<DialogContent>
					<DialogContentText id="alert-update-element">
						{alertText}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAlertClose} autoFocus>
						Acknowledged
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default AlertDialog;