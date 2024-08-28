export const changeTimeZone = (newDate: string, type: string) => {
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
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate: string = date.toLocaleString("en-GB", options);
  const formattedDateWithGMT: string = `${formattedDate} GMT${delta}`;

  return formattedDateWithGMT;
};
