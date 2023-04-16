import React, { useContext } from "react";
import styles from "./NavBar.module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import { CurrentDateContext } from "../contexts/CurrentDateContext";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const Navbar = () => {
  const { currentDate, setCurrentDate } = useContext(CurrentDateContext);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.currentDay}>
        {dayjs(currentDate).format("dddd D, MMMM YYYY")}
      </div>
      <div className={styles.today}>
        <img src="/logo.webp" alt="logo" className={styles.logo} />
      </div>
      <div className={styles.datePicker}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            value={dayjs(currentDate)}
            onChange={(value) => value && setCurrentDate(value.toDate())}
            sx={{
              input: { display: "none" },
              fieldset: { display: "none" },
              marginTop: "10px",
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Navbar;
