/*
  Ideally this would have been a form, which is a bit too time-consuming
  to implement within the challenge time. Therefore I have opted to simulate it
  by generating an appointment with random data.
*/

import { Appointment } from './AppointmentItem';
import { v4 } from 'uuid'

const createAppointment: () => Appointment = () => {
  var round = 1000 * 60 * 5
  const randomStart = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())
  const roundedStart = new Date(Math.round(randomStart / round) * round)
  const randomEnd = roundedStart.getTime() + (1000 * 60 * 60 * 2 * Math.random())
  const roundedEnd = new Date(Math.round(randomEnd / round) * round)

  return {
    id: v4(),
    startDate: roundedStart.toISOString(),
    endDate: roundedEnd.toISOString(),
    clinicianName: clinicians[Math.floor(Math.random() * clinicians.length)],
    patient: patients[Math.floor(Math.random() * patients.length)],
    status: "ACTIVE"
  }
}

const minDate = new Date()
const maxDate = new Date(2022, 0, 1)
const clinicians = ["Eliza Hamilton", "Peggy Schuyler", "John Adams"]
const patients = [
  {
    id: "246ea59b-a083-49c9-a994-053726c3daa9",
    name: "Aaron Burr"
  },
  {
    "id": "1c3bac67-743a-4b5c-9e3a-d1431f2cf593",
    "name": "Samuel Seabury"
  },
  {
    "id": "ea0f70fa-7f58-43dc-b887-b4a19ece8999",
    "name": "Lin-Manuel Miranda"
  },
  {
    "id": "54afb34c-c7df-4f1a-b628-6498dbc1fb01",
    "name": "Hercules Mulligan"
  },
  {
    "id": "c8da4d42-6e5a-4e3a-aa83-526eece2778f",
    "name": "George Washington"
  },
  {
    "id": "0896a9f7-17f7-410d-b737-d1f85299b217",
    "name": "Charles Lee"
  },
  {
    "id": "d81ed962-2158-4d3d-a9b4-a122024472a4",
    "name": "Angelica Schuyler"
  },
  {
    "id": "fecc6020-02d3-43d7-8a78-c784789a7b59",
    "name": "John Laurence"
  },
]

export default createAppointment