import React, { FC } from 'react';
import { history, useModel } from 'umi';
import { Layout, Button, Badge } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

import styles from './styles.less';

const Header: FC = () => {
  const { refresh } = useModel('@@initialState');
  const exit = async () => {
    // eslint-disable-next-line no-unused-expressions
    globalThis?.localStorage.clear();
    await refresh();
    history.push('/login');
  };
  return (
    <Layout.Header className={styles.headerBar}>
      <div className={styles.headerEmptySub} />
      <div className={styles.headerMain}>pro</div>
      <div className={styles.headerSub}>
        <Badge count={2}>
          <BulbOutlined style={{ fontSize: 30 }} />
        </Badge>
        <Button
          type="default"
          onClick={exit}
          ghost
          shape="round"
          className={styles.exitButton}
        >
          退出
        </Button>
      </div>
    </Layout.Header>
  );
};

export default Header;
