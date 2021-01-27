import React, {ReactElement, useMemo} from 'react';

export interface RecursiveComponentProps<T> {
  data: T;
  path?: T[];
  onChange: (data: T) => void;
  children: (data: T, next: (data: T, onChange: (data: T) => void) => ReactElement, onChange: (data: T) => void, path: T[]) => ReactElement;
}

export function RecursiveComponent<T>(props: RecursiveComponentProps<T>): ReactElement<any, any> | null {
  const path: T[] = useMemo(() => props.path || [], [props.path]);
  const nextPath = useMemo(() => path.concat([props.data]), [path, props.data]);
  const recursion = (data: T, onChange: (data: T) => void) => (<RecursiveComponent data={data} path={nextPath} onChange={onChange} children={props.children}/>)

  return props.children(props.data, recursion, props.onChange, path);
}
