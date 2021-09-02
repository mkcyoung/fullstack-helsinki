import React from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Container, Header, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatient, useStateValue } from "../state";

// import AddPatientModal from "../AddPatientModal";


const PatientView = () => {
    const [ {patient, diagnoses}, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    // console.log(id, patient);

    // const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    // const [error, setError] = React.useState<string | undefined>();

    // const openModal = (): void => setModalOpen(true);

    // const closeModal = (): void => {
    //     setModalOpen(false);
    //     setError(undefined);
    // };

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
    }, [dispatch]);

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
                {patient.entries?.map((entry) => (
                    <div key={entry.id}> {entry.date} : {entry.description}
                        <ul>
                            {entry.diagnosisCodes?.map((code,i) => <li key={i}>{code} : {diagnoses.find((d) => d.code === code )?.name}</li> )}
                        </ul>
                    </div> 
                ))}
            </Container>
        :
        <div></div>
        }
        </>
    );
};

export default PatientView;
