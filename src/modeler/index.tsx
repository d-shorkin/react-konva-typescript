import React, {useCallback, useMemo} from "react";
import {IElement, IElementsChildren} from "./contract";
import {Group, Layer, Rect, Stage, Text} from "react-konva";
import {RecursiveComponent} from "./Utils/RecursiveComponent";
import {Drag} from "./Wrappers/Drag";
import {Select} from "./Wrappers/Select";
import {NextChange} from "./Wrappers/NextChange";
import {WrappedProps} from "./Utils/WithWrappedProps";
import Konva from "konva";
import {NewDrag} from "./Wrappers/NewDrag";
import {IdPath} from "./Wrappers/IdPath";

export interface ElementsLogicData {
  onSelect: (key: string | number) => (e: Konva.KonvaEventObject<MouseEvent>) => void;
  onDragStart: (path: Array<string | number>, e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragMove: (path: Array<string | number>, e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragEnd: (path: Array<string | number>, e: Konva.KonvaEventObject<DragEvent>) => void;
}

export interface ElementsLogicProps extends WrappedProps<ElementsLogicData> {
  elements: IElementsChildren;
  selected: Array<string | number>;
  onChangeElements: (data: IElementsChildren) => void;
  onChangeSelected: (data: Array<string | number>) => void;
  onMoveElement: (id: Array<string | number>, pos: { x: number, y: number }) => void;
}

export const ElementsLogic: React.FC<ElementsLogicProps> = props => {
  return (<Select selected={props.selected} onChangeSelected={props.onChangeSelected}>
    {({onSelect}) => (
      <NewDrag onMoveElement={props.onMoveElement}>
        {({onDragMove, onDragEnd, onDragStart}) => props.children({onSelect, onDragMove, onDragEnd, onDragStart})}
      </NewDrag>
    )}
  </Select>);
};

export interface ModelerProps {
  elements: IElementsChildren;
  onChangeElements: (data: IElementsChildren) => void;
  selected: Array<string | number>;
  onChangeSelected: (data: Array<string | number>) => void
  onMoveElement: (idTree: string, pos: { x: number, y: number }) => void;
}


export const Modeler: React.FC<ModelerProps> = props => {
  const onChangeBase = useCallback((element: IElement) => {
    if (element.children) {
      props.onChangeElements(element.children);
    }
  }, [props.onChangeElements]);
  const baseElement: IElement = useMemo(() => ({
    children: props.elements,
    id: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }), [props.elements]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} onClick={() => props.onChangeSelected([])}>
      <Layer>
        <RecursiveComponent data={baseElement} onChange={onChangeBase}>
          {(data, next, onChange, path) => (
            <NextChange data={data} onChange={onChange}>
              {({onNextChange}) => (
                <Group>
                  {data.children!.elements.map(e => (
                    <IdPath path={[...path, data, e].slice(1)}>
                      {({getIdPath}) => (
                        <Group key={e.id} draggable={true} x={e.x} y={e.y}>
                          <Rect width={e.width} height={e.height}
                                fill={props.selected.includes(e.id) ? '#000ddd' : '#00ffff'}/>
                          <Text text={getIdPath().join('-')}/>
                          {e.children && <Group>{next(e, onNextChange)}</Group>}
                        </Group>
                      )}
                    </IdPath>
                  ))}
                </Group>
              )}
            </NextChange>
          )}
        </RecursiveComponent>
      </Layer>
    </Stage>
  );
};
