import React, { useState, useRef, useCallback, useEffect } from 'react';
import cl from './GroupList.module.css';
import MyInput from '../../../UI/MyInput/MyInput';
import GroupItem from '../GroupItem/GroupItem';

const GroupsList = ({ groups, limit, setLimit, totalGroups }) => {
  const [openGroup, setOpenGroup] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const listRef = useRef(null);

  const filteredGroups = groups.filter(group =>
    !searchWord || group.nt_mark_title.toLowerCase().includes(searchWord.toLowerCase())
  );

  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 20;

    if (isNearBottom && limit < totalGroups) {
      setLimit(prev => prev + 5);
    }
  }, [limit, totalGroups, setLimit]);

  return (
    <div>
      <div className={cl.groupsContainer}>
        <div className={cl.groupsHeader}>
              <button
            className={`${cl.arrowButton} ${openGroup ? cl.arrowUp : cl.arrowDown}`}
            onClick={() => setOpenGroup(prev => !prev)}
            aria-label={openGroup ? "Скрыть группы" : "Показать группы"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h3 className={cl.groupsTitle}>Ваши группы</h3>
        </div>
          <p className={cl.countGroup}>{`${filteredGroups.length} из ${totalGroups}`}</p>
      </div>

      {openGroup && (
        <div className={cl.groupList}>
          <MyInput
            onChange={(e) => setSearchWord(e.target.value)}
            className={cl.Myinput}
            placeholder="Поиск групп..."
          />

          <div className={cl.groupsScrollWrapper} ref={listRef} onScroll={handleScroll}>
            <div className={cl.groupsList}>
              {filteredGroups.map(group => (
                <GroupItem key={group.id} group={group} />
              ))}

              {filteredGroups.length === 0 && (
                <div className={cl.noResults}>Группы не найдены</div>
              )}

              {limit < totalGroups && (
                <div className={cl.loadingMore}>Загрузка...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsList;
