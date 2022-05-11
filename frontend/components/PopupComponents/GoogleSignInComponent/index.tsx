import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
 
function useGoogleAuthentication() {



  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  
    
    if ('accessToken' in response) {
      const accessToken = response.accessToken;
 
      fetch(`${process.env.REACT_APP_API_URL}/google-auth`, {
        method: 'POST',
        body: JSON.stringify({
          token: accessToken
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
  }
 
  return {
    handleSuccess,
  }
}
 
export default useGoogleAuthentication;