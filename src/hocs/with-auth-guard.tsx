import { JSX, ReactElement, ReactNode, FC } from 'react';
import { AuthGuard } from 'src/guards/auth-guard';

interface ComponentProps {
  
}

export const withAuthGuard: (Component: FC<ComponentProps>) => FC<ComponentProps> = (Component) => (props: JSX.IntrinsicAttributes & ComponentProps): ReactElement => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);
