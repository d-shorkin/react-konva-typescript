export interface IElement {
  id: number | string;
  x: number;
  y: number;
  width: number;
  height: number;
  children?: IElementsChildren;
}

export interface IConnection {
  from: number | string;
  to: number | string;
}

export interface IElementsChildren {
  elements: IElement[];
  connections: IConnection[];
}