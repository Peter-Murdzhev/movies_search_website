
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const ScrollRestoration = () => {
  const location = useLocation();
  const scrollTimeoutRef = useRef(null);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    // Reset navigation flag on location change
    isNavigatingRef.current = true;
    
    // Restore scroll position after navigation
    let scrollY = window.history.state?.scrollY ?? 0;
    
    const restoreScroll = () => {
      window.scrollTo(0, scrollY);
      // Navigation is complete after scroll restoration
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 100);
    };

    if (!location.pathname.includes("/movies")) {
      restoreScroll();
      return;
    }

    // Small delay to ensure page is rendered
    const timer = setTimeout(restoreScroll, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (!location.pathname.includes("/movies")) return;

    const handleScroll = () => {
      // Don't update history during navigation
      if (isNavigatingRef.current) return;
      
      // Clear any pending update
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounce scroll updates to reduce history state changes
      scrollTimeoutRef.current = setTimeout(() => {
        // Only update if we're not in the middle of navigation
        if (!isNavigatingRef.current) {
          window.history.replaceState(
            { 
              ...window.history.state,
              scrollY: window.scrollY 
            }, 
            ""
          );
        }
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  return null;
};

export default ScrollRestoration;





//old algorithm
//breaks on mobile browsers

// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const ScrollRestoration = () => {
//   const location = useLocation();

//   useEffect(() => {
//     if(!location.pathname.includes("/movies")){
//       return;
//     }

//     let scrollY = window.history.state?.scrollY ?? 0;

//     setTimeout(() => {
//       window.scrollTo(0, scrollY);
//     }, 300);

//     const handleScroll = () => {
//       window.history.replaceState({ 
//         ...window.history.state,
//         scrollY: window.scrollY }, "");
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [location.pathname]);

//   return null;
// }

// export default ScrollRestoration;