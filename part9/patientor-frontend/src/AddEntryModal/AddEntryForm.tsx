import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { Entry } from "../types";

import { useStateValue } from "../state";


// Define Entry without the 'id' property
export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  entryType: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
}

export const AddEntryForm = ({ onSubmit, onCancel, entryType } : Props ) => {
    const [{ diagnoses }] = useStateValue();


    if (entryType === 'Hospital'){  
        return (
            <Formik
            initialValues={{
                type: entryType,
                description: "",
                date: "",
                specialist: "",
                discharge: {date: "", criteria: ""},
                diagnosisCodes: [],
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                errors.description = requiredError;
                }
                if (!values.date) {
                errors.date = requiredError;
                }
                if (!values.specialist) {
                errors.specialist = requiredError;
                }
                if (!values.discharge) {
                errors.discharge = requiredError;
                }
                return errors;
            }}
            >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                <Form className="form ui">
                    <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}
                    />
                    <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                    />
                    <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                    />
                    <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnoses)}
                    />
                    < Header size='small'>Discharge</Header>
                    <Field
                        label="Date"
                        placeholder="YYYY-MM-DD"
                        name="discharge.date"
                        component={TextField}
                    />
                    <Field
                        label="Criteria"
                        placeholder="Criteria"
                        name="discharge.criteria"
                        component={TextField}
                    />
                    <Grid>
                    <Grid.Column floated="left" width={5}>
                        <Button type="button" onClick={onCancel} color="red">
                        Cancel
                        </Button>
                    </Grid.Column>
                    <Grid.Column floated="right" width={5}>
                        <Button
                        type="submit"
                        floated="right"
                        color="green"
                        disabled={!dirty || !isValid}
                        >
                        Add
                        </Button>
                    </Grid.Column>
                    </Grid>
                </Form>
                );
            }}
            </Formik>
        );
    } else if (entryType === 'HealthCheck') {
        return (
            <Formik
            initialValues={{
                type: entryType,
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: 0,
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                errors.description = requiredError;
                }
                if (!values.date) {
                errors.date = requiredError;
                }
                if (!values.specialist) {
                errors.specialist = requiredError;
                }
                if (!values.healthCheckRating) {
                errors.discharge = requiredError;
                }
                return errors;
            }}
            >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                <Form className="form ui">
                    <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}
                    />
                    <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                    />
                    <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                    />
                    <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnoses)}
                    />
                    <Field
                        label="healthCheckRating"
                        name="healthCheckRating"
                        component={NumberField}
                        min={0}
                        max={3}
                    />
                    <Grid>
                    <Grid.Column floated="left" width={5}>
                        <Button type="button" onClick={onCancel} color="red">
                        Cancel
                        </Button>
                    </Grid.Column>
                    <Grid.Column floated="right" width={5}>
                        <Button
                        type="submit"
                        floated="right"
                        color="green"
                        disabled={!dirty || !isValid}
                        >
                        Add
                        </Button>
                    </Grid.Column>
                    </Grid>
                </Form>
                );
            }}
            </Formik>
        );
    } else if (entryType === 'OccupationalHealthcare') {
        return (
            <Formik
            initialValues={{
                type: entryType,
                description: "",
                date: "",
                specialist: "",
                employerName: "",
                sickLeave: {startDate: "", endDate: ""},
                diagnosisCodes: [],
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                errors.description = requiredError;
                }
                if (!values.date) {
                errors.date = requiredError;
                }
                if (!values.specialist) {
                errors.specialist = requiredError;
                }
                if (!values.employerName) {
                errors.employerName = requiredError;
                }
                return errors;
            }}
            >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                <Form className="form ui">
                    <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}
                    />
                    <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                    />
                    <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                    />
                    <Field
                        label="Employer Name"
                        placeholder="Employer Name"
                        name="employerName"
                        component={TextField}
                    />
                    <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnoses)}
                    />
                    < Header size='small'>Sick Leave</Header>
                    <Field
                        label="Start Date"
                        placeholder="YYYY-MM-DD"
                        name="sickLeave.startDate"
                        component={TextField}
                    />
                    <Field
                        label="End Date"
                        placeholder="YYYY-MM-DD"
                        name="sickLeave.endDate"
                        component={TextField}
                    />
                    <Grid>
                    <Grid.Column floated="left" width={5}>
                        <Button type="button" onClick={onCancel} color="red">
                        Cancel
                        </Button>
                    </Grid.Column>
                    <Grid.Column floated="right" width={5}>
                        <Button
                        type="submit"
                        floated="right"
                        color="green"
                        disabled={!dirty || !isValid}
                        >
                        Add
                        </Button>
                    </Grid.Column>
                    </Grid>
                </Form>
                );
            }}
            </Formik>
        );
    } else {
        return <div></div>;
    }
};

export default AddEntryForm;
