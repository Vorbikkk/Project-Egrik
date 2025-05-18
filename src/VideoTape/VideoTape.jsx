import React,{useState} from 'react';
import VideoUploadForm from './VideoUploadForm/VideoUploadForm';
import cl from './VideoTape.module.css'
import MyButton from '../UI/MyButton/MyButton';
import Loading from '../UI/Loading/Loading'
import { useGetAllVideoClipsQuery } from '../RTK/Service/VideoClipService';
import VideoClip from './VideoClip/VideoClip';

const VideoTape = () => {
    
    const  {data,isLoading}= useGetAllVideoClipsQuery({limit:3,offset:1})
    const  [activeForm,setActiveForm]=useState(false)
    


    return (
        <div className={cl.VideoTape}>
            {isLoading && <Loading />}
             <div>
                {data && data.rows.map(clip=>
                    <VideoClip clip={clip} />
                )}
             </div>
            {!activeForm ? <MyButton onClick={()=>setActiveForm(true)}>Опубликовать</MyButton> : <VideoUploadForm />}
        </div>
    );
};

export default VideoTape;

//загружать видео по 3 штуки если вдруг подошел ко в 2 то загрузить еще два
//так же надо про кэширвоать через serviceWorker