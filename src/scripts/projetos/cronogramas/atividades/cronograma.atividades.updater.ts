import { API_URL } from '../../../../constants';
import mongoose from 'mongoose';

export type TObjectId = mongoose.ObjectId;
export const ObjectId = mongoose.Types.ObjectId;

export async function updateCronogramaAtividades(token: string, data: any) {
  const urlBase = API_URL;
  const url = `${urlBase}/atividades/${data._id}`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const errorText = await response.text();
      console.error('Error:', response.status, errorText);
      return 'error';
    }
  } catch (error) {
    console.error('Error:', error);
    return { error: 'An unexpected error occurred' };
  }
}