import React from "react";
import styles from "./MainSection.module.scss";
import AddAppointementModal from "./AddEditAppointementModal";
import { Button } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { showModal } from "../slices/UiSlice";
import DeleteAppointementModal from "./DeleteAppointementModal";
import { AppointementsWrapper } from "./AppointementsWrapper";

const MainSection = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.gridContainer}>
      <AddAppointementModal />
      <DeleteAppointementModal />
      <AppointementsWrapper />
      <Button
        className={styles.addIcon}
        onClick={() => dispatch(showModal())}
        style={{ background: "#1876D1", borderRadius: "50%", height: "60px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path fill="white" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
      </Button>
    </div>
  );
};

export default MainSection;
