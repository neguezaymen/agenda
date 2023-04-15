import { createContext } from "react";

interface CurrentDate {
currentDate:Date,
setCurrentDate:React.Dispatch<React.SetStateAction<Date>>
}
export const CurrentDateContext=createContext<CurrentDate>({} as CurrentDate);