import { useState } from "react";

import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

import { EntryFormValues, Patient } from "../../types";

import patientService from "../../services/patients";

import axios from "axios";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Alert from '@mui/material/Alert';

interface Props {
    patient: Patient,
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const PatientPage = ({ patient, setPatient }: Props) => {
    const [error, setError] = useState<string>();

    const iconStyle = {
        margin: '18.72px 10px'
    };

    const showError = (msg: string) => {
        setError(msg);
        setTimeout(() => {
            setError(undefined);
        }, 5000);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const entry = await patientService.createEntry(patient.id, values);
            const newPatient = {
                ...patient,
                entries: patient.entries.concat(entry)
            };
            setPatient(newPatient);
        }
        catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e.response?.data && typeof e.response.data === 'string') {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    showError(message);
                }
                else {
                    showError('Unrecognized axios error');
                }
            }
            else {
                showError('Unknown error');
            }
        }
    };

    if (!patient) return <p>No patient</p>;
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h2>{patient.name}</h2>
                {patient.gender === 'male' && <MaleIcon style={iconStyle} />}
                {patient.gender === 'female' && <FemaleIcon style={iconStyle} />}
                {patient.gender === 'other' && <TransgenderIcon style={iconStyle} />}
            </div>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            {error && <Alert severity="error" style={{ marginBottom: '10px' }}>{error}</Alert>}
            <EntryForm onSubmit={submitNewEntry} showError={showError} />
            <h3>entries</h3>
            {patient.entries.map(entry =>
                <div key={entry.id}>
                    <EntryDetails entry={entry} />
                </div>
            )}
        </div>
    );
};

export default PatientPage;