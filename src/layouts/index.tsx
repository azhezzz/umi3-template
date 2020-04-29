import React, { FC } from 'react';
import { history, useModel } from 'umi';
import { Layout, Button } from 'antd';
import styels from './styles.less';

const { Header, Content } = Layout;

const MainLayout: FC = ({ children }) => {
  const { refresh } = useModel('@@initialState');
  const exit = async () => {
    // eslint-disable-next-line no-unused-expressions
    globalThis?.localStorage.clear();
    await refresh();
    history.push('/');
  };
  return (
    <Layout className={styels.layout}>
      <Header>
        <Button type="primary" onClick={exit}>
          退出
        </Button>
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
