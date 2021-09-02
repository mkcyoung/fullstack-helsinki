import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

// const diagnoses: Array<Diagnosis> = diagnosesData as Array<Diagnosis>; // using type assertion
// don't need this if we change how we export data.

const getDiagnoses = () : Array<Diagnosis> => {
  return diagnosesData;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnosis
};