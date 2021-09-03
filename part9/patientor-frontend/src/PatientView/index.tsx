import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Card, Container, Header, Icon, Button } from "semantic-ui-react";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntrytModal from "../AddEntryModal";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatient, useStateValue, addEntry } from "../state";
import EntryDetails from "./EntryDetails";

// import AddPatientModal from "../AddPatientModal";


const PatientView = () => {
    const [ {patients, patient, diagnoses}, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    // console.log(id, patient);

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    // eslint-disable-next-line @typescript-eslint/require-await
    const submitNewEntry = async (values: EntryFormValues) => {
        try {
          const { data: newPatientWithEntry } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addEntry(newPatientWithEntry));
          // dispatch({ type: "ADD_PATIENT", payload: newPatient });
          closeModal();
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data || 'Unknown error');
        }
    };

    React.useEffect(() => {
        const fetchPatient = async () => {
          try {
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setPatient(patientFromApi));
            // dispatch({ type: "SET_PATIENT", payload: patientFromApi });
          } catch (e) {
            console.error(e);
            history.push("/");
            return;
          }
        };
        void fetchPatient();
    }, [patients]);

    return (
        <>
        { patient ? 
            <Container>
                <Header as='h1'>
                    <Icon name={patient.gender.toString() === 'female' ? 'venus' : 'mars'} />
                    {patient.name}
                </Header>
                <span>ssn: {patient.ssn}</span> <br/>
                <span>occupation: {patient.occupation} </span>
                <Header as='h3'>entries</Header>
                <Card.Group>
                    {patient.entries?.map((entry) => (
                        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
                    ))}
                </Card.Group>
                {/* {patient.entries?.map((entry) => (
                    <div key={entry.id}> {entry.date} : {entry.description}
                        <ul>
                            {entry.diagnosisCodes?.map((code,i) => <li key={i}>{code} : {diagnoses.find((d) => d.code === code )?.name}</li> )}
                        </ul>
                    </div> 
                ))} */}
            <div style={{marginTop: "10px"}}>
                <AddEntrytModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button onClick={() => openModal()}>Add New Entry</Button>
            </div>
            </Container>
        :
        <div></div>
        }
        </>
    );
};

export default PatientView;
