import { API_URL } from '../../constants'
export async function loginCall(email: string, senha: string) {
    const urlBase = API_URL; 
    const url = `${urlBase}/auth/login`;
    const data = {
      email: email,
      senha:  senha
    };
    if(url){
        try {
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
