interface RendezVous {
  date: Date;
  duration: number;
}

export function getDisponibilites(date: Date, rdv: RendezVous[]): {durations: {[hour: string]: number[]}, hours: string[]} {
  // Create an array with all available hours from 9am to 6pm for the given date
  const availableHours = Array.from({length: 36}, (_, i) => {
    const hour = Math.floor(i/4) + 9;
    const minute = (i%4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }).filter(h => {
    const hour = Number(h.slice(0, 2));
    const minute = Number(h.slice(3));
    const endHour = hour + Math.floor((minute + 15) / 60);
    return endHour <= 18;
  });

  // Filter out the already reserved hours for the given date
  const filteredRdv = rdv.filter(r => r.date.toDateString() === date.toDateString());
  filteredRdv.forEach(r => {
    const startHour = r.date.getHours();
    const startMinute = r.date.getMinutes();
    const startIndex = (startHour - 9) * 4 + startMinute / 15;
    const endIndex = startIndex + r.duration / 15;
    availableHours.splice(startIndex, endIndex - startIndex, '');
  });

  // Create an object that stores the available durations for each available hour
  const availableDurations: {[hour: string]: number[]} = {};
  availableHours.forEach(h => {
    availableDurations[h] = [15, 30, 60, 120].filter(d => {
      const startHour = Number(h.slice(0, 2));
      const startMinute = Number(h.slice(3));
      const startIndex = (startHour - 9) * 4 + startMinute / 15;
      const endIndex = startIndex + d / 15;
      const endIndexMax = availableHours.length;
      const isHourAvailable = filteredRdv.every(r => {
        const hour = r.date.getHours();
        const minute = r.date.getMinutes();
        const startRdvIndex = (hour - 9) * 4 + minute / 15;
        const endRdvIndex = startRdvIndex + r.duration / 15;
        return endRdvIndex <= startIndex || startRdvIndex >= endIndex;
      });
      return endIndex <= endIndexMax && isHourAvailable;
    });
  });

  // Return the available options
  return {
    durations: availableDurations,
    hours: availableHours.filter(h => h !== ''),
  };
}
