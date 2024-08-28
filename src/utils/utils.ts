export const changeDateWIBFormated = (newDate: string) => {
  const date: Date = new Date(newDate);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta",
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
  const formattedDateWithGMT: string = `${formattedDate} GMT+7`;

  return formattedDateWithGMT;
};

export const changeDateGMTFormated = (newDate: string) => {
  const dateInGMTPlus7: Date = new Date(newDate);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "GMT",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDateInGMT: string = dateInGMTPlus7.toLocaleString(
    "en-GB",
    options
  );
  const formattedDateWithGMT: string = `${formattedDateInGMT} GMT`;

  return formattedDateWithGMT;
};
