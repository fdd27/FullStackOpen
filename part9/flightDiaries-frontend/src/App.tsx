import { useState, useEffect } from 'react'
import { getAllDiaries, createDiary } from './services/diaryService';
import { DiaryEntry, Weather, Visibility } from './types';
import './App.css'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>();
  const [visibility, setVisibility] = useState<Visibility>();

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    });
  }, []);

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (weather && visibility) {
      createDiary({
        date: date,
        weather: weather,
        visibility: visibility,
      }).then(data => setDiaries(diaries.concat(data)))
    }
    setDate('');
  }

  return (
    <>
      <h1>Diary entries</h1>
      <form onSubmit={addDiary} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <p>Date:</p>
        <input
          type="text"
          placeholder='yyyy-mm-dd'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <label htmlFor="weather">Weather:</label>
        <select name="weather" id="weather" onChange={({ target }) => setWeather(target.value as Weather)}>
          <option value={Weather.Cloudy}>cloudy</option>
          <option value={Weather.Rainy}>rainy</option>
          <option value={Weather.Stormy}>stormy</option>
          <option value={Weather.Sunny}>sunny</option>
          <option value={Weather.Windy}>windy</option>
        </select>
        <label htmlFor="visibility">Visibility:</label>
        <select name="visibility" id="visibility" onChange={({ target }) => setVisibility(target.value as Visibility)}>
          <option value={Visibility.Good}>good</option>
          <option value={Visibility.Great}>great</option>
          <option value={Visibility.Ok}>ok</option>
          <option value={Visibility.Poor}>poor</option>
        </select>
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
