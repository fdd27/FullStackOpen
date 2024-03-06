import React, { useEffect } from "react";
import { useState } from "react";

import { EntryFormValues, HealthCheckRating } from "../../types";

import { TextField, Button, InputLabel, MenuItem, FormControl, Select, OutlinedInput, Checkbox, ListItemText, FormLabel, SelectChangeEvent } from "@mui/material";

import diagnosisService from "../../services/diagnoses";

interface Props {
    onSubmit: (values: EntryFormValues) => Promise<void>;
    showError: (msg: string) => void;
}

const formStyle = {
    border: '1px dotted black',
    borderRadius: '5px',
    padding: '0px 10px'
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const EntryForm = ({ onSubmit, showError }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('01-01-2001');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [allDiagnosisCodes, setAllDiagnosisCodes] = useState<string[]>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
    const [dischargeDate, setDischargeDate] = useState('01-01-2001');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('01-01-2001');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('01-01-2001');

    useEffect(() => {
        const fetchDiagnosisCodes = async () => {
            const diagnoses = await diagnosisService.getAll();
            setAllDiagnosisCodes(diagnoses.map(d => d.code));
        };
        void fetchDiagnosisCodes();
    }, []);


    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let entryToAdd: EntryFormValues;
        switch (type) {
            case ('HealthCheck'):
                entryToAdd = { type, description, date, specialist, healthCheckRating };
                if (diagnosisCodes) entryToAdd.diagnosisCodes = diagnosisCodes;
                onSubmit(entryToAdd);
                break;
            case ('Hospital'):
                entryToAdd = { type, description, date, specialist, discharge: { date: dischargeDate, criteria: dischargeCriteria } };
                if (diagnosisCodes) entryToAdd.diagnosisCodes = diagnosisCodes;
                onSubmit(entryToAdd);
                break;
            case ('OccupationalHealthcare'):
                entryToAdd = { type, description, date, specialist, employerName, sickLeave: { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } };
                if (diagnosisCodes) entryToAdd.diagnosisCodes = diagnosisCodes;
                onSubmit(entryToAdd);
                break;
            default:
                showError('Type has not been selected');
        }
        clearValues();
    };

    const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string | string[];

        if (Array.isArray(value)) setDiagnosisCodes(value);
        else setDiagnosisCodes([value]);
    };

    const handleCancel = () => {
        setOpen(false);
        clearValues();
    };

    const clearValues = () => {
        setType('');
        setDescription('');
        setDate('01-01-2001');
        setSpecialist('');
        setHealthCheckRating(0);
        setDischargeDate('01-01-2001');
        setDischargeCriteria('');
        setEmployerName('');
        setSickLeaveStartDate('01-01-2001');
        setSickLeaveEndDate('01-01-2001');
        setDiagnosisCodes([]);
    };

    if (!open) {
        return (
            <Button variant="contained" onClick={() => setOpen(true)}>Add new entry</Button>
        );
    }
    else {
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
                    fullWidth
                /><br />
                <TextField
                    label="Date"
                    variant="standard"
                    type="date"
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Specialist"
                    variant="standard"
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                    fullWidth
                /><br />
                {type === 'HealthCheck' &&
                    <div>
                        <TextField
                            label="Healthcheck rating"
                            variant="standard"
                            value={healthCheckRating}
                            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                            fullWidth
                        /><br />
                    </div>
                }
                {type === 'Hospital' &&
                    <div>
                        <TextField
                            label="Discharge date"
                            variant="standard"
                            type="date"
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                            fullWidth
                            margin="normal"
                        /><br />
                        <TextField
                            label="Discharge criteria"
                            variant="standard"
                            value={dischargeCriteria}
                            onChange={({ target }) => setDischargeCriteria(target.value)}
                            fullWidth
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
                            fullWidth
                        /><br />
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Sick leave</FormLabel>
                            <TextField
                                label="start"
                                variant="standard"
                                type="date"
                                value={sickLeaveStartDate}
                                onChange={({ target }) => setSickLeaveStartDate(target.value)}
                                margin="dense"
                                style={{ marginLeft: '10px', width: '99%' }}
                            /><br />
                            <TextField
                                label="end"
                                variant="standard"
                                type="date"
                                value={sickLeaveEndDate}
                                onChange={({ target }) => setSickLeaveEndDate(target.value)}
                                margin="dense"
                                style={{ marginLeft: '10px', width: '99%' }}
                            /><br />
                        </FormControl>
                    </div>
                }
                <FormControl sx={{ width: '100%', marginTop: '20px' }}>
                    <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
                    <Select
                        labelId="diagnosis-codes-label"
                        id="diagnosis-codes"
                        multiple
                        value={diagnosisCodes}
                        onChange={handleDiagnosisCodesChange}
                        input={<OutlinedInput label="Diagnosis codes" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {allDiagnosisCodes.map((dc) => (
                            <MenuItem key={dc} value={dc}>
                                <Checkbox checked={diagnosisCodes.includes(dc)} />
                                <ListItemText primary={dc} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div style={{ width: '100%', paddingBottom: '10px' }}>
                    <Button
                        variant="contained"
                        style={{ marginTop: '20px', backgroundColor: '#ff334f' }}
                        onClick={handleCancel}
                    >
                        CANCEL
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        style={{ marginTop: '20px', float: 'right', backgroundColor: '#b2b2b2', color: 'black' }}
                    >
                        ADD
                    </Button>
                </div>
            </form>
        );
    }
};

export default EntryForm;