import { NewDiaryEntry, Weather, Visibility, DiaryEntry } from "./types";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data.');

    if ('date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry: NewDiaryEntry = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
        };
        return newEntry
    }
    else {
        throw new Error('Incorrect data: some fields are missing.');
    }
}

const isString = (text: unknown): text is string => {    
    return typeof text === "string" || text instanceof String;
};

const isDate = (date: unknown): boolean => {    
    if (isString(date)) return Boolean(Date.parse(date));
    else return false;
};

const isWeather = (weather: unknown): weather is Weather => {
    return Object.values(Weather).map(w => w.toString()).includes(String(weather));
};

const isVisibility = (vis: string): vis is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(vis);
};

const parseDate = (date: unknown): string => {    
    if (isString(date) && isDate(date)) return String(date);
    else throw new Error('Incorrect or missing date: ' + date);
};

const parseWeather = (weather: unknown): Weather => {
    if (!isWeather(weather)) throw new Error('Incorrect or missing weather: ' + weather);    
    return weather as Weather;
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!isVisibility(String(visibility))) throw new Error('Incorrect or missing visibility: ' + visibility);
    return visibility as Visibility;
};

export const isDiaryEntry = (object: unknown): object is DiaryEntry => {
    if (!object || typeof object !== 'object') throw new Error('Incorrect or missng data');

    if ('date' in object && 'weather' in object && 'visibility' in object) {
        try {
            return isString(object.date) && isWeather(object.weather as Weather) && isVisibility(object.visibility as Visibility);
        }
        catch {
            throw new Error('Incorrect or missing data');
        }
    }
    
    return false
};

export default toNewDiaryEntry;