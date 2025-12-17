import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const triggered = sessionStorage.getItem("search_triggered") === "true";
    setIsSearchTriggered(triggered);

    const currentInput = sessionStorage.getItem("input");
    if(currentInput){
      setInput(currentInput);
    }
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault();

    if (input.length > 0) {
      setIsSearchTriggered(true);
      sessionStorage.setItem("search_triggered", true);
      sessionStorage.setItem("input", input);

      navigate(`movies/${input}`);
    } else {
      setIsSearchTriggered(false);
      sessionStorage.setItem("search_triggered", false);

      navigate("/")
    }
  }

  const handleKeyDown = (e) => {
    if (e.target.key === "Enter") {
      handleSearch(e);
    }
  }

  return (
    <div className="search_page">
      <Hero isSearchTriggered={isSearchTriggered} />

      <form className={`search_bar ${isSearchTriggered ? "search_active" : ""}`}>
        <input type="text" value={input} placeholder="Enter movie name"
          onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}></input>
        <button onClick={handleSearch}> Search</button>
      </form>

    </div>

  )
}

export default SearchBar;