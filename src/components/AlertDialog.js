import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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