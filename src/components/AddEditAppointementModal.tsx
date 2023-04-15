import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import styles from "./MainSection.module.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { TimeSlots } from "../utils/TimeSlots";
import {
  GetAppointementDate,
  GetHoursAndMinutesFromTime,
} from "../utils/DateFormat";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addAppointement, editAppointement } from "../slices/appointementSlice";
import { CurrentDateContext } from "../contexts/CurrentDateContext";
import { hideModal, setModalId } from "../slices/UiSlice";

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

export default function AddEditAppointementModal() {
  const { isModalVisible, modalId } = useAppSelector((state) => state.uiSlice);
  const appointements = useAppSelector((state) => state.appointements);
  const appointementToEdit = appointements.find((el) => el.id === modalId);
  const [vendor, setVendor] = React.useState<string>();
  const [buyer, setBuyer] = React.useState<string>();
  const [company, setCompany] = React.useState<string>();
  const [duration, setDuration] = React.useState<string>("15");
  const [time, setTime] = React.useState<string>("09:00");
  const { currentDate } = React.useContext(CurrentDateContext);
  const dispatch = useAppDispatch();
  const appointement = GetAppointementDate(
    new Date(currentDate),
    GetHoursAndMinutesFromTime(time),
    Number(duration)
  );

  const handleClose = () => {
    void dispatch(hideModal());
    void dispatch(setModalId(null));
  };

  const handleEdit = () => {
    modalId &&
      void dispatch(
        editAppointement({
          duration: Number(duration),
          date: appointement.startDate,
          id: modalId,
          buyer: buyer,
          company: company,
          vendor: vendor,
          time: time,
        })
      );

    void dispatch(setModalId(null));
  };
  const handleSubmit = () => {
    modalId
      ? handleEdit()
      : void dispatch(
          addAppointement({
            duration: Number(duration),
            date: appointement.startDate,
            id: Date.now(),
            buyer: buyer,
            company: company,
            vendor: vendor,
            time: time,
          })
        );
    handleClose();
  };

  return (
    <div className={styles.addModalContainer}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isModalVisible}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          {modalId ? "Edit the appointment" : "Create an appointment"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <TextField
              margin="dense"
              id="vendor"
              label="Vendor"
              type="text"
              fullWidth
              defaultValue={appointementToEdit?.vendor ?? ""}
              variant="standard"
              onChange={(event) => {
                setVendor(event.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="buyer"
              label="Buyer"
              type="text"
              fullWidth
              required
              defaultValue={appointementToEdit?.buyer ?? ""}
              variant="standard"
              onChange={(event) => {
                setBuyer(event.target.value);
              }}
            />
            <TextField
              margin="dense"
              id="company"
              required
              label="Company"
              type="text"
              fullWidth
              defaultValue={appointementToEdit?.company ?? ""}
              variant="standard"
              onChange={(event) => {
                setCompany(event.target.value);
              }}
            />
          </Typography>
          <Typography
            gutterBottom
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <FormControl style={{ marginTop: "20px", width: "20%" }}>
              <InputLabel>Duration</InputLabel>
              <Select
                label="Duration"
                onChange={(event) => setDuration(event.target.value)}
                defaultValue={appointementToEdit?.duration?.toString() ?? "15"}
                required
              >
                <MenuItem value={15}>15min</MenuItem>
                <MenuItem value={30}>30min</MenuItem>
                <MenuItem value={60}>60min</MenuItem>
                <MenuItem value={120}>120min</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ marginTop: "20px", width: "50%" }}>
              <InputLabel>Time</InputLabel>
              <Select
                label="Time"
                required
                onChange={(event) => setTime(event.target.value)}
                defaultValue={appointementToEdit?.time ?? "09:00"}
              >
                {TimeSlots.map((timeslot) => (
                  <MenuItem value={timeslot} key={timeslot}>
                    {timeslot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} type="submit">
            {modalId ? "Save Changes" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
