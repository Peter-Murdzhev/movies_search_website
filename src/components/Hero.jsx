import React from 'react'

const Hero = ({isSearchTriggered}) => {
  return (
    <div className={`hero ${isSearchTriggered ? "search_active" : ""}`}>
        <img src="/tmdb_logo.svg"></img>
        <h4>Search any movie info here</h4>
    </div>
  )
}

export default Hero