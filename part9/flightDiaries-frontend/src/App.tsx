import { useState, useEffect } from 'react'
import { getAllDiaries, createDiary } from './services/diaryService';
import { DiaryEntry, Weather, Visibility } from './types';
import toNewDiaryEntry, { isDiaryEntry } from './utils';
import './App.css'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>();
  const [visibility, setVisibility] = useState<Visibility>();
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (date && weather && visibility) {
      try {
        const newDiaryEntry = toNewDiaryEntry({ date: date, weather: weather, visibility: visibility });
        const addedDiaryEntry = await createDiary(newDiaryEntry);
        if (isDiaryEntry(addedDiaryEntry)) setDiaries(diaries.concat(addedDiaryEntry));
      }
      catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) errorMessage += ' Error: ' + error.message;

        setNotification(errorMessage);
        setTimeout(() => {
          setNotification('');
        }, 5000)
      }
    }
    setDate('');
  }

  return (
    <>
      <h1>Diary entries</h1>
      <div style={{ color: "red", fontStyle: "italic" }}>
        {notification}
      </div>
      <form onSubmit={addDiary} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="date">Date:</label>
        <input type="date" min='2017-01-01' value={date} onChange={({ target }) => setDate(target.value)} />

        <fieldset>
          <legend>Weather</legend>
          {Object.values(Weather).map(w => (
            <div key={w}>
              <input type="radio" name='weather' value={w} onChange={({ target }) => setWeather(target.value as Weather)} />
              <label htmlFor={w}>{w}</label>
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Visibility</legend>
          {Object.values(Visibility).map(v => (
            <div key={v}>
              <input type="radio" name='visibility' value={v} onChange={({ target }) => setVisibility(target.value as Visibility)} />
              <label htmlFor={v}>{v}</label>
            </div>
          ))}
        </fieldset>

        <button type='submit'>add</button>
      </form>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {diaries.map(diary => (
          <div key={diary.id} style={{ marginRight: '20px' }}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
