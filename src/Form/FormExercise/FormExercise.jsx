import React, { useState } from 'react';
import cl from './FormExercise.module.css';
import Exercise from '../../Exercise/Exercise';

const ExerciseForm = ({ onSubmit }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('Описание упражнения');
  const [exerciseMedia, setExerciseMedia] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!exerciseMedia) {
      setError('Пожалуйста, загрузите видео.');
      return;
    } else {
      setError('');
    }

    const formData = {
      exercise_name: exerciseName,
      exercise_description: exerciseDescription,
      exercise_media: exerciseMedia,
    };

    onSubmit(formData);

    setExerciseName('');
    setExerciseDescription('Описание упражнения');
    setExerciseMedia('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Пожалуйста, загрузите видеофайл.');
        setExerciseMedia('');
        return;
      }
      setError('');
      setExerciseMedia(file.name);
    } else {
      setExerciseMedia('');
      setError('Пожалуйста, загрузите видео.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cl.exercise_form}>
      <h2 className={cl.form_title}>Добавить новое упражнение</h2>
      
      <div className={cl.form_group}>
        <label htmlFor="exercise_name" className={cl.form_label}>
          Имя упражнения
        </label>
        <input
          type="text"
          id="exercise_name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
          className={cl.form_input}
          placeholder="Введите название упражнения"
        />
      </div>

      <div className={cl.form_group}>
        <label htmlFor="exercise_description" className={cl.form_label}>
          Описание упражнения
        </label>
        <textarea
          id="exercise_description"
          value={exerciseDescription}
          onChange={(e) => setExerciseDescription(e.target.value)}
          className={cl.form_textarea}
          placeholder="Опишите технику выполнения"
        />
      </div>

      <Exercise/>

      <div className={cl.form_group}>
        <label htmlFor="exercise_media" className={cl.form_label}>
          Видео упражнения
        </label>
        <div className={cl.file_upload_wrapper}>
          <label htmlFor="exercise_media" className={cl.file_upload_label}>
            <span className={cl.file_upload_text}>
              {exerciseMedia ? exerciseMedia : 'Выберите видеофайл'}
            </span>
            <span className={cl.file_upload_button}>Обзор</span>
          </label>
          <input
            type="file"
            id="exercise_media"
            accept="video/*"
            onChange={handleFileChange}
            required
            className={cl.form_input_file}
          />
        </div>
        {error && <p className={cl.form_error}>{error}</p>}
      </div>

      <button type="submit" className={cl.form_button}>
        Сохранить упражнение
      </button>
    </form>
  );
};

export default ExerciseForm;