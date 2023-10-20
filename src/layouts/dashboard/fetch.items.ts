import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import { API_URL } from '../../constants';

// Function to fetch user projetos
async function getUserProjetos(userId, token) {

  const urlBase = API_URL; // Replace with your API base URL
  const url = `${urlBase}/projeto/user/${userId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.projetos || [];
    } else {
      throw new Error('Failed to fetch user projetos');
    }
  } catch (error) {
    console.error('Error fetching projetos data:', error);
    throw error;
  }
}

// Function to fetch subitems for Projetos
async function fetchProjetosSubitems(userId, token) {
  const projetos = await getUserProjetos(userId, token);
  return projetos.map((projeto) => ({
    title: projeto.titulo,
    path: `/projetos/${projeto._id}`,
  }));
}

// Main function to fetch items
export async function fetchItems(userId, token) {
  const projetos = await fetchProjetosSubitems(userId, token);
  return [
    {
      title: 'Início',
      path: '/',
      icon: <SvgIcon fontSize="small"><ChartBarIcon /></SvgIcon>,
    },
    {
      title: 'Editais',
      path: '/customers',
      icon: <SvgIcon fontSize="small"><UsersIcon /></SvgIcon>,
    },
    {
      title: 'Projetos',
      path: '/projetos',
      icon: <SvgIcon fontSize="small"><ShoppingBagIcon /></SvgIcon>,
      subitems: projetos,
    },
    {
      title: 'Usuários',
      path: '/account',
      icon: <SvgIcon fontSize="small"><UserIcon /></SvgIcon>,
    },
    {
      title: 'Configurações',
      path: '/settings',
      icon: <SvgIcon fontSize="small"><CogIcon /></SvgIcon>,
    },
    {
      title: 'Login',
      path: '/auth/login',
      icon: <SvgIcon fontSize="small"><LockClosedIcon /></SvgIcon>,
    },
    {
      title: 'Cadastro',
      path: '/auth/register',
      icon: <SvgIcon fontSize="small"><UserPlusIcon /></SvgIcon>,
    },
    {
      title: 'Error',
      path: '/404',
      icon: <SvgIcon fontSize="small"><XCircleIcon /></SvgIcon>,
    },
  ];
}