import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useAuthContext } from '../../contexts/auth-context';
const now = new Date();


export const AccountProfile = () => {

  const isAuthenticated = useAuthContext();
  const user = isAuthenticated?.user || null;
  return(
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
          >
            {user?.pessoa.nome}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user?.pessoa.acessadoEm}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user?.username}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}

