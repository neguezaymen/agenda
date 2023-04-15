import React, { useContext } from "react";
import styles from "./AppointementsWrapper.module.scss";
import { TimeSlots } from "../utils/TimeSlots";
import { CurrentDateContext } from "../contexts/CurrentDateContext";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AppointementState } from "../slices/appointementSlice";
import { GetHoursAndMinutesFromTime } from "../utils/DateFormat";
import { isSameDay } from "date-fns";
import { setModalId, showModal } from "../slices/UiSlice";

export const AppointementsWrapper = () => {
  return (
    <div style={{ height: "2160px", position: "relative" }}>
      {TimeSlots.map((slot, index) => (
        <Line slot={slot} key={slot} index={index} />
      ))}
      <Appointements />
    </div>
  );
};
const Line = ({ slot, index }: { slot: string; index: number }) => {
  const topPosition = index * 60;
  return (
    <div
      className={styles.line}
      style={{
        top: topPosition + "px",
      }}
    >
      <p style={{ width: "45px" }}>{slot}</p>
      <div style={{ borderTop: "2px solid #5291e6", flex: "1" }}></div>
    </div>
  );
};

const Appointements = () => {
  const { currentDate } = useContext(CurrentDateContext);
  const reservations = useAppSelector((state) => state.appointements);

  const todayReservations = reservations.filter((reservation) => {
    return isSameDay(new Date(currentDate), new Date(reservation.date));
  });
  return (
    <div>
      {todayReservations.map((reservation) => (
        <Appointement key={reservation.id} {...reservation} />
      ))}
    </div>
  );
};

const Appointement = (props: AppointementState) => {
  const height = props.duration * 4;
  const { hours, minutes } = GetHoursAndMinutesFromTime(props.time);
  const top = ((hours - 9) * 60 + minutes) * 4;
  const dispatch = useAppDispatch();
  return (
    <div
      className={styles.appointement}
      style={{
        height: height + "px",
        top: top,
      }}
      onClick={() => {
        void dispatch(setModalId(props.id));
        void dispatch(showModal());
      }}
    >
      <p>
        <span>Vendor:</span>
        {props.vendor}
      </p>
      <p>
        <span>Buyer:</span>
        {`${props.buyer}, ${props.company}`}
      </p>
    </div>
  );
};
