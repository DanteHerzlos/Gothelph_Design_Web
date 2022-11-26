import React, { useEffect, useRef, useState } from "react";

const useElementOnScreenOnce = (
  options: any
): [React.MutableRefObject<HTMLDivElement | null>, boolean] => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    if (entry.intersectionRatio > 0) {
      setIsVisible(entry.isIntersecting);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);

    if (containerRef.current) observer.observe(containerRef.current);
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default useElementOnScreenOnce;
