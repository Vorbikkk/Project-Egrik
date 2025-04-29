import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import ChangeMiniatury from '../../../userProfile/Avatar/changeMiniatury/ChangeMiniatury'

jest.mock('react-redux')
jest.mock('react', () => {

  return {
    ...jest.requireActual('react'),
    useState: jest.fn()
  }


})


describe('transform test circle', () => {

  const mockSetData = jest.fn();
  const mockSetImageToPath = jest.fn();
  let circleSize = { width: 160, height: 160 }
  const mockSetStyleCircle = jest.fn();
  const mockSetCircleSize = jest.fn();
  let mockUseState
  let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  let rectCircle = {
    width: 160,
    height: 160,
    top: 258,
    left: 178,
    bottom: 258 + 160,
    right: 178 + 160,
    x: 178,
    y: 258
  }
  let checkRect = {
    bottom: 258 + 220,
    height: 220,
    left: 178,
    right: 178 + 220,
    top: 258,
    width: 220,
    x: 178,
    y: 258
  };



  beforeEach(() => {

    mockUseState = require('react').useState

    mockUseState
      .mockImplementationOnce(() => ['', mockSetImageToPath])
      .mockImplementationOnce(() => [{ top: 0, left: 0 }, mockSetStyleCircle])
      .mockImplementationOnce(() => [{}, mockSetData])
      .mockImplementationOnce(() => [circleSize, mockSetCircleSize])
      .mockImplementationOnce(() => [null, jest.fn()])

    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      configurable: true,
      value: jest.fn(function () {

        if (this.dataset.testid === 'checkRect') {
          return checkRect
        }
        return rectCircle

      })
    });


  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('transform circle', async () => {



    render(<ChangeMiniatury imageSrc={base64} />);


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

    circleSize = mockSetCircleSize.mock.calls[mockSetCircleSize.mock.calls.length - 1]
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    expect(circleSize[0].width).toEqual(162);

  });



})



