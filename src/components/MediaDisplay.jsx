import { AiFillPlayCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";

const MediaDisplay = ({ imageSrc, trailerSrc }) => {
    const [toggleVideo, setToggleVideo] = useState(false);

    return (
        <div className="media_display">
            {trailerSrc && toggleVideo ?
                <div className="media_video">
                    <AiOutlineCloseCircle className="close_button"
                        onClick={() => setToggleVideo(false)} />
                    <iframe
                        width="320px"
                        height="300px"
                        src={trailerSrc}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen   
                    ></iframe>
                </div>
                :
                <div className="media_image">
                    {trailerSrc &&
                        <AiFillPlayCircle className="play_button"
                            onClick={() => setToggleVideo(true)} />
                    }
                    <img src={`https://image.tmdb.org/t/p/w500/${imageSrc}`}></img>
                </div>
            }
        </div>
    )
}

export default MediaDisplay;