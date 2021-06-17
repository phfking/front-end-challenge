import * as React from 'react'

export type Appointment = {
  id: string;
  startDate: string;
  endDate: string;
  clinicianName: string;
  patient: {
    id: string;
    name: string;
  };
  status: string;
}

type AppointmentItemProps = {
  appointment: Appointment;
  onCancel: (id: string) => void;
}

export const AppointmentItem: React.FC<AppointmentItemProps> = ({ appointment, onCancel}) => {
  const startDate = new Date(appointment.startDate)
  const endDate = new Date(appointment.endDate)
  const duration = (endDate.getTime() - startDate.getTime()) / 1000 / 60
  const formattedStartDate = startDate.toLocaleDateString("en-AU", {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
  const highlight = duration > 60 ? ' highlight' : ''

  return (
    <li className={"list-group-item" + highlight}>
      <div className="row">
        <div className="col-md-2">{appointment.patient.name}</div>
        <div className="col-md-4">Start Date: {formattedStartDate}</div>
        <div className="col-md-2">Duration: {duration} min</div>
        <div className="col-md-3">Clinician: {appointment.clinicianName}</div>
        <div className="col-md-1">
          <button className="btn btn-sm btn-outline-danger" onClick={() => onCancel(appointment.id)}>Cancel</button>
        </div>
      </div>
    </li>
  )
}
