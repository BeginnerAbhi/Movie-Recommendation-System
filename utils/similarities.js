// Function to calculate cosine similarity between two users
export function calculateSimilarity(user1Ratings, user2Ratings) {
    const commonMovies = Object.keys(user1Ratings).filter((movieId) =>
      user2Ratings.hasOwnProperty(movieId)
    );
  
    if (commonMovies.length === 0) return 0; // No common movies, similarity is zero
  
    let dotProduct = 0;
    let magnitudeUser1 = 0;
    let magnitudeUser2 = 0;
  
    commonMovies.forEach((movieId) => {
      const rating1 = user1Ratings[movieId];
      const rating2 = user2Ratings[movieId];
  
      dotProduct += rating1 * rating2;
      magnitudeUser1 += rating1 ** 2;
      magnitudeUser2 += rating2 ** 2;
    });
  
    return dotProduct / (Math.sqrt(magnitudeUser1) * Math.sqrt(magnitudeUser2));
  }
  
  