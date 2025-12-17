import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    if(!location.pathname.includes("/movies")){
      return;
    }

    let scrollY = window.history.state?.scrollY ?? 0;

    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 300);

    const handleScroll = () => {
      window.history.replaceState({ scrollY: window.scrollY }, "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return null;
}

export default ScrollRestoration;