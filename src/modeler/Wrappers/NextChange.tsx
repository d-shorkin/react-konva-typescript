import React, {useCallback} from "react";
import {IElement} from "../contract";
import {WrappedProps} from "../Utils/WithWrappedProps";

export interface NextChangeData {
  onNextChange: (data: IElement) => void;
}

export interface NextChangeProps extends WrappedProps<NextChangeData> {
  data: IElement;
  onChange: (data: IElement) => void;
}

export const NextChange: React.FC<NextChangeProps> = props => {
  const onNextChange = useCallback((element: IElement) => {
    props.onChange(
      {
        ...props.data,
        children: {
          elements: props.data.children!.elements.map(e => e.id !== element.id ? e : element) || [],
          connections: props.data.children!.connections || []
        }
      });
  }, [props.onChange, props.data]);
  return (props.children({onNextChange}));
};
