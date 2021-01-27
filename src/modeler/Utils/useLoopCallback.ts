import {DependencyList, useCallback, useRef} from 'react';
import {usePrevious} from './usePrevious';

type BaseCallback<A extends any[], R> = (key: number | string, ...args: A) => R;
type FinalCallback<A extends any[], R> = (...args: A) => R;
type Factory<A extends any[], R> = (key: number | string) => FinalCallback<A, R>;

interface CallbacksList<A extends any[], R> {
  [p: string]: FinalCallback<A, R>;
}

export function useLoopCallback<A extends any[], R>(callback: BaseCallback<A, R>, deps: DependencyList = []): Factory<A, R> {
  const callbacksRef = useRef<CallbacksList<A, R>>({});
  // eslint-disable-next-line
  const cb = useCallback(callback, deps);
  const prevCb = usePrevious(cb);
  if (prevCb !== cb) {
    callbacksRef.current = {};
  }

  return (key: string | number) => {
    if (!callbacksRef.current[key.toString()]) {
      callbacksRef.current[key.toString()] = (...args: A) => cb(key, ...args);
    }

    return callbacksRef.current[key.toString()];
  };
}
