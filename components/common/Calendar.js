import React, { useState } from 'react'

// Moment.js peer dep of react-dates
import moment from 'moment'
moment.locale('en')
// react-dates by airbnb
import 'react-dates/initialize'
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';



export default function Calender({checkInDay, setCheckInDay, checkOutDay, setCheckOutDay, minimumNights, setDaysToReserve, calendarSize}) {
  
    // const [stateStartDate, setStateStartDate] = useState(checkIn)
    // const [stateEndDate, setStateEndDate] = useState(checkOut)
    const [stateFocusedInput, setStateFocusedInput] = useState("startDate");

  return (
    <>
        <DayPickerRangeController         
            startDate={moment(checkInDay)}
            endDate={moment(checkOutDay)}
            minimumNights={minimumNights}
            onDatesChange={({ startDate, endDate }) => {
                setCheckInDay(moment(startDate).toDate())
                setCheckOutDay(moment(endDate).toDate())
                // end date may be null if only a single day is selected on calender, 
                //in which case since we're being inclusive on number of nights stayed, we set days to reserve to 1
                endDate ? setDaysToReserve((endDate.diff(startDate, 'days') + 1)) : setDaysToReserve(1)
            }}
            focusedInput={stateFocusedInput || 'startDate'} // startDate
            onFocusChange={focusedInput => setStateFocusedInput(focusedInput )} // PropTypes.func.isRequired,
            initialVisibleMonth={() => moment()} // PropTypes.func or null,
            isOutsideRange={(day) => day.isBefore(moment().subtract(1,'days')) }
            numberOfMonths={calendarSize}
        />
    </>
  )
}
