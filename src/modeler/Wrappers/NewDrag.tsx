import React, {useCallback} from "react";
import Konva from "konva";
import {IElementsChildren} from "../contract";
import {useLoopCallback} from "../Utils/useLoopCallback";
import {WrappedProps} from "../Utils/WithWrappedProps";

export interface DragData {
  onDragStart: (path: Array<string | number>, e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragMove: (path: Array<string | number>, e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragEnd: (path: Array<string | number>, e: Konva.KonvaEventObject<DragEvent>) => void;
}

export interface DragProps extends WrappedProps<DragData> {
  onMoveElement: (id: Array<string | number>, pos: { x: number, y: number }) => void;
}

export const NewDrag: React.FC<DragProps> = props => {
  const onDragMove = useCallback((path: Array<string | number>, event: Konva.KonvaEventObject<DragEvent>) => {
    event.cancelBubble = true;
    if (event.evt) {
      event.evt.stopPropagation();
      event.evt.preventDefault();
    }
    props.onMoveElement(path, {x: event.target.x(), y: event.target.y()});
  }, [props.onMoveElement]);
  return (props.children({onDragMove, onDragStart: onDragMove, onDragEnd: onDragMove}));
};
