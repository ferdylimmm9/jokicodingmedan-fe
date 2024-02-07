import React, { useEffect, useRef } from 'react';

export default function useCombinedRefs(...refs) {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}
export function useSyncRefsToSource<T>(
  sourceRef: React.MutableRefObject<T>,
  ...refs: (React.MutableRefObject<T | undefined> | undefined)[]
) {
  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      ref.current = sourceRef.current;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
