import { API_URL } from '../../../../constants';
import mongoose from 'mongoose';
export type TObjectId = mongoose.ObjectId;
export const ObjectId = mongoose.Types.ObjectId;
export async function createCronogramaAtividades(token: string, data: any) {
    const urlBase = API_URL; 
    const url = `${urlBase}/atividades`;
    if(url){
        try {
            const response = await fetch(url, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
            return { error: 'Um erro ocorreu ao salvar a tarefa' };
        }
    }
  }