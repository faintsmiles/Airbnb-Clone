import React, { useState, useEffect } from 'react'

// Moment.js peer dep of react-dates
import moment from 'moment'
moment.suppressDeprecationWarnings = true;
moment.locale('en')
// react-dates by airbnb
import 'react-dates/initialize'
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';



export default function Calendar({checkInDay, setCheckInDay, checkOutDay, setCheckOutDay, minimumNights, setDaysToReserve, noBorder}) {
  
    // TailwindCSS default 'large' width breakpoint
    const widthBreakpoint = 1024;
    const [stateFocusedInput, setStateFocusedInput] = useState("startDate");

    const [ screenWidth, setScreenWidth ] = useState(window.innerWidth)
    const [ visibleCalendarMonths, setVisibleCalendarMonths ] = useState()


    function handleScreenWidthChange () {
      // No change occured, exit the function
      if(window.innerWidth === screenWidth) { return }
    
      // default 'large' width breakpoint defined by tailwindcss
      if(window.innerWidth >= widthBreakpoint) {
        setVisibleCalendarMonths(2)
        setScreenWidth(window.innerWidth)
      }
      else {
        setVisibleCalendarMonths(1)
        setScreenWidth(window.innerWidth)
      }
    }


    useEffect(() => {
      
      setVisibleCalendarMonths( window.innerWidth >= widthBreakpoint ? 2 : 1 )
      addEventListener('resize', handleScreenWidthChange)

      return () => {
        removeEventListener('resize', handleScreenWidthChange )
      };
    }, []);


  return (
    <>
        <DayPickerRangeController         
            startDate={moment(checkInDay)}
            endDate={moment(checkOutDay)}
            minimumNights={minimumNights}
            onDatesChange={({ startDate, endDate }) => {
                setCheckInDay(moment(startDate).toDate())
                // endDate may be null or invalid if only 1 day is currently selected, in which case we set it to the start date
                // COULD add required min nights to stay here but it looks 'cleaner' without it auto adjusting calendar
                endDate ? null : endDate = startDate 
                setCheckOutDay(moment(endDate).toDate()) 
                // find the difference between check in and checkout days, then add 1 to be inclusive of the first day
                setDaysToReserve((endDate.diff(startDate, 'days') + 1))
            }}
            focusedInput={stateFocusedInput || 'startDate'} // startDate
            onFocusChange={focusedInput => setStateFocusedInput(focusedInput )} // PropTypes.func.isRequired,
            initialVisibleMonth={() => moment() }// PropTypes.func or null,
            isOutsideRange={(day) => day.isBefore(moment().subtract(1,'days')) }
            numberOfMonths={visibleCalendarMonths}
            noBorder={noBorder}
        />
    </>
  )
}
