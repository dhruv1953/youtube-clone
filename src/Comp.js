import React, { useState } from "react";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyBm5HSSL831tBwe_K5I329sCml5A5TFFNI"; // Secure API key
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

const Comp = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideos = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await axios.get(YOUTUBE_API_URL, {
        params: {
          part: "snippet",
          maxResults: 10,
          q: searchQuery,
          key: YOUTUBE_API_KEY,
        },
      });
      setVideos(response.data.items);
      setError("");
    } catch (err) {
      setError("Failed to fetch videos. Please try again.");
      console.error("Error fetching videos: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(query);
  };

  return (
    <div>
      <h1>YouTube Video Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        videos.map((video) => (
          <div key={video.id?.videoId || video.etag}>
            <h3>{video.snippet.title}</h3>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Comp;
