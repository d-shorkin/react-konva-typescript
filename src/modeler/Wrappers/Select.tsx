import React from "react";
import {useLoopCallback} from "../Utils/useLoopCallback";
import {WrappedProps} from "../Utils/WithWrappedProps";
import Konva from "konva";

export interface SelectData {
  onSelect: (key: string | number) => (e: Konva.KonvaEventObject<MouseEvent>) => void;
}

export interface SelectProps extends WrappedProps<SelectData>{
  selected: Array<string | number>;
  onChangeSelected: (data: Array<string | number>) => void
}

export const Select: React.FC<SelectProps> = props => {
  const onSelect = useLoopCallback((key: string | number, e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    props.onChangeSelected([key]);
  }, [props.onChangeSelected]);
  return (props.children({onSelect}));
};
