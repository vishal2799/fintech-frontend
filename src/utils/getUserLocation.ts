export type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

const GEO_RETRY_DELAY_MS = 2000;
const MAX_RETRIES = 2;

export async function getUserLocation(
  retryCount = 0
): Promise<UserLocation> {
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
      async (error) => {
        // Retry for LOCATION_UNKNOWN / POSITION_UNAVAILABLE
        if (
          error.code === error.POSITION_UNAVAILABLE &&
          retryCount < MAX_RETRIES
        ) {
          console.warn('Retrying geolocation due to temporary failure...');
          setTimeout(() => {
            getUserLocation(retryCount + 1).then(resolve).catch(reject);
          }, GEO_RETRY_DELAY_MS);
          return;
        }

        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(
              new Error(
                'Location permission denied. Please allow location access to continue.'
              )
            );
            break;
          case error.POSITION_UNAVAILABLE:
            reject(
              new Error(
                'Unable to get your location at the moment. Please try again later.'
              )
            );
            break;
          case error.TIMEOUT:
            reject(
              new Error(
                'Location request timed out. Make sure location services are enabled and signal is strong.'
              )
            );
            break;
          default:
            reject(new Error('Unknown error occurred while fetching location.'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}
