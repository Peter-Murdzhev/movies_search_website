import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Hero from "./Hero";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsSearchTriggered(true);
    }

    const currentInput = sessionStorage.getItem("input");
    if (currentInput) {
      setInput(currentInput);
    }
  }, [location])

  const handleSearch = async (e) => {
    e.preventDefault();

    if (input.length > 0) {
      sessionStorage.setItem("input", input);

      navigate(`/movies/${input}`);
    } else {
      setIsSearchTriggered(false);
      sessionStorage.removeItem("input");

      navigate("/");
    }
  }

  const handleKeyDown = (e) => {
    if (e.target.key === "Enter") {
      handleSearch(e);
    }
  }

  return (
    <div className="search_page">
      <Hero isSearchTriggered={isSearchTriggered} setIsSearchTriggered={setIsSearchTriggered}
      setInput={setInput} />

      <form className={`search_bar ${isSearchTriggered ? "search_active" : ""}`}>
        <input type="text" value={input} placeholder="Enter movie name"
          onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}></input>
        <button onClick={handleSearch}> Search</button>
      </form>

    </div>

  )
}

export default SearchBar;