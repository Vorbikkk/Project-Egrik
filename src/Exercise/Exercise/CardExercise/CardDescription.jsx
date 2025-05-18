import React from 'react';
import cl from './CardDescription.module.css'

const CardDescription = ({ description }) => {
  const truncatedDesc = description.length > 100
    ? `${description.substring(0, 100)}...`
    : description;

  return (
    <div className={cl.content}>
      <p className={cl.description}>{truncatedDesc}</p>
    </div>
  );
};

export default CardDescription;