import React from 'react';

import Loader from '../components/loader/Loader';

interface IProps {
  isLoading: boolean;
}

const withLoader =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P & IProps> =>
  ({ isLoading, ...props }: IProps) =>
    isLoading ? <Loader /> : <Component {...(props as P)} />;

export default withLoader;
