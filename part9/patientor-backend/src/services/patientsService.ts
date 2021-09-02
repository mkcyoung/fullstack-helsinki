import patientData from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';



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

const addPatient = () => {
  return [];
};

export default {
  getPatients,
  addPatient,
  getSafePatients
};