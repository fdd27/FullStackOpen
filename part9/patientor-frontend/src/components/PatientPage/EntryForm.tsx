import React from "react";
import { useState } from "react";

import { EntryFormValues, HealthCheckRating } from "../../types";

import { TextField, Button, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

interface Props {
    onSubmit: (values: EntryFormValues) => Promise<void>;
}

const EntryForm = ({ onSubmit }: Props) => {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let entryToAdd: EntryFormValues;
        switch (type) {
            case ('HealthCheck'):
                entryToAdd = {
                    type,
                    description,
                    date,
                    specialist,
                    healthCheckRating
                };
                if (diagnosisCodes) entryToAdd.diagnosisCodes = diagnosisCodes;
                onSubmit(entryToAdd);
                break;
            case ('Hospital'):
                entryToAdd = {
                    type,
                    description,
                    date,
                    specialist,
                    discharge: {
                        date: dischargeDate,
                        criteria: dischargeCriteria
                    }
                };
                if (diagnosisCodes) entryToAdd.diagnosisCodes = diagnosisCodes;
                onSubmit(entryToAdd);
                break;
            case ('OccupationalHealthcare'):
                entryToAdd = {
                    type,
                    description,
                    date,
                    specialist,
                    employerName,
                    sickLeave: {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate
                    }
                };
                if (diagnosisCodes) entryToAdd.diagnosisCodes = diagnosisCodes;
                onSubmit(entryToAdd);
                break;
        }
        setType('');
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating(0);
        setDischargeDate('');
        setDischargeCriteria('');
        setEmployerName('');
        setSickLeaveStartDate('');
        setSickLeaveEndDate('');
        setDiagnosisCodes([]);
    };

    const formStyle = {
        border: '1px dotted black',
        borderRadius: '5px',
        padding: '0px 10px'
    };

    return (
        <form onSubmit={addEntry} style={formStyle}>
            <h3>New Entry</h3>
            <FormControl fullWidth>
                <InputLabel id='type-select-label'>Type</InputLabel>
                <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    label='Type'
                    onChange={({ target }) => setType(target.value)}
                >
                    <MenuItem value='HealthCheck'>HealthCheck</MenuItem>
                    <MenuItem value='Hospital'>Hospital</MenuItem>
                    <MenuItem value='OccupationalHealthcare'>OccupationalHealthcare</MenuItem>
                </Select>
            </FormControl>
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
            {type === 'HealthCheck' &&
                <div>
                    <TextField
                        label="Healthcheck rating"
                        variant="standard"
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                        style={{ width: '100%' }}
                    /><br />
                </div>
            }
            {type === 'Hospital' &&
                <div>
                    <TextField
                        label="Discharge date"
                        variant="standard"
                        value={dischargeDate}
                        onChange={({ target }) => setDischargeDate(target.value)}
                        style={{ width: '100%' }}
                    /><br />
                    <TextField
                        label="Discharge criteria"
                        variant="standard"
                        value={dischargeCriteria}
                        onChange={({ target }) => setDischargeCriteria(target.value)}
                        style={{ width: '100%' }}
                    /><br />
                </div>
            }
            {type === 'OccupationalHealthcare' && 
                <div>
                    <TextField
                        label="Employer name"
                        variant="standard"
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                        style={{ width: '100%' }}
                    /><br />
                    <TextField
                        label="Sick leave start date"
                        variant="standard"
                        value={sickLeaveStartDate}
                        onChange={({ target }) => setSickLeaveStartDate(target.value)}
                        style={{ width: '100%' }}
                    /><br />
                    <TextField
                        label="Sick leave end date"
                        variant="standard"
                        value={sickLeaveEndDate}
                        onChange={({ target }) => setSickLeaveEndDate(target.value)}
                        style={{ width: '100%' }}
                    /><br />
                </div>
            }
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