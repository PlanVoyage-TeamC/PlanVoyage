import Destination from '../models/Destinations.js';
import UserPreference from '../models/userPreferences.js';
/*const Destination = require('../models/Destinations');  // Your Destination model
const UserLikes = require('../models/userPreferences');       // Your UserLikes model*/

// Simple cosine similarity calculation
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magnitudeA === 0 || magnitudeB === 0) return 0; // To avoid divide by zero
  return dotProduct / (magnitudeA * magnitudeB);
}

async function getUniqueActivities() {
    const allDestinations = await Destination.find();
    const uniqueActivities = new Set();
  
    allDestinations.forEach(destination => {
      if (destination && Array.isArray(destination.Activities)) {
        destination.Activities.forEach(activity => {
          uniqueActivities.add(activity);
        });
      }
    });
  
    return Array.from(uniqueActivities);
}

// Step 2: Create feature vector dynamically
async function createFeatureVector(destination, allActivities) {
  const predefinedCategories = ['Islands', 'Mountains', 'Beaches', 'Cities & Lights', 'Desserts', 'Historical & Cultural Sites', 'Scenic'];
  const seasons = ['Summer', 'Spring', 'Fall', 'Winter'];
  const travelPartners = ['Solo', 'Couple', 'Family', 'Friends'];

  const vector = [];

  // Categories
  predefinedCategories.forEach(category => {
    vector.push(destination.Category.includes(category) ? 1 : 0);
  });

  // Seasons
  seasons.forEach(season => {
    vector.push(destination.Seasons.includes(season) ? 1 : 0);
  });

  // Travel Partners
  travelPartners.forEach(partner => {
    vector.push(destination.Travel_Partner.includes(partner) ? 1 : 0);
  });

  // Activities (dynamic)
  allActivities.forEach(activity => {
    vector.push(destination.Activities?.includes(activity) ? 1 : 0);
  });

  // Normalize Price (optional)
  const avgPrice = (destination.Min_Price + destination.Max_Price) / 2;
  const normalizedPrice = avgPrice / 1000; // Assuming 1000 as a rough max price
  vector.push(normalizedPrice);

  return vector;
}

export async function recommendDestinations(email) {
    try {
      // Fetch user likes (only preference === 'like')
      const userLikes = await UserPreference.find({ email, preference: 'like' });
  
      if (!userLikes.length) {
        console.log('No liked destinations found for this user.');
        return [];
      }
  
      // Fetch all destinations
      const allDestinations = await Destination.find();
      const allActivities = await getUniqueActivities(); // Dynamic activities list
  
      let recommendations = [];
  
      for (const like of userLikes) {
        const likedDestination = allDestinations.find(dest => dest.id === like.placeId);
        if (!likedDestination) continue;
  
        const likedVector = await createFeatureVector(likedDestination, allActivities);
  
        for (const destination of allDestinations) {
          if (destination.id === likedDestination.id) continue; // Skip same destination
  
          const destinationVector = await createFeatureVector(destination, allActivities);
          const similarity = cosineSimilarity(likedVector, destinationVector);
  
          recommendations.push({
            destination,
            similarity
          });
        }
      }
  
      // Sort recommendations by highest similarity
      recommendations.sort((a, b) => b.similarity - a.similarity);
  
      // Remove duplicates
      const seen = new Set();
      const uniqueRecommendations = recommendations.filter(rec => {
        if (seen.has(rec.destination.id)) return false;
        seen.add(rec.destination.id);
        return true;
      });
  
      // Return top 5 recommendations
      return uniqueRecommendations.slice(0, 5).map(rec => ({
        id: rec.destination.id,
        Loc_name: rec.destination.Loc_name,
        similarity: rec.similarity.toFixed(3),
        Image: rec.destination.Image,
        State: rec.destination.State,
        Activities: rec.destination.Activities
      }));
  
    } catch (error) {
      console.error('Error recommending destinations:', error);
      throw error;
    }
  }
  