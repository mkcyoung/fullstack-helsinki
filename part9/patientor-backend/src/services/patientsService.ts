import patientData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient,
          // HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry,
          NewEntry } from '../types';
import {v1 as uuid} from 'uuid';



const getPatients = () : Patient[] => {
  return patientData;
};

const getSafePatients = () : NonSensitivePatient[] => {
    return patientData.map( ({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patientData.find(d => d.id === id);
  return patient;
};

const addPatient = ( patient : NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

const addEntry = ( patient: Patient, entry: NewEntry ): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  patientData.map( p => p.id === patient.id ? patient : p);
  return patient;
};

export default {
  getPatients,
  addPatient,
  getSafePatients,
  findById,
  addEntry
};