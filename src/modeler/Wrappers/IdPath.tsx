import React, {useCallback} from "react";
import {useLoopCallback} from "../Utils/useLoopCallback";
import {WrappedProps} from "../Utils/WithWrappedProps";
import Konva from "konva";
import {IElement} from "../contract";

export interface IdPathData {
  getIdPath(): Array<IElement['id']>;
}

export interface IdPathProps extends WrappedProps<IdPathData> {
  path: IElement[]
}

export const IdPath: React.FC<IdPathProps> = props => {
  const getIdPath = useCallback(() => props.path.map(e => e.id), [props.path]);
  return (props.children({getIdPath}));
};
