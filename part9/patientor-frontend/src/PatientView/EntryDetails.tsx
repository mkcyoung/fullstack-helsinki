import React from 'react';
import { Entry, Diagnosis } from '../types';

import { HospitalEntry, HealthCheckView, OccupationalEntry } from './EntryViews';


const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails = ( { entry, diagnoses } : {entry: Entry, diagnoses: Diagnosis[] } ) => {
    switch(entry.type){
      case "Hospital":
        return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealthCheckView entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
};


export default EntryDetails;