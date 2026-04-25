import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [state, setState] = useState({
    location: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: 'Geolocation not supported', loading: false }));
      return;
    }

    const handleSuccess = (position) => {
      setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        error: null,
        loading: false,
      });
    };

    const handleError = (error) => {
      setState(s => ({ ...s, error: error.message, loading: false }));
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return state;
}
