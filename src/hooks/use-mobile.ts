import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", handleChange);

    // Call once to set initial state
    handleChange();

    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile ?? false;
}
