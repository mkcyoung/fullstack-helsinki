import { NewPatient, Gender,
        NewEntry, NewBaseEntry, EntryType, Discharge,   
        HealthCheckRating, SickLeave } from "./types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};


// Patient functions
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('missing text or not a string');
    }

    return text;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation } : Fields) : NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: []
    };
    return newPatient;
};

// Entry Functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const parseEntryType = (entryType : unknown): EntryType => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error('incorrect or missing entry type: ' + entryType);
    }
    return entryType;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
    if(!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
        throw new Error('incorrect or missing diagnosis codes');
    }
    return diagnosisCodes.map( code => parseString(code) );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewBaseEntry = (obj: any) : NewBaseEntry => {
    const newBaseEntry: NewBaseEntry = {
        type: parseEntryType(obj.type),
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist)
    };
    
    if (obj.diagnosisCodes) {
        newBaseEntry.diagnosisCodes = parseDiagnosisCodes(obj.diagnosisCodes);
    }

    return newBaseEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param : any): param is Discharge => {
    if (!param.date || !isDate(param.date)){
        throw new Error('incorrect or missing discharge date');
    }
    if (!param.criteria || isString(param.critieria)){
        throw new Error('incorrect or missing criteria');
    }
    return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge : any) : Discharge => {
    if (!discharge || !isDischarge(discharge)){
        throw new Error('incorrect or missing discharge');
    }
    return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating : unknown) : HealthCheckRating => {
    if (!rating || !isHealthCheckRating(rating)){
        throw new Error("incorrect or missing health check rating");
    }
    return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param : any): param is SickLeave => {
    if (!param.startDate || !isDate(param.startDate) || !param.endDate || !isDate(param.endDate)){
        throw new Error("incorrect params for sick leave");
    }
    return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any) : SickLeave => {
    if (!sickLeave || !isSickLeave(sickLeave)){
        throw new Error('incorrect sick leave');
    }
    return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (obj: any) : NewEntry => {
    // Check that obj has all of the basic fields
    const baseEntry = toNewBaseEntry(obj) as NewEntry;

    switch(baseEntry.type){
        case EntryType.Hospital:
            return {
                ...baseEntry,
                discharge: parseDischarge(obj.discharge)
            };
        case EntryType.HealthCheck:
            return {
                ...baseEntry,
                healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
            };
        case EntryType.OccupationalHealthcare:
            const OCEntry = {...baseEntry, employerName: parseString(obj.employerName) };
            if (obj.sickLeave) {
                return {...OCEntry, sickLeave: parseSickLeave(obj.sickLeave)};
            }
            return OCEntry;
        default:
            return assertNever(baseEntry);
    }
};

export default toNewPatient;