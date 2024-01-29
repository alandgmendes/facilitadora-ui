import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { getUserProjetos } from '../../scripts/projetos/user.projetos.loader';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [itemsProjeto, setItemsProjeto] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async (userId, token) => {
      try {
        const projData = await getUserProjetos(userId, token);
        if (projData && projData.projetos.length > 0) {
          setItemsProjeto(projData.projetos);
        }
        return projData.projetos;
      } catch (error) {
        console.error('Error fetching projetos data:', error);
      }
    };
  
    const fetchDataAndSetState = async () => {
      const userString = window.sessionStorage.getItem('user');
      const storedToken = window.sessionStorage.getItem('token');

      if (userString && storedToken) {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
        setToken(storedToken);
        const projetosData = await fetchData(parsedUser.sub, storedToken);

        const projetosItem = items.find(item => item.title === 'Projetos');

        if (projetosItem) {
          projetosItem.subitems = projetosData.map(project => ({
            title: project.titulo,
            path: `/projetos/${project._id}`, 
          }));
          setItemsProjeto(projetosData); 
        }
      }
    };
  
    fetchDataAndSetState();
  }, []);

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                Facilitadora Cultural
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                Desenvolvimento
              </Typography>
            </div>
            <SvgIcon
              fontSize="small"
              sx={{ color: 'neutral.500' }}
            >
              <ChevronUpDownIcon />
            </SvgIcon>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => (
              <SideNavItem
                key={item.title}
                active={item.path === pathname}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                path={item.path}
                title={item.title}
                subitems={item.subitems}
                currentPath={pathname} // Pass the current pathname as a prop
              />
            ))}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        {/*<Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/assets/devias-kit-pro.png"
            />
          </Box>
          <Button
            component="a"
            endIcon={(
              <SvgIcon fontSize="small">
                <ArrowTopRightOnSquareIcon />
              </SvgIcon>
            )}
            fullWidth
            href="https://material-kit-pro-react.devias.io/"
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
          >
            Pro Live Preview
          </Button>
            </Box>*/}
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
