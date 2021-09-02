/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Entry, Diagnosis, HealthCheckEntry, OccupationalHealthcareEntry } from '../types';
import { Card, Icon, List } from "semantic-ui-react";
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

export const HospitalEntry = ({ entry, diagnoses } : {entry: Entry, diagnoses: Diagnosis[] }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name='ambulance'/></Card.Header>
                <Card.Description>{entry.description}</Card.Description>
                <List>
                    {entry.diagnosisCodes?.map((code,i) => <List.Header as='h4' key={i}>{code} : {diagnoses.find((d) => d.code === code )?.name} </List.Header> )}
                </List>
            </Card.Content>
        </Card>
    );  
};

export const HealthCheckView = ({ entry } : { entry: HealthCheckEntry }) => {
    const colors : { [id: number]: SemanticCOLORS } = {
        0: "green",
        1: "yellow",
        2: "yellow",
        3: "red"
    };
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name='user md'/></Card.Header>
                <Card.Description>{entry.description}</Card.Description>
                <Icon name='heart' color={colors[entry.healthCheckRating]}/>
            </Card.Content>
        </Card>
    );  
};


export const OccupationalEntry = ({ entry, diagnoses } : {entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name='plus square'/> {entry.employerName}</Card.Header>
                <Card.Description>{entry.description}</Card.Description>
                <List>
                    {entry.diagnosisCodes?.map((code,i) => <List.Header as='h4' key={i}>{code} : {diagnoses.find((d) => d.code === code )?.name} </List.Header> )}
                </List>
            </Card.Content>
        </Card>
    );  
};

