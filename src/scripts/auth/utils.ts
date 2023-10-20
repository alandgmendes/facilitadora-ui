import { API_URL } from "../../constants";
export async function ApiUtils() {
    const urlBase = API_URL; 
    const url = `${urlBase}/api/enums`;
    if(url){
        try {
            const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
        
            if (response) {
              const result = await response.json();
              return result;
            } else {
              
              return 'error';
            }
        } catch (error) {
            console.error('Error:', error);
            return { error: 'Ocorreu um erro ao fzer login' };
        }
    }
  }