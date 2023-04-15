import Navbar from "./components/Navbar";
import styles from "./App.module.scss";
import AppointementsGrid from "./components/AppointementsGrid";
import { useState } from "react";
import { CurrentDateContext } from "./contexts/CurrentDateContext";

function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  return (
    <CurrentDateContext.Provider
      value={{ currentDate: currentDate, setCurrentDate: setCurrentDate }}
    >
      <div className={styles.container}>
        <Navbar />
        <AppointementsGrid />
      </div>
    </CurrentDateContext.Provider>
  );
}

export default App;
