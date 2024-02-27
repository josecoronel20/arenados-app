import React, { useState } from "react";
import { Link } from "react-router-dom";
import svgCalendar from "../../svg/svgCalendar";
import svgBudget from "../../svg/svgBudget"
import svgMenu from "../../svg/svgMenu"
import svgProfitability from "../../svg/svgProfitability"
import svgReminder from "../../svg/svgReminder"

const Nav = () => {
    const [isMenuOn, setIsMenuOn] = useState(false)

    const handleIsMenuOn = () => {
        setIsMenuOn(!isMenuOn)
    }

  return (
    <header>
      <div>
        <div onClick={handleIsMenuOn} className="absolute top-3 left-3 z-30 cursor-pointer hover:scale-105 duration-200 shadow-2xl">{svgMenu}</div>

        <nav className={`list-none p-2 text-white flex flex-col gap-10 justify-center items-center text-start absolute top-0 left-0 w-full h-screen bg-grey z-20 ease-out duration-500 ${isMenuOn === true ? "-translate-y-full" : ""}`}>
          <li onClick={handleIsMenuOn} className="flex gap-2 cursor-pointer hover:scale-105 duration-200">
            {svgCalendar}
            <Link to="/">Calendario</Link>
          </li>
          <li onClick={handleIsMenuOn} className="flex gap-2 cursor-pointer hover:scale-105 duration-200">
            {svgBudget}
            <Link to="/budget">Presupuesto</Link>
          </li>
          <li onClick={handleIsMenuOn} className="flex gap-2 cursor-pointer hover:scale-105 duration-200">
            {svgReminder}
            <Link to="/reminders">Recordarios</Link>
          </li>
          <li onClick={handleIsMenuOn} className="flex gap-2 cursor-pointer hover:scale-105 duration-200">
            {svgProfitability}
            <Link to="/profitability">Rentabilidad</Link>
          </li>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
