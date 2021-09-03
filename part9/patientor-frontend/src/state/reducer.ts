import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_PATIENT";
    payload: Patient | null;
  }
  | {
    type: "GET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Patient;
  };


// action creator for setting list of patients
export const setPatientList = (patients : Patient[]) : Action => {
  return ({
        type: 'SET_PATIENT_LIST',
        payload: patients,
  });
};

export const setPatient = (patient : Patient | null ) : Action => {
  return ({
    type:'SET_PATIENT',
    payload: patient,
  });
};

export const addPatient = (patient : Patient) : Action => {
  return ({
    type: "ADD_PATIENT",
    payload: patient,
  });
};

export const getDiagnoses = (diagnoses: Diagnosis[]) : Action => {
  return ({
        type: 'GET_DIAGNOSES',
        payload: diagnoses,
  });
};

export const addEntry = (patient : Patient) : Action => {
  return ({
    type: "ADD_ENTRY",
    payload: patient,
  });
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
        
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "ADD_ENTRY":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
      case "GET_DIAGNOSES":
        return {
          ...state,
          diagnoses : action.payload
        };
    default:
      return state;
  }
};
