import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from '../../../../hooks/use-auth';
import { useAuthContext } from '../../../../contexts/auth-context';
const now = new Date();

interface TaskPopoverProps {
  anchorEl: Element | null;
  onClose?: () => void;
  open: boolean;
  taskItem: any;
}


const TaskCompPopover: React.FC<TaskPopoverProps> = ({ anchorEl, onClose, open, taskItem }) => {
  const isAuthenticated = useAuthContext();
  const user = isAuthenticated?.user || null;
  const router = useRouter();
  const auth = useAuth();
  console.log(taskItem);

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  return (
    <Popover 
    anchorEl={anchorEl}
    anchorOrigin={{
      horizontal: 'center',
      vertical: 'top'
    }}
    onClose={onClose}
    open={open}
    PaperProps={{ sx: { width: 400 } }}
  >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Usuário
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user?.pessoa?.nome}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
      </MenuList>
    </Popover>
  );
};

export default TaskCompPopover;