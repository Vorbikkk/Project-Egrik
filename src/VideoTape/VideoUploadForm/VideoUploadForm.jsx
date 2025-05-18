import React, { useState, useRef, useEffect } from 'react';
import cl from './VideoUploadForm.module.css';
import MyButton from '../../UI/MyButton/MyButton';
import ButtonCircle from '../../UI/MyButton/ButtonCircle/ButtonCircle';
import DropdownList from '../../UI/List/DropDownList';
import Tags from '../../Exercise/Tags/Tags';
import { useSelector } from 'react-redux';
import { giveUser } from '../../RTK/app/Slice/SliceUser';
import {useNavigate} from 'react-router-dom'
import { useCreateVideoClipMutation,useGetAllVideoClipsMutation } from '../../RTK/Service/VideoClipService';

const VideoUploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoClip, setVideoClip] = useState(null)
  const [allowComment, setAllowComment] = useState(false)
  const [allowDuets, setAllowDuets] = useState(false)
  const [addedTags, setAddedTags] = useState([])
  const [whoAllowWatch, setWhoAllowWatch] = useState('')
  const [createVideoClip,]=useCreateVideoClipMutation()
  const navigate=useNavigate()
  const user=useSelector(giveUser)
  const inputVideoRef = useRef()
  const listAllowWatch = ['все', 'друзья', 'только я']
 

  const LoaderFile = (e) => {
    const file = e.target.files[0]
    if(file){
      const src=URL.createObjectURL(file)
      setVideoClip({file:file,src:src})
    }

  }
 
 async  function createClip(e) {

    const tagsId = addedTags.map(elem => elem.id)
    const clip_allow=JSON.stringify({
        comment:allowComment,
        duets:allowDuets,
        watch_video:whoAllowWatch
      })

     const formData = new FormData();
      formData.append('clip_name', title);
      formData.append('clip_description', description);
      formData.append('clip_allow', clip_allow);
      formData.append('clip_marks', tagsId);
      formData.append('clip_video', videoClip.file);
      formData.append('authorId', user.id);//вытащить из хранилища пользователя и добавить сюда его айдишник

     await createVideoClip(formData)
     .then((data)=>{
      if(data.clip_name){
         navigate('/video_tape')
      }
     }
    )  
    .catch(err=>console.log(err))
     
  }

  const DropDownOnClick = (item) => {
    setWhoAllowWatch(item)
  }

  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Добавить видео</h2>
      <form onSubmit={(e) => e.preventDefault()} className={cl.form}>
        <div>
          {
            videoClip?.src && <div className={cl.container_flex}>
              <div >
                <span className={cl.container_flex}>
                  <p>Разрешить комментарии</p>
                  <ButtonCircle
                    allow={allowComment}
                    onClick={() => setAllowComment(prev => !prev)} />
                </span>
                <span className={cl.container_flex}>
                  <p>Разрешить дуэты</p>
                  <ButtonCircle allow={allowDuets}
                    onClick={()=>setAllowDuets(prev => !prev)} />
                </span>
                <span>
                  <p>кто может смотреть это видео</p>
                  <DropdownList onClick={DropDownOnClick} items={listAllowWatch} />
                </span>
              </div>
              <video controls src={videoClip.src}></video>
            </div>

          }
        </div>
        <div className={cl.formGroup}>
          <label className={cl.label}>Название видео</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название"
            className={cl.input}
          />
        </div>

        <div className={cl.formGroup}>
          <label className={cl.label}>Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Добавьте описание"
            className={cl.textarea}
          />
        </div>

        <Tags addedTags={addedTags} setAddedTags={setAddedTags} />

        <div className={cl.formGroup}>
          <MyButton onClick={() =>inputVideoRef.current.click() } >Выберите видео</MyButton>
          <input
            type="file"
            ref={inputVideoRef}
            onChange={LoaderFile}
            accept="video/*"
            className={cl.fileInput}
            style={{ display: 'none' }}
          />
        </div>

        <button onClick={createClip} className={cl.submitButton}>
          Загрузить
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;