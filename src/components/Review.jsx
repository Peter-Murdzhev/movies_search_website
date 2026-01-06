import { format } from "date-fns"

const Review = ({ review }) => {
    const formattedDate = format(review.created_at, "HH:mm dd-MM-yyyy");

    return (
        <div className="review">
            <h5>Author: {review.author}</h5>
            <p>{review.content}</p>
            <p style={{alignSelf:"flex-end", fontSize:"12px"}}>{formattedDate}</p>
        </div>
    )
}

export default Review;