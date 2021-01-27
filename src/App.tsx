import React, {useCallback, useState} from 'react';
import './App.css';
import {Modeler} from "./modeler";
import {IElementsChildren} from "./modeler/contract";

function App() {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const [elements, setElements] = useState<IElementsChildren>({
    elements: [{
      id: 1,
      x: 1,
      y: 10,
      height: 100,
      width: 200,
      children: {
        elements: [{
          id: 2,
          x: 1,
          y: 10,
          height: 100,
          width: 200,
          children: {
            elements: [{
              id: 3,
              x: 1,
              y: 10,
              height: 100,
              width: 200,
            }],
            connections: []
          }
        },{
          id: 4,
          x: 220,
          y: 100,
          height: 100,
          width: 200,
        }],
        connections: []
      }
    }, {
      id: 5,
      x: 1,
      y: 10,
      height: 100,
      width: 200
    }, {
      id: 6,
      x: 1,
      y: 10,
      height: 100,
      width: 200
    }, {
      id: 7,
      x: 1,
      y: 10,
      height: 100,
      width: 200
    }, {
      id: 8,
      x: 1,
      y: 10,
      height: 100,
      width: 200
    }, {
      id: 9,
      x: 1,
      y: 10,
      height: 100,
      width: 200
    }, {
      id: 10,
      x: 1,
      y: 10,
      height: 100,
      width: 200
    },],
    connections: []
  });

  const onMove = useCallback((path: string, pos: {x: number, y: number}) => {
    const ids = path.split('-');
    console.log(ids, pos);
  }, []);

  return (
    <div className="App">
      <Modeler elements={elements} onChangeElements={setElements} selected={selected} onChangeSelected={setSelected} onMoveElement={onMove}/>
    </div>
  );
}

export default App;
