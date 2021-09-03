export const dateConverter = (date: string): string => {
    const newDate = date.split("T")[0];
    let newTime = date.split("T")[1].split("Z")[0];

    return `${newDate} at ${newTime}`;
  };