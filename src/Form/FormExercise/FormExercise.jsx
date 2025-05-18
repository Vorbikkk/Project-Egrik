import React, { useState, useRef } from 'react';
import cl from './FormExercise.module.css';
import Tags from '../../Exercise/Tags/Tags';
import { useCreateExerciseMutation } from '../../RTK/Service/ExerciseService';

const ExerciseForm = ({ setActive }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [addedTags, setAddedTags] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState('');
  const [createExercise] = useCreateExerciseMutation();
  const fileInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!videoFile) {
      setError('Пожалуйста, загрузите видео.');
      return;
    }

    const tagsId = addedTags.map(item => item.id);

    // Создаем FormData и добавляем все данные
    const formData = new FormData();
    formData.append('exercise_name', exerciseName);
    formData.append('exercise_description', exerciseDescription);
    formData.append('exercise_mark', tagsId);
    formData.append('exercise_media', videoFile);

    try {
      const response = await createExercise(formData).unwrap();
      console.log('Упражнение создано:', response);
      
      // Сброс формы
      setExerciseName('');
      setExerciseDescription('');
      setAddedTags([]);
      setVideoFile(null);
      setError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setActive(false);
    } catch (err) {
      console.error('Ошибка при создании упражнения:', err);
      setError('Произошла ошибка при отправке данных');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
     
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Пожалуйста, загрузите видеофайл.');
        return;
      }
      
      setVideoFile(file);
      setError('');
    } else {
      setVideoFile(null);
      setError('Пожалуйста, загрузите видео.');
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form className={cl.exercise_form} onSubmit={handleSubmit}   >
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

      <Tags addedTags={addedTags} setAddedTags={setAddedTags} />

      <div className={cl.form_group}>
        <div className={cl.file_upload_wrapper}>
          <span className={cl.file_upload_text}>
            {videoFile ? videoFile.name : 'Файл не выбран'}
          </span>
          <button 
            type="button" 
            onClick={handleBrowseClick}
            className={cl.file_upload_button}
          >
            Обзор
          </button>
          <input
            type="file"
            id="exercise_media"
            ref={fileInputRef}
            accept="video/*"
            onChange={handleFileChange}
            required
            className={cl.form_input_file}
            style={{ display: 'none' }}
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