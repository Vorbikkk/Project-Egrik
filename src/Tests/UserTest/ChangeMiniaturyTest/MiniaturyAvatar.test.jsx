import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import ChangeMiniatury from '../../../userProfile/Avatar/changeMiniatury/ChangeMiniatury'


jest.mock('react-redux')
 

describe('Miniatury', () => {
    
    
    let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    let rectCircle = {
        width:160,
        height:160,
        top: 258,
        left: 178,
        bottom: 258 + 160,
        right: 178 + 160,
        x: 178,
        y: 258
    }
    let checkRect  = {
        bottom: 258+220,
        height: 220,
        left: 178,
        right: 178+220,
        top: 258,
        width: 220,
        x: 178,
        y: 258
      };
      
      
      
      beforeEach(() => {
 
        Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
            configurable: true,
            value: jest.fn(function(){
                
                if (this.dataset.testid === 'checkRect') {
                    return   checkRect
                }
                return rectCircle
                
            })
        });
      
        
    })
    
    afterEach(()=>{
        jest.clearAllMocks()
    })

    //1test

    it('moving the circle', async () => {
        render(<ChangeMiniatury imageSrc={base64} />);
        
        const circle = screen.getByTestId('moving-circle');
        
        fireEvent.mouseDown(circle,{
        clientX: rectCircle.right,
        clientY: rectCircle.bottom,
        });
        
        fireEvent.mouseMove(document, {
          clientX: rectCircle.right+80,
          clientY: rectCircle.bottom+80,
        });
        
        fireEvent.mouseUp(document);
        
        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 0));
        });
        

        const updatedLeft = parseFloat(circle.style.left);
        const updatedTop = parseFloat(circle.style.top);
        expect(updatedLeft).toEqual(rectCircle.left+60);  
        expect(updatedTop).toEqual(rectCircle.top+60); 
      });
   

      
})

