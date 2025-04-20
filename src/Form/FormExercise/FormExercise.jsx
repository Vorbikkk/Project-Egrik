import React, { useState } from 'react';
import cl from './ExerciseForm.module.css'; // Импортируем CSS модуль и переименовываем импорт

const ExerciseForm = ({ onSubmit }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
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
      <div className={cl.form_group}>
        <label htmlFor="exercise_name" className={cl.form_label}>
          Имя упражнения:
        </label>
        <input
          type="text"
          id="exercise_name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
          className={cl.form_input}
        />
      </div>

      <div className={cl.form_group}>
        <label htmlFor="exercise_description" className={cl.form_label}>
          Описание упражнения:
        </label>
        <textarea
          id="exercise_description"
          value={exerciseDescription}
          onChange={(e) => setExerciseDescription(e.target.value)}
          className={cl.form_textarea}
        />
      </div>

      <div className={cl.form_group}>
        <label htmlFor="exercise_media" className={cl.form_label}>
          Видео упражнения:
        </label>
        <input
          type="file"
          id="exercise_media"
          accept="video/*"
          onChange={handleFileChange}
          required
          className={cl.form_input_file}
        />
        {error && <p className={cl.form_error}>{error}</p>}
        {exerciseMedia && !error && (
          <p className={cl.form_file_name}>Выбранный файл: {exerciseMedia}</p>
        )}
      </div>

      <button type="submit" className={cl.form_button}>
        Сохранить
      </button>
    </form>
  );
};

export default ExerciseForm;
