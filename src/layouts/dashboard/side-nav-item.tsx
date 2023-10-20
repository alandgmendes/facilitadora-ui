import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React, { useState} from 'react'; 
import { Box, ButtonBase, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title, subitems } = props;
  const pathName = usePathname();
  const [showSubitems, setShowSubitems] = useState(false);

  const toggleSubitems = () => {
    setShowSubitems(!showSubitems);
  };

  const linkProps = path
    ? external
      ? {
          component: 'a',
          href: path,
          target: '_blank',
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main',
              }),
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white',
            }),
            ...(disabled && {
              color: 'neutral.500',
            }),
          }}
        >
          {title}
        </Box>
        {subitems && subitems.length > 0 && (
          <IconButton
          sx={{
            ml: 'auto',
            transform: showSubitems ? 'rotate(90deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease-in-out', 
          }}
          onClick={toggleSubitems}
        >
          <ChevronRightIcon />
        </IconButton>
        )}
      </ButtonBase>
      {showSubitems && subitems && subitems.length > 0 && (
        <ul>
          {subitems.map((subitem) => (
            <div key={subitem.path}> 
              <SideNavItem
            key={subitem.title}
            active={subitem.path === pathName}
            disabled={disabled}
            external={subitem.external}
            icon={subitem.icon}
            path={subitem.path}
            title={subitem.title}
            subitems={subitem.subitems}
          />
          </div>
            
          ))}
        </ul>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  subitems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    // Add other subitem properties as needed
  })),
};
