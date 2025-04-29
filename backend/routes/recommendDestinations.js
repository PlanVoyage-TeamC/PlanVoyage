import Destination from '../models/Destinations.js';
import UserPreference from '../models/userPreferences.js';

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

async function getUniqueActivities(allDestinations) {
  const uniqueActivities = new Set();
  allDestinations.forEach(destination => {
    if (destination && Array.isArray(destination.Activities)) {
      destination.Activities.forEach(activity => uniqueActivities.add(activity));
    }
  });
  return Array.from(uniqueActivities);
}

async function createFeatureVector(destination, allActivities) {
  const predefinedCategories = ['Islands', 'Mountains', 'Beaches', 'Cities & Lights', 'Desserts', 'Historical & Cultural Sites', 'Scenic'];
  const seasons = ['Summer', 'Spring', 'Fall', 'Winter'];
  const travelPartners = ['Solo', 'Couple', 'Family', 'Friends'];

  const vector = [];

  // Categories
  predefinedCategories.forEach(category => {
    vector.push(destination.Category?.includes(category) ? 1 : 0);
  });

  // Seasons
  seasons.forEach(season => {
    vector.push(destination.Seasons?.includes(season) ? 1 : 0);
  });

  // Travel Partners
  travelPartners.forEach(partner => {
    vector.push(destination.Travel_Partner?.includes(partner) ? 1 : 0);
  });

  // Activities
  allActivities.forEach(activity => {
    vector.push(destination.Activities?.includes(activity) ? 1 : 0);
  });

  // Normalize Price
  const avgPrice = (destination.Min_Price + destination.Max_Price) / 2;
  const normalizedPrice = avgPrice / 1000;
  vector.push(normalizedPrice);

  return vector;
}

// ✅ Main function using User Genome Profile
export async function recommendDestinations(email) {
  try {
    const userLikes = await UserPreference.find({ email, preference: 'like' });
    const userDislikes = await UserPreference.find({ email, preference: 'dislike' });

    if (!userLikes.length) {
      console.log('No liked destinations found for this user.');
      return [];
    }

    const allDestinations = await Destination.find();
    const allActivities = await getUniqueActivities(allDestinations);

    // Step 1: Build user profile vector
    const likedVectors = [];
    for (const like of userLikes) {
      const likedDestination = allDestinations.find(dest => dest.id === like.placeId);
      if (likedDestination) {
        const vector = await createFeatureVector(likedDestination, allActivities);
        likedVectors.push(vector);
      }
    }

    if (!likedVectors.length) {
      console.log('No valid liked destinations found.');
      return [];
    }

    // Step 2: Average vectors for likes
    const profileVector = likedVectors[0].map((_, idx) => {
      const sum = likedVectors.reduce((acc, vec) => acc + vec[idx], 0);
      return sum / likedVectors.length;
    });

    // Step 3: Build dislike profile vector (if any)
    let dislikeProfileVector = null;
    if (userDislikes.length) {
      const dislikedVectors = [];
      for (const dislike of userDislikes) {
        const dislikedDestination = allDestinations.find(dest => dest.id === dislike.placeId);
        if (dislikedDestination) {
          const vector = await createFeatureVector(dislikedDestination, allActivities);
          dislikedVectors.push(vector);
        }
      }
      if (dislikedVectors.length) {
        dislikeProfileVector = dislikedVectors[0].map((_, idx) => {
          const sum = dislikedVectors.reduce((acc, vec) => acc + vec[idx], 0);
          return sum / dislikedVectors.length;
        });
      }
    }

    // Step 4: Calculate similarity for each destination
    const recommendations = [];

    for (const destination of allDestinations) {
      const destinationVector = await createFeatureVector(destination, allActivities);
      let similarity = cosineSimilarity(profileVector, destinationVector);

      // Apply dislike penalty if applicable
      if (dislikeProfileVector) {
        const dislikeSimilarity = cosineSimilarity(dislikeProfileVector, destinationVector);
        similarity = similarity - 0.5 * dislikeSimilarity; // Adjust weight (0.5) as needed
        similarity = Math.max(0, similarity); // Optional: clamp to not go below 0
      }

      recommendations.push({
        destination,
        similarity
      });
    }

    // Step 5: Sort and filter
    recommendations.sort((a, b) => b.similarity - a.similarity);

    const seen = new Set();
    const uniqueRecommendations = recommendations.filter(rec => {
      if (seen.has(rec.destination.id)) return false;
      seen.add(rec.destination.id);
      return true;
    });

    // Step 6: Exclude already liked places
    const likedIds = new Set(userLikes.map(like => like.placeId));
    const finalRecommendations = uniqueRecommendations.filter(rec => !likedIds.has(rec.destination.id));

    // Step 7: Return Top 10
    return finalRecommendations.slice(0, 10).map(rec => ({
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


/*import Destination from '../models/Destinations.js';
import UserPreference from '../models/userPreferences.js';

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

async function getUniqueActivities(allDestinations) {
  const uniqueActivities = new Set();
  allDestinations.forEach(destination => {
//    console.log(destination);
    if (destination && Array.isArray(destination.Activities)) {
      destination.Activities.forEach(activity => uniqueActivities.add(activity));
    }
  });
//  console.log(uniqueActivities);
  return Array.from(uniqueActivities);
}

async function createFeatureVector(destination, allActivities) {
  const predefinedCategories = ['Islands', 'Mountains', 'Beaches', 'Cities & Lights', 'Desserts', 'Historical & Cultural Sites', 'Scenic'];
  const seasons = ['Summer', 'Spring', 'Fall', 'Winter'];
  const travelPartners = ['Solo', 'Couple', 'Family', 'Friends'];

  const vector = [];

  // Categories
  predefinedCategories.forEach(category => {
    vector.push(destination.Category?.includes(category) ? 1 : 0);
  });

  // Seasons
  seasons.forEach(season => {
    vector.push(destination.Seasons?.includes(season) ? 1 : 0);
  });

  // Travel Partners
  travelPartners.forEach(partner => {
    vector.push(destination.Travel_Partner?.includes(partner) ? 1 : 0);
  });

  // Activities
  allActivities.forEach(activity => {
    vector.push(destination.Activities?.includes(activity) ? 1 : 0);
  });

  // Normalize Price
  const avgPrice = (destination.Min_Price + destination.Max_Price) / 2;
  const normalizedPrice = avgPrice / 1000;
  vector.push(normalizedPrice);
//  console.log(vector);
  return vector;
}

// ✅ Main function using User Genome Profile
export async function recommendDestinations(email) {
  try {
    const userLikes = await UserPreference.find({ email, preference: 'like' });
    console.log(userLikes);
    if (!userLikes.length) {
      console.log('No liked destinations found for this user.');
      return [];
    }

    const allDestinations = await Destination.find();
    const allActivities = await getUniqueActivities(allDestinations);

    // Step 1: Build user profile vector
    const likedVectors = [];
    for (const like of userLikes) {
      const likedDestination = allDestinations.find(dest => dest.id === like.placeId);
      if (likedDestination) {
        const vector = await createFeatureVector(likedDestination, allActivities);
        likedVectors.push(vector);
      }
    }

    if (!likedVectors.length) {
      console.log('No valid liked destinations found.');
      return [];
    }

    // Step 2: Average vectors
    const profileVector = likedVectors[0].map((_, idx) => {
      const sum = likedVectors.reduce((acc, vec) => acc + vec[idx], 0);
      return sum / likedVectors.length;
    });

    // Step 3: Calculate similarity for each destination
    const recommendations = [];

    for (const destination of allDestinations) {
      const destinationVector = await createFeatureVector(destination, allActivities);
      const similarity = cosineSimilarity(profileVector, destinationVector);

      recommendations.push({
        destination,
        similarity
      });
    }

    // Step 4: Sort and filter
    recommendations.sort((a, b) => b.similarity - a.similarity);

    const seen = new Set();
    const uniqueRecommendations = recommendations.filter(rec => {
      if (seen.has(rec.destination.id)) return false;
      seen.add(rec.destination.id);
      return true;
    });

    // Step 5: Exclude already liked places
    const likedIds = new Set(userLikes.map(like => like.placeId));
    const finalRecommendations = uniqueRecommendations.filter(rec => !likedIds.has(rec.destination.id));

    // Step 6: Return Top 5
    return finalRecommendations.slice(0, 10).map(rec => ({
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
}*/
