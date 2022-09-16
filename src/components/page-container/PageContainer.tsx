import './page-container.css';

import { FC } from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => (
  <div className="page-container">{children}</div>
);

export default PageContainer;
