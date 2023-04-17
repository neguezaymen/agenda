import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./MainSection.module.scss";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  GetAppointementDate,
  GetHoursAndMinutesFromTime,
} from "../utils/DateFormat";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addAppointement, editAppointement } from "../slices/appointementSlice";
import { CurrentDateContext } from "../contexts/CurrentDateContext";
import { hideModal, setModalId } from "../slices/UiSlice";
import { getDisponibilites } from "../utils/getDisponibilites";

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}
type Inputs = {
  vendor: string;
  buyer: string;
  company: string;
  duration: string;
  time: string;
};
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
  const appointementsWithAppointementToEdit = appointements.filter(
    (appointement) => appointement.id !== modalId
  );
  const appointementToEdit = appointements.find((el) => el.id === modalId);
  const { currentDate } = React.useContext(CurrentDateContext);

  const {
    handleSubmit,
    control,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const appointement = GetAppointementDate(
    new Date(currentDate),
    GetHoursAndMinutesFromTime(watch("time")),
    Number(watch("duration"))
  );
  const handleClose = () => {
    void dispatch(hideModal());
    void dispatch(setModalId(null));
    clearErrors();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const handleEdit = () => {
      modalId &&
        void dispatch(
          editAppointement({
            duration: Number(data.duration),
            date: appointement.startDate,
            id: modalId,
            buyer: data.buyer,
            company: data.company,
            vendor: data.vendor,
            time: data.time,
          })
        );

      void dispatch(setModalId(null));
    };
    const handleAdd = () => {
      void dispatch(
        addAppointement({
          duration: Number(data.duration),
          date: appointement.startDate,
          id: Date.now(),
          buyer: data.buyer,
          company: data.company,
          vendor: data.vendor,
          time: data.time,
        })
      );
    };
    modalId ? handleEdit() : handleAdd();
    reset();
    handleClose();
  };
  React.useEffect(() => {
    reset({
      buyer: appointementToEdit?.buyer ?? "",
      company: appointementToEdit?.company ?? "",
      vendor: appointementToEdit?.vendor ?? "",
      duration: appointementToEdit?.duration.toString() ?? "15",
      time: appointementToEdit?.time ?? "09:00",
    });
  }, [
    appointementToEdit?.buyer,
    appointementToEdit?.company,
    appointementToEdit?.duration,
    appointementToEdit?.time,
    appointementToEdit?.vendor,
    reset,
  ]);
  return (
    <div className={styles.addModalContainer}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isModalVisible}
        fullWidth
        maxWidth="sm"
      >
        <BootstrapDialogTitle onClose={handleClose}>
          {modalId ? "Edit the appointment" : "Create an appointment"}
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <>
              <Controller
                name="vendor"
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    {...rest}
                    margin="dense"
                    defaultValue={appointementToEdit?.vendor ?? ""}
                    id="vendor"
                    label="Vendor"
                    type="text"
                    name="vendor"
                    error={errors.vendor ? true : false}
                    fullWidth
                    variant="outlined"
                    color="primary"
                  />
                )}
              />
              {errors.vendor && (
                <p style={{ color: "red" }}>Vendor is required</p>
              )}
            </>
            <>
              <Controller
                name="buyer"
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    {...rest}
                    margin="dense"
                    id="buyer"
                    defaultValue={appointementToEdit?.buyer ?? ""}
                    label="Buyer"
                    error={errors.buyer ? true : false}
                    type="text"
                    fullWidth
                    variant="outlined"
                    color="primary"
                  />
                )}
              />
              {errors.buyer && (
                <p style={{ color: "red" }}>Buyer is required</p>
              )}
            </>
            <>
              <Controller
                name="company"
                control={control}
                rules={{ required: true }}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    {...rest}
                    margin="dense"
                    id="company"
                    defaultValue={appointementToEdit?.company ?? ""}
                    label="Company"
                    error={errors.company ? true : false}
                    type="text"
                    fullWidth
                    variant="outlined"
                    color="primary"
                  />
                )}
              />
              {errors.company && (
                <p style={{ color: "red" }}>Company is required</p>
              )}
            </>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Controller
                name="duration"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <FormControl
                    style={{
                      marginTop: "20px",
                      width: "50%",
                      marginRight: "10px",
                    }}
                    required
                  >
                    <InputLabel>Duration</InputLabel>
                    <Select
                      {...rest}
                      label="Duration"
                      defaultValue={
                        appointementToEdit?.duration?.toString() ?? "15"
                      }
                      required
                      variant="outlined"
                      color="primary"
                    >
                      {getDisponibilites(
                        currentDate,
                        modalId
                          ? appointementsWithAppointementToEdit
                          : appointements
                      )?.durations[watch("time")]?.map((el) => (
                        <MenuItem value={el} key={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="time"
                control={control}
                defaultValue={appointementToEdit?.time ?? "09:00"}
                render={({ field: { ref, ...rest } }) => (
                  <FormControl
                    style={{
                      marginTop: "20px",
                      width: "50%",
                      marginLeft: "10px",
                    }}
                  >
                    <InputLabel>Time</InputLabel>
                    <Select {...rest} label="Time" required>
                      {getDisponibilites(
                        currentDate,
                        modalId
                          ? appointementsWithAppointementToEdit
                          : appointements
                      ).hours.map((el) => (
                        <MenuItem value={el} key={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit" variant="outlined" color="success">
              {modalId ? "Save Changes" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
