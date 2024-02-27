import React from "react";
import Day from "./Day";

const Calendar = ({ actualMonth, monthName }) => {
  const numberDays =
    actualMonth === 0 || actualMonth === 2 || actualMonth === 4 || actualMonth === 6 || actualMonth === 7 || actualMonth === 9 || actualMonth === 11
      ? 31
      : actualMonth === 1
      ? 29
      : 30;

  const firstDayOfMonth = new Date(new Date().getFullYear(), actualMonth, 1).getDay(); // Obtener el día de la semana para el primer día del mes
  const daysArray = Array.from({ length: numberDays + firstDayOfMonth }).map((_, index) => {
    if (index < firstDayOfMonth) {
      return <div key={index}></div>; // Renderizar un espacio en blanco para los días antes del inicio del mes
    }
    return <Day key={index} number={index + 1 - firstDayOfMonth} month={monthName} />;
  });

  return (
    <section className="h-full grid grid-cols-7 gap-1">
      {daysArray}
    </section>
  );
};

export default Calendar;
