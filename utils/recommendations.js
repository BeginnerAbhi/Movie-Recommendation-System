import { calculateSimilarity } from "./similarities.js";

// Function to recommend movies for a user
export function recommendMovies(activeUser, allUsers, allMovies) {
  const activeUserRatings = allUsers[activeUser];

  const similarities = Object.keys(allUsers)
    .filter((userId) => userId !== activeUser)
    .map((userId) => ({
      userId,
      similarity: calculateSimilarity(activeUserRatings, allUsers[userId]),
    }))
    .filter(({ similarity }) => similarity > 0) // Consider only users with positive similarity
    .sort((a, b) => b.similarity - a.similarity); // Sort by similarity in descending order

  const recommendedMovies = new Map();

  // Iterate through similar users to find movies to recommend
  similarities.forEach(({ userId, similarity }) => {
    const userRatings = allUsers[userId];

    Object.entries(userRatings).forEach(([movieId, rating]) => {
      // Recommend movies the active user hasn't rated yet
      if (!activeUserRatings[movieId] && rating >= 4) {
        if (!recommendedMovies.has(movieId)) {
          recommendedMovies.set(movieId, { score: 0, movieId });
        }

        // Weighted score by similarity
        recommendedMovies.get(movieId).score += similarity * rating;
      }
    });
  });

  // Convert map to sorted array of movie objects
  return Array.from(recommendedMovies.values())
    .sort((a, b) => b.score - a.score)
    .map((recommendation) => {
      const movie = allMovies.find((m) => m.id === recommendation.movieId);
      return movie;
    });
}
