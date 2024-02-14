import patients from '../../data/patients';
import { Patient, NoSsnPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getNoSsnPatients = (): NoSsnPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
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
    addPatient
};