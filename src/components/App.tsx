import * as React from 'react'
import initialData from '../../data.json'
import { Appointment, AppointmentItem } from './AppointmentItem'
import createAppointment from './createAppointment'

const groupByKeyFunc: {[key: string]: (a: Appointment) => string} = {
  date: (appointment: Appointment) => {
    return new Date(appointment.startDate).toLocaleDateString("en-AU", {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    })
  },
  clinician: (appointment: Appointment) => appointment.clinicianName
}

const App = () => {
  const [ appointments, setAppointments ] = React.useState<Appointment[]>(initialData)
  const [ groupBy, setGroupBy ] = React.useState("date")

  const addAppointment = () => {
    setAppointments([...appointments, createAppointment()])
  }

  const onCancel = (id: string) => {
    setAppointments(appointments.map(appointment =>
      appointment.id !== id ?
      appointment :
      {
        ...appointment,
        status: 'CANCELLED'
      }))
  }

  const filteredAppointments = appointments.filter(appointment => appointment.status !== 'CANCELLED')
  const sortedAppointments = filteredAppointments.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )

  const groupedAppointments = sortedAppointments.reduce<{[key: string]: Appointment[]}>((result, current) => {
    const key = groupByKeyFunc[groupBy](current)
    if (!result[key]) result[key] = []
    result[key].push(current)
    return result
  }, {})

  // Assume clinicians sorted alphabetically
  const sortedKeys = groupBy === 'clinician' ? Object.keys(groupedAppointments).sort() : Object.keys(groupedAppointments)
  
  return (
    <>
      <header className="container py-3">
        <h1>Appointments</h1>
      </header>
      <div className="container mb-5">
        <div className="clearfix">
          <button className="btn btn-primary" onClick={addAppointment}>New Appointment</button>
          <div className="float-end">
            <label htmlFor="groupBy" className="form-label">Group By</label>
            <select value={groupBy} onChange={event => setGroupBy(event.target.value)} id="groupBy" className="form-select group-by">
              <option value="date">Date</option>
              <option value="clinician">Clinician</option>
            </select>
          </div>
        </div>
        <div>
          {sortedKeys.map(key => (
            <div key={key} className="card my-2">
              <h5 className="card-header">{key}</h5>
              <ul className="list-group list-group-flush">
                {groupedAppointments[key].map(appointment => (
                  <AppointmentItem key={appointment.id} appointment={appointment} onCancel={onCancel} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App