import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import ChangeMiniatury from '../../userProfile/Avatar/changeMiniatury/ChangeMiniatury'
import ModalDefault from '../../Modal/ModalDefault'
import { LoadAvatar } from '../../userProfile/Avatar/changeMiniatury/LoadAvatar'


jest.mock('react-redux')
// jest.mock('../../userProfile/Avatar/changeMiniatury/LoadAvatar')
 

describe('Miniatury', () => {
    
    let mockSetData
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
        let CtxCircle=screen.getByTestId('cut-out-avatar');
        const initialLeft = parseFloat(circle.style.left || '0');
        const initialTop = parseFloat(circle.style.top || '0');

        
        fireEvent.mouseDown(circle,{
        clientX: 180,
        clientY: 260,
        });
        
        fireEvent.mouseMove(document, {
          clientX: 182,
          clientY: 262,
        });
        
        fireEvent.mouseUp(document);
        
        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 0));
        });
        

        const updatedLeft = parseFloat(circle.style.left);
        const updatedTop = parseFloat(circle.style.top);
        expect(updatedLeft - initialLeft).toBeCloseTo(2);  
        expect(updatedTop - initialTop).toBeCloseTo(2);   
      });
   

      //проверяем 2 тест
      it('transform circle', async () => {
         
        let originalState=React.useState

        const mockSetData = jest.fn().mockReturnValue({x:10,y:5});
        const mockSetImageToPath = jest.fn();
        let circleSize={ width: 160, height: 160 }
        const mockSetStyleCircle = jest.fn();
        const mockSetTest = jest.fn();
        const mockSetCircleSize = jest.fn();
        
        React.useState = jest.fn()
        .mockImplementationOnce(() => ['', mockSetImageToPath])            // 1-й хук
        .mockImplementationOnce(() => [{ top: 0, left: 0 }, mockSetStyleCircle]) // 2-й хук
        .mockImplementationOnce(() => [{}, mockSetData])                   // 4-й хук
        .mockImplementationOnce(() => [circleSize, mockSetCircleSize])
        .mockImplementationOnce(() => ['', mockSetTest])                   // 3-й хук
      
        // 3. Рендерим компонент
        render(<ChangeMiniatury imageSrc={base64} />);
      
        // 4. Тестируем трансформацию
        const transformCircle = screen.getByTestId('transform-circle4');

        fireEvent.mouseDown(transformCircle, {
          clientX: rectCircle.right + 2,
          clientY: rectCircle.bottom + 2,
        });
        
        fireEvent.mouseMove(document, {
          clientX: rectCircle.right + 4,
          clientY: rectCircle.bottom + 4,
        });
        
        
        fireEvent.mouseUp(document);
        
        circleSize=mockSetCircleSize.mock.calls[mockSetCircleSize.mock.calls.length - 1]
        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 50));
        });
      

        expect(circleSize[0].width).toEqual(162);
      
      });
})

