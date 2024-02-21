export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type NoSsnPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}