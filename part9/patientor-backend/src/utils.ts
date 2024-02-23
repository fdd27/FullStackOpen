import { NewPatient, Gender, NewEntry, HealthCheckRating, SickLeave, Discharge, Diagnosis } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
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

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data');
    if ('description' in object && 'date' in object && 'specialist' in object && 'type' in object) {
        switch (object.type) {
            case 'HealthCheck':
                if ('healthCheckRating' in object) {
                    const newEntry: NewEntry = {
                        description: parseEntryDescription(object.description),
                        date: parseEntryDate(object.date),
                        specialist: parseEntrySpecialist(object.specialist),
                        type: object.type,
                        healthCheckRating: parseEntryHealthCheckRating(object.healthCheckRating)
                    };
                    if ('diagnosisCodes' in object) newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
                    return newEntry;
                }
                throw new Error('Incorrect or missing HealthCheck Entry data.');
            case 'OccupationalHealthcare':
                if ('employerName' in object) {
                    const newEntry: NewEntry = {
                        description: parseEntryDescription(object.description),
                        date: parseEntryDate(object.date),
                        specialist: parseEntrySpecialist(object.specialist),
                        type: object.type,
                        employerName: parseEntryEmployerName(object.employerName)
                    };
                    if ('diagnosisCodes' in object) newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
                    if ('sickLeave' in object) newEntry.sickLeave = parseSickLeave(object.sickLeave);
                    return newEntry;
                }
                throw new Error('Incorrect or missing OccupationalHealhcare Entry data');
            case 'Hospital':
                if ('discharge' in object) {
                    const newEntry: NewEntry = {
                        description: parseEntryDescription(object.description),
                        date: parseEntryDate(object.date),
                        specialist: parseEntrySpecialist(object.specialist),
                        type: object.type,
                        discharge: parseDischarge(object.discharge)
                    };
                    if ('diagnosisCodes' in object) newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
                    return newEntry;
                }
                throw new Error('Incorrect or missing Hospital Entry data');
        }
    }
    throw new Error('Incorrect or missing Entry data');
};

const parseName = (name: unknown): string => {
    if (!isString(name)) throw new Error('Incorrect or missing name: ' + name);
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth)) throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) throw new Error('Incorrect or missing ssn: ' + ssn);
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) throw new Error('Incorrect or missing gender: ' + gender);
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) throw new Error('Incorrect or missing occupation: ' + occupation);
    return occupation;
};

const parseEntryDescription = (description: unknown): string => {
    if (!isString(description)) throw new Error('Incorrect or missing entry description: ' + description);
    return description;
};

const parseEntryDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) throw new Error('Incorrect or missing entry date: ' + date);
    return date;
};

const parseEntrySpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) throw new Error('Incorrect or missing entry specialist: ' + specialist);
    return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseEntryHealthCheckRating = (hcr: unknown): HealthCheckRating => {
    if (!isNumber(hcr) || !isHealthCheckRating(hcr)) throw new Error('Incorrect or missing health check rating: ' + hcr);
    return hcr;
};

const parseEntryEmployerName = (en: unknown): string => {
    if (!isString(en)) throw new Error('Incorrect or missing employer name: ' + en);
    return en;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!isSickLeave(sickLeave)) throw new Error('Incorrect or missing sick leave data');
    return sickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!isDischarge(discharge)) throw new Error('Incorrect or missing discharge data');
    return discharge;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const isSickLeave = (obj: unknown): obj is SickLeave => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'startDate' in obj &&
        'endDate' in obj &&
        typeof obj.startDate === 'string' &&
        typeof obj.endDate === 'string'
    );
};

const isDischarge = (obj: unknown): obj is Discharge => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'date' in obj &&
        'criteria' in obj &&
        typeof obj.date === 'string' &&
        typeof obj.criteria === 'string'
    );
};