import { useNavigate } from "react-router-dom"


const Hero = ({ isSearchTriggered, setIsSearchTriggered, setInput }) => {
  const navigate = useNavigate();

  return (
    <div className={`hero ${isSearchTriggered ? "search_active" : ""}`}>
      <img src="/tmdb_logo.svg" onClick={() => {
         setIsSearchTriggered(false);
         setInput("")
         sessionStorage.removeItem("input");
         navigate("/");
      }}></img>
      <h4>Search any movie info here</h4>
    </div>
  )
}

export default Hero;