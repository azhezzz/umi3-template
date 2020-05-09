import React, { FC } from 'react';
import { Layout } from 'antd';

import Header from './header';
import styles from './styles.less';

const { Content } = Layout;

const MainLayout: FC = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Content className={styles.content}>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
