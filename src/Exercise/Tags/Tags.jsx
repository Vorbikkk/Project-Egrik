import React, { useState, useRef, useEffect } from 'react';
import { useCreateExerciseMarkMutation, useGetExerciseMarkQuery } from '../../RTK/Service/ExerciseMarkService';
import cl from './Tags.module.css'
import useActivateBlock from '../../CustomHooks/useActivateBlock';
import MyButton from '../../UI/MyButton/MyButton'
import ListTags from './ListTags';

const Tags = ({addedTags,setAddedTags}) => {

    const [title, setTitle] = useState('')
    const { data, isLoading, isSuccess, isError } = useGetExerciseMarkQuery({ page: 1, limit: 20 })
    const [createExerciseMark,] = useCreateExerciseMarkMutation()
    const [tags, setTags] = useState([])
    const [listTags, setListTags] = useState([])
    const ApiTagsRef = useRef()
    const [activateElem, setActivateElem] = useActivateBlock(ApiTagsRef )

    useEffect(() => {
        if (data) {
            setTags([...data.rows])
            setListTags([...data.rows])
        }
    }, [data])
    useEffect(()=>{
         
        setListTags([...tags])
        setTitle('')
    },[tags])


    const searchForTags = (e) => {
        setTitle(e.target.value)
        setListTags([...tags].filter((tag) => tag.ex_mark_title.includes(e.target.value)))
        
    }


    const AddTag = (e,tag, index) => {
        e.stopPropagation()
        let copyTags = [...tags]
         copyTags.splice(index, 1)
        setActivateElem(false)
        setAddedTags([...addedTags, tag])
        setTags(copyTags)
    }

    const deleteForAddedTags = (tag, index) => {
        let copyAddedTags = [...addedTags]
         copyAddedTags.splice(index, 1)
        setTags([...tags, tag])
        setAddedTags(copyAddedTags)

    }

    const createTag = async (e) => {
        e.preventDefault()
        const newTag = {
            id: new Date().getTime(),
            ex_mark_title: '#'+title
        }
        await createExerciseMark(newTag)
        .then((res)=>{
            if(res.data){
                setAddedTags([...addedTags,res.data])
            }
        })
        .catch(err=>console.log(err))
    }
    function check(e){
      e.stopPropagation()
      setActivateElem(true)
    }

   return (
    <div
      ref={ApiTagsRef}
      onClick={(e) => check(e)}
      className={cl.ApiTags}
    >
      <div className={cl.AddTags}>
        {addedTags.length > 0 ? (
          addedTags.map((tag, index) => (
            <span
              key={`addedTag${tag.ex_mark_title}`}
              className={cl.addedTag}
            >
              {tag.ex_mark_title}
              <button 
                className={cl.deleteForAddedTags} 
                onClick={() => deleteForAddedTags(tag, index)}
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <div className={cl.emptyState}>Добавьте теги...</div>
        )}
      </div>
      
      <div className={cl.SearchTags}>
        <input
          type="text"
          value={title}
          className={cl.inputSearchTags}
          onChange={(e) => searchForTags(e)}
          placeholder="Поиск или создание тега"
        />
        {listTags.length < 1 && title && (
          <button 
            className={cl.addButton} 
            onClick={(e) => createTag(e)}
          >
            Добавить #{title}
          </button>
        )}
      </div>
      
      {activateElem && <ListTags listTags={listTags} AddTag={AddTag} />}
    </div>
  );
};

export default Tags;