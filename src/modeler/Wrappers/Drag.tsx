import React from "react";
import Konva from "konva";
import {IElementsChildren} from "../contract";
import {useLoopCallback} from "../Utils/useLoopCallback";
import {WrappedProps} from "../Utils/WithWrappedProps";

export interface DragData {
  onDragStart: (key: string | number) => (e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragMove: (key: string | number) => (e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragEnd: (key: string | number) => (e: Konva.KonvaEventObject<DragEvent>) => void;
}

export interface DragProps extends WrappedProps<DragData> {
  elements: IElementsChildren;
  onChangeElements: (data: IElementsChildren) => void;
}

export const Drag: React.FC<DragProps> = props => {
  const onDragMove = useLoopCallback((key: string | number, event: Konva.KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true;
    if (event.evt) {
      event.evt.stopPropagation();
      event.evt.preventDefault();
    }

    props.onChangeElements({
      elements: props.elements.elements.map(e => e.id === key ? {
        ...e,
        x: event.target.x(),
        y: event.target.y()
      } : e), connections: props.elements.connections
    });
  }, [props.onChangeElements, props.elements.elements, props.elements.connections]);
  return (props.children({onDragMove, onDragStart: onDragMove, onDragEnd: onDragMove}));
};
