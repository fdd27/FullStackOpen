import patients from '../../data/patients';
import { Patient, NoSsnPatient, NewPatient, NonSensitivePatient } from '../types';
import { v1 as uuid } from 'uuid';

const getNoSsnPatients = (): NoSsnPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatient = (id: string): Patient => {
    const patient = patients.find(p => p.id === id);
    if (patient) return {
        id: patient.id,
        name: patient.name,
        ssn: patient.ssn,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: patient.entries
    };
    else throw new Error('Patient not found');
};

const getNoSsnPatient = (id: string): NoSsnPatient => {
    const patient = patients.find(p => p.id === id);
    if (patient) return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: patient.entries
    };
    else throw new Error('Patient not found');
};

const getNonSensitivePatient = (id: string): NonSensitivePatient => {
    const patient = patients.find(p => p.id === id);
    if (patient) return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation
    };
    else throw new Error('Patient not found');
};

const addPatient = (patient: NewPatient): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = String(uuid());
    const newPatient = {
        id: id,
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getNoSsnPatients,
    getNonSensitivePatients,
    getPatient,
    getNoSsnPatient,
    getNonSensitivePatient,
    addPatient
};