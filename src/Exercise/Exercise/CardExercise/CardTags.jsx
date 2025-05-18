import React from 'react';
import cl from './CardTags.module.css'

const CardTags = ({ tags }) => {
  const visibleTags = tags.slice(0, 3);
  const hiddenTagsCount = tags.length - 3;

  return (
    <div className={cl.tags}>
      {visibleTags.map((tag, index) => (
        <span key={index} className={cl.tag}>
          {tag.ex_mark_title}
        </span>
      ))}
      {hiddenTagsCount > 0 && (
        <span className={cl.tag}>+{hiddenTagsCount}</span>
      )}
    </div>
  );
};

export default CardTags;