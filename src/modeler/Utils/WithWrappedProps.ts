import {ReactElement} from "react";

export interface WrappedProps<T extends object> {
  children: (data: T) => ReactElement;
}

export type WithWrappedProps<P extends object, T extends object> = P & WrappedProps<T>