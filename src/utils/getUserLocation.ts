export type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export async function getUserLocation(): Promise<UserLocation> {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!position.coords) {
          return reject(new Error('Could not retrieve location coordinates.'));
        }

        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied. Please allow location access to log in.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location is currently unavailable. Try again later.'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out. Ensure you have a good signal.'));
            break;
          default:
            reject(new Error('Unknown error while fetching location.'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Wait 10 seconds max
        maximumAge: 0,  // No cached result
      }
    );
  });
}
