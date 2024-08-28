import { Schedule } from "@/providers/AppContext";

export const formatDateAndTime = (availableFrom: string, availableTo: string) => {
    const fromDate = new Date(availableFrom);
    const toDate = new Date(availableTo);
    
    const datePart = fromDate.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Jakarta"
    });
    
    const timePart = `${fromDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta"
    })} - ${toDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta"
    })}`;
    
    return `${datePart} ${timePart}`;
  };
  
  export const groupSchedulesByDate = (schedules: Schedule[]) => {
    const grouped: { [date: string]: Schedule[] } = {};
    schedules.forEach((schedule) => {
      const dateKey = new Date(schedule.available_from).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Jakarta"
      });
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(schedule);
    });
    return grouped;
  };
  