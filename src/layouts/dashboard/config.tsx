import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import PropTypes from 'prop-types';
import { SvgIcon } from '@mui/material';
import { fetchItems } from './fetch.items';
import { getUserProjetos } from '../../scripts/projetos/user.projetos.loader';
// const itemsArr = await fetchItems();
export const items = [
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
    path: '/projetos/projetos',
    icon: <SvgIcon fontSize="small"><ShoppingBagIcon /></SvgIcon>,
    subitems: [], // Empty initially, will be populated by fetchData
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

