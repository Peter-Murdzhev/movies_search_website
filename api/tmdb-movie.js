export default async function handler(req, res) {
    const apiKey = process.env.TMDB_TOKEN;
    const { id } = req.query;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiKey}`
            }
        })
        const data = await response.json();

        res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error: "Error fetching the movie"});
    }
}