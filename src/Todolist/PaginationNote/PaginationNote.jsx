import React, { useEffect, useState } from 'react';
import cl from './Pagination.module.css'

const PaginationNote = ({ count,setNumberPagination,limit=5 }) => {

    const [countPages, setCountPages] = useState([])
    const [activePage,setActivePage]=useState(null)

     console.log(limit)

    useEffect(() => {
        if(activePage===null){
            const numberPage=Math.ceil(count / limit)
            setNumberPagination(Math.max(numberPage,1))
            setActivePage(Math.ceil(count / limit - 1))
        }
        console.log('one')
        createPages()
    }, [count])

    function createPages() {
        let pages = []
        let sumPages = count <= limit ? 1 : Math.ceil(count / limit);
        for (let i = 0; i < sumPages; i++) {
            pages.push(i);
        }
        setCountPages(pages)
    }
    
    function choosePage(page) {
        setNumberPagination(page+1)
        setActivePage(page)
    }

    function addBtnPages(page){
    
        let classBtn= page === activePage ? [cl.pagination_button,cl.active] : [cl.pagination_button] 

        return (
            <button 
            key={`page${page}`}
            className={classBtn.join(' ')}
            onClick={()=>choosePage(page)}
            >
               {page+1}
            </button>
        )
    }


    return (
        <div className={cl.container_pagination}>
            {countPages.map((page) =>addBtnPages(page) )}
        </div>
    );
};

export default PaginationNote;