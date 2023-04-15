import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hideDeleteModal, setModalId } from "../slices/UiSlice";
import { deleteAppointement } from "../slices/appointementSlice";

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
const DeleteAppointementModal = () => {
  const { isDeleteModalVisible, modalId } = useAppSelector(
    (state) => state.uiSlice
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    void dispatch(hideDeleteModal());
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isDeleteModalVisible}
      fullWidth
    >
      <BootstrapDialogTitle onClose={handleClose}>
        Delete the appointment
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom></Typography>
        <Typography
          gutterBottom
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Are you sure you want to delete this appointment
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            modalId && void dispatch(deleteAppointement(modalId));
            void dispatch(setModalId(null));
            handleClose();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAppointementModal;
