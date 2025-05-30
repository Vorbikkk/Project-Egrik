import React, { useState,useRef, useEffect } from 'react';

const Govno = () => {

   let svgRef=useRef()
   let lineRef=useRef()
   
   let [dataCircle,setDataCircle]=useState()

   useEffect(()=>{

    let svg=svgRef.current
     
      console.log(svgRef.current.height)

     if(svg ){
        setDataCircle({
            cy:svg.height.baseVal.value / 2,
            cx:svg.width.baseVal.value / 2,
            r:svg.width.baseVal.value / 2,

        })
        console.log(lineRef.current.x1)
     }

   },[svgRef])




    return (
        <div>
            <svg ref={svgRef} width="800" height="400">
                 {dataCircle && <circle  cx={dataCircle.cx}  cy={dataCircle.cy} r={30}  fill='red' />}
                 <line x1={10} y1={10} x2={90} y2={90} ref={lineRef} />
            </svg>
        </div>
    );
};

export default Govno;