import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data);
};

export const createDiary = async (object: NewDiaryEntry) => {
    try {
        const response = await axios.post<DiaryEntry>(baseUrl, object);
        return response.data;
    } 
    catch (error: unknown) {
        // if (axios.isAxiosError(error)) {
        //     if (error.response) console.log('Error: ', error.response.data);
        // }

        // let errorMessage = 'Something went wrong.';
        // if (axios.isAxiosError(error)) errorMessage += ' Axios error. ' + error.message;
        // else if (error instanceof Error) errorMessage += ' ' + error.message;
        // return errorMessage;
        
        if (axios.isAxiosError(error)) {
            if (error.response) return error.response.data;
        }
    }
};