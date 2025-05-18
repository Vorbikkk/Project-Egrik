import React, { useState,useEffect,useRef } from 'react';
import styles from './PageFullExercise.module.css';
import {useParams} from 'react-router-dom'
import { useGetOneExerciseQuery } from '../../RTK/Service/ExerciseService';

const PageFullExercise = (  ) => {
    const params=useParams()
    const {data:exercise,}=useGetOneExerciseQuery(params.id)
    const [exerciseName, setExerciseName] = useState('Без названия');
    const [exerciseDescription, setExerciseDescription] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [exerciseMedia, setExerciseMedia] = useState('');
    const [exerciseMarks, setExerciseMarks] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const videoRef=useRef()

    // Обновляем состояния при получении данных
    useEffect(() => {
        if (exercise) {
            setExerciseName(exercise.exercise_name || 'Без названия');
            setExerciseDescription(exercise.exercise_description || '');
            setDifficulty(exercise.difficulty || 'medium');
            setExerciseMedia(exercise.exercise_media || '');
            setExerciseMarks(exercise.exercise_marks || []);
        }
    }, [exercise]);

    const difficultyColors = {
        easy: '#4CAF50',
        medium: '#FFC107',
        hard: '#F44336'
    };
    if(videoRef.current){
        console.log(videoRef)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{exerciseName}</h1>
                
                <div className={styles.tagsContainer}>
                    <span 
                        className={styles.difficultyTag}
                        style={{ backgroundColor: difficultyColors[difficulty] }}
                    >
                        {difficulty}
                    </span>
                    
                    {exerciseMarks.length > 0 && (
                        <div className={styles.marksContainer}>
                            выпыв
                            {exerciseMarks.map((mark, index) => (
                                <span key={index} className={styles.markTag}>
                                    #{mark}фывфы
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.mediaContainer}>
                {exerciseMedia && (
                   
                            <video 
                                className={styles.videoPlayer}
                                ref={videoRef}
                                autoPlay
                                src={`http://localhost:5000/uploads/${exerciseMedia.slice(exerciseMedia.indexOf('uploads')+8)}`}
                            />
                        )}
            </div>

            <div className={styles.descriptionSection}>
                <button 
                    className={styles.descriptionToggle}
                    onClick={() => setShowDescription(!showDescription)}
                >
                    {showDescription ? 'Скрыть описание' : 'Показать описание'}
                </button>
                
                {showDescription && (
                    <div className={styles.descriptionContent}>
                       { exerciseDescription || 'Описание отсутствует'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageFullExercise;