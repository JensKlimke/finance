import {Button} from "react-bootstrap";
import {BsCalendar2Heart} from "react-icons/bs";
import moment from "moment";
import Calendar from "react-calendar";
import React, {useMemo} from "react";

export default function CalendarInput({value, update}: { value: string, update: (value: string) => void }) {
  const dateValue = useMemo(() => {
    return new Date(value);
  }, [value]);
  return (
    <>
      <Button className='mb-2' onClick={() => update(moment().format('YYYY-MM-DD'))}>
        <BsCalendar2Heart/>
      </Button>
      <Calendar
        className='m-auto'
        goToRangeStartOnSelect={true}
        onChange={(d: Date) => update(moment(d).format('YYYY-MM-DD'))}
        value={dateValue}
      />
    </>
  )
}