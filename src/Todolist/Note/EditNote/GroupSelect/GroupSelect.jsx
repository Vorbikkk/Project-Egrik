// GroupSelect.js
import React, { useState, useEffect } from 'react';
import cl from '../EditNote.module.css';

const GroupSelect = ({ groups, initialnoteMarkId, onSelect }) => {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
      console.log(groups,initialnoteMarkId)

    if (groups && initialnoteMarkId) {
      const initialGroup = groups.find(g => g.id === initialnoteMarkId);
      console.log(initialGroup)
      if (initialGroup) {
        setSelectedGroup(initialGroup);
        setSearch(initialGroup.nt_mark_title);
      }
    }
  }, [groups, initialnoteMarkId]);

  const filteredGroups = search
    ? groups?.filter(g => 
        g.nt_mark_title.toLowerCase().includes(search.toLowerCase())
      )
    : groups;

  const handleSelect = (group) => {
    setSelectedGroup(group);
    setSearch(group.nt_mark_title);
    setIsOpen(false);
    onSelect(group.id);
  };

  return (
    <div className={cl.group_select}>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onClick={() => setIsOpen(!isOpen)}
        placeholder="Поиск группы"
        className={cl.group_input}
      />
      
      {isOpen && (
        <div className={cl.dropdown}>
          {filteredGroups?.length ? (
            <ul className={cl.group_list}>
              {filteredGroups.map(group => (
                <li 
                  key={group.id}
                  onClick={() => handleSelect(group)}
                  className={cl.group_item}
                >
                  {group.nt_mark_title}
                </li>
              ))}
            </ul>
          ) : (
            <div className={cl.not_found}>Ничего не найдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupSelect;