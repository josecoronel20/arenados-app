import React, { useState } from "react";
import svgAwrrowLeft from "../../svg/svgArrowLeft";
import svgAwrrowRight from "../../svg/svgArrowRight";
import Calendar from "./Calendar";

const Month = () => {
  const [actualMonth, setActualMonth] = useState(new Date().getMonth());
  const monthName = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleNextMonth = () => {
    if (actualMonth < 11) {
      setActualMonth(actualMonth + 1);
    } else {
      setActualMonth(0);
    }
  };

  const handlePrevMonth = () => {
    if (actualMonth > 0) {
      setActualMonth(actualMonth - 1);
    } else {
      setActualMonth(11);
    }
  };

  return (
    <section className="py-14 px-3 min-h-screen">
      <div className="flex flex-row gap-5 items-center justify-between">
        <div
          className="hover:scale-110 duration-200 cursor-pointer"
          onClick={handlePrevMonth}
        >
          {svgAwrrowLeft}
        </div>
        <p className="text-white text-lg">{monthName[actualMonth]}</p>
        <div
          className="hover:scale-110 duration-200 cursor-pointer"
          onClick={handleNextMonth}
        >
          {svgAwrrowRight}
        </div>
      </div>
      <div className="flex flex-col gap-3">
          <ul className="w-full flex justify-around text-grey font-semibold">
            <li>D</li>
            <li>L</li>
            <li>M</li>
            <li>M</li>
            <li>J</li>
            <li>V</li>
            <li>S</li>
          </ul>
          
        <Calendar
          actualMonth={actualMonth}
          monthName={monthName[actualMonth]}
        />
      </div>
    </section>
  );
};

export default Month;
