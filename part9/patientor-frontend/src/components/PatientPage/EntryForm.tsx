import React from "react";
import { useState } from "react";

import { EntryFormValues, HealthCheckRating } from "../../types";

import { TextField, Button } from "@mui/material";

interface Props {
    onSubmit: (values: EntryFormValues) => Promise<void>;
}

const EntryForm = ({ onSubmit }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const entryToAdd: EntryFormValues = {
            description,
            date,
            specialist,
            type: 'HealthCheck',
            healthCheckRating
        };
        if (diagnosisCodes) entryToAdd.diagnosisCodes = diagnosisCodes;
        onSubmit(entryToAdd);
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating(0);
        setDiagnosisCodes([]);
    };

    const formStyle = {
        border: '1px dotted black',
        borderRadius: '5px',
        padding: '0px 10px'
    };

    return (
        <form onSubmit={addEntry} style={formStyle}>
            <h3>New HealthCheck Entry</h3>
            <TextField
                label="Description"
                variant="standard"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
                style={{ width: '100%' }}
            /><br />
            <TextField
                label="Date"
                variant="standard"
                value={date}
                onChange={({ target }) => setDate(target.value)}
                style={{ width: '100%' }}
            /><br />
            <TextField
                label="Specialist"
                variant="standard"
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
                style={{ width: '100%' }}
            /><br />
            <TextField
                label="Healthcheck rating"
                variant="standard"
                value={healthCheckRating}
                onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                style={{ width: '100%' }}
            /><br />
            <TextField
                label="Diagnosis codes"
                variant="standard"
                value={diagnosisCodes}
                onChange={({ target }) => setDiagnosisCodes(Array.from(target.value.split(',')))}
                style={{ width: '100%' }}
            /><br />
            <div style={{ width: '100%', paddingBottom: '10px' }}>
                <Button
                    variant="contained"
                    style={{
                        marginTop: '10px',
                        backgroundColor: '#ff334f'
                    }}
                >CANCEL</Button>
                <Button
                    variant="contained"
                    type="submit"
                    style={{
                        marginTop: '10px',
                        float: 'right',
                        backgroundColor: '#b2b2b2',
                        color: 'black'
                    }}
                >ADD</Button>
            </div>
        </form>
    );
};

export default EntryForm;