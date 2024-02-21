import { NewPatient, Gender } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data');

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };

        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) throw new Error('Incorrect or missing name: ' + name);
    return name;
};

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth)) throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) throw new Error('Incorrect or missing ssn: ' + ssn);
    return ssn;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) throw new Error('Incorrect or missing gender: ' + gender);
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) throw new Error('Incorrect or missing occupation: ' + occupation);
    return occupation;
};

// const parseEntries = (entries: unknown): Entry[] => {
//     return entries as Entry[];
// };

export default toNewPatient;