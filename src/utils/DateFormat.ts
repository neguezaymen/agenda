export interface TimeFormat {
  hours: number;
  minutes: number;
}
export const GetHoursAndMinutesFromTime = (timeSlot: string | undefined) => {
  const hours = timeSlot?.split(":")[0];
  const minutes = timeSlot?.split(":")[1];
  const time = { hours: Number(hours), minutes: Number(minutes) };

  return time;
};


export const GetAppointementDate = (
  date: Date,
  time: TimeFormat,
  duration: number
): { startDate: Date; endDate: Date } => {
  const startDate = new Date(date);
  startDate.setHours(time.hours);
  startDate.setMinutes(time.minutes);
  startDate.setSeconds(0);
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + duration);

  return { startDate: startDate, endDate: endDate };
};
