import { addDays, subDays, format } from "date-fns";

export const changeTimeZone = (newDate: string, type: string) => {
  let gmt0Time = new Date(newDate);

  let delta: number = 0;

  if (type === "GMT") {
    delta = -7;
  } else if (type === "WIB") {
    delta = 7;
  } else {
    return "Out of range";
  }

  gmt0Time.setHours(gmt0Time.getHours() + delta);
  let gmt7Time = gmt0Time.toISOString().replace("T", " ").substring(0, 19);

  return gmt7Time;
};

export const dateManipulation = (
  date: string,
  operation: string = "none"
): string => {
  const initialDate = new Date(date);
  let newDate;

  if (operation === "+") {
    newDate = addDays(initialDate, 1);
  } else if (operation === "-") {
    newDate = subDays(initialDate, 1);
  } else {
    return format(initialDate, "yyyy-MM-dd HH:mm:ss");
  }

  return format(newDate, "yyyy-MM-dd HH:mm:ss");
};

export const formatDateRender = (
  newDate: string,
  type: string,
  format = "full"
) => {
  const date: Date = new Date(newDate);

  let timeZone: string = "";
  let delta: string = "";

  if (type === "GMT") {
    timeZone = "GMT";
    delta = "";
  } else if (type === "WIB") {
    timeZone = "Asia/Jakarta";
    delta = "+7";
  } else {
    return "Out of range";
  }

  const options: Intl.DateTimeFormatOptions = {
    timeZone: timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: format === "full" ? "2-digit" : undefined,
    minute: format === "full" ? "2-digit" : undefined,
    second: format === "full" ? "2-digit" : undefined,
    hour12: false,
  };

  const formattedDate: string = date.toLocaleString("en-GB", options);
  let formattedDateWithGMT: string = "";

  if (format === "full") {
    formattedDateWithGMT = `${formattedDate} GMT${delta}`;
  } else if (format === "short") {
    formattedDateWithGMT = `${formattedDate}`;
  }

  return formattedDateWithGMT;
};

export const dataCompile = (groupedData: any) => {
  const dateCollection = [];

  for (let key in groupedData) {
    const format = {
      [key]: groupedData[key],
    };
    dateCollection.push(format);
  }

  return dateCollection;
};

export const formatDate = (dateTime: string) => dateTime.split(" ")[0];
