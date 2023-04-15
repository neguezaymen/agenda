import React, { useContext } from "react";
import styles from "./AppointementsWrapper.module.scss";
import { TimeSlots } from "../utils/TimeSlots";
import { CurrentDateContext } from "../contexts/CurrentDateContext";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AppointementState } from "../slices/appointementSlice";
import { GetHoursAndMinutesFromTime } from "../utils/DateFormat";
import { isSameDay } from "date-fns";
import { setModalId, showDeleteModal, showModal } from "../slices/UiSlice";
import CurrentTimeBar from "./CurrentTimeBar";

export const OneMinuteToPixels = 4;
export const AppointementsWrapper = () => {
  return (
    <div style={{ height: "2160px", position: "relative" }}>
      {TimeSlots.map((slot, index) => (
        <Line slot={slot} key={slot} index={index} />
      ))}
      <Appointements />
      <CurrentTimeBar />
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
  const height = props.duration * OneMinuteToPixels;
  const { hours, minutes } = GetHoursAndMinutesFromTime(props.time);
  const top = ((hours - 9) * 60 + minutes) * OneMinuteToPixels;
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
      <div>
        <p>
          <span>Vendor:</span>
          {props.vendor}
        </p>
        <p>
          <span>Buyer:</span>
          {`${props.buyer}, ${props.company}`}
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={styles.deleteIcon}
        onClick={(event) => {
          event.stopPropagation();
          void dispatch(setModalId(props.id));
          void dispatch(showDeleteModal());
        }}
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path
          fill="red"
          d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
        ></path>
      </svg>
    </div>
  );
};
