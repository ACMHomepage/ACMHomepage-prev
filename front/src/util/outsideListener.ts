import React, { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref.
 *
 * Example:
 * ``` JavaScript
 * import { useRef } from 'react';
 * import useOutsideListener from 'path/to/outsideListener';
 *
 * const comp = () => {
 *   const ref = useRef(null);
 *   useOutsideListener(ref, () => { console.log('Hello') });
 *
 *   return <div ref={ref}>FUCK</div>
 * }
 * ```
 *
 * @see https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */
export default (ref: React.RefObject<HTMLElement>, func: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        func();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, func]);
};
