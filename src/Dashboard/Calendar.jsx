import React, { useState, useEffect } from "react";
import "./dashboard.css";

const weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const current = new Date();
  const todaysDate = current.getDate();
  const currentYear = current.getFullYear();
  const currentMonth = current.getMonth();

  const [selectedDate, setSelectedDate] = useState(current);
  const [days, setDays] = useState([]);

  useEffect(() => {
    generateCalendarDays(selectedDate);
  }, [selectedDate]);

  const generateCalendarDays = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const totalDaysInMonth = getTotalDaysInAMonth(year, month);
    const firstDayOfWeek = getFirstDayOfWeek(year, month);

    let daysArray = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      daysArray.push(day);
    }

    setDays(daysArray);
  };

  const getTotalDaysInAMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleMonthChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(e.target.value);
    setSelectedDate(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(e.target.value);
    setSelectedDate(newDate);
  };

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const handlePrevMonthClick = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonthClick = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-month-arrow-container">
        <div className="calendar-actual-date">
          <button className="calendar-today-button" onClick={handleTodayClick}>
            Today {todaysDate}
          </button>
          <div className="calendar-arrow-container">
            <button
              className="calendar-left-arrow"
              onClick={handlePrevMonthClick}
            >
              ←
            </button>
            <div
              className="calendar-month-year"
              data-month={selectedDate.getMonth()}
              data-year={selectedDate.getFullYear()}
            >
              {monthArray[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </div>
            <button
              className="calendar-right-arrow"
              onClick={handleNextMonthClick}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <ul className="calendar-week">
        {weekArray.map((week) => (
          <li key={week} className="calendar-week-day">
            {week}
          </li>
        ))}
      </ul>
      <ul className="calendar-days">
        {days.map((day, index) => (
          <li
            key={index}
            className={`calendar-day ${
              day === todaysDate &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear
                ? "calendar-day-active"
                : ""
            }`}
          >
            {day}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
