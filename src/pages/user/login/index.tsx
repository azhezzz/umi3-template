import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserModelState, ConnectRC, Loading, connect, useModel } from 'umi';
import Icon, { ImgStore } from '@/components/Icon';

import styles from './styles.less';

const { Title, Text } = Typography;

interface PageProps {
  user: UserModelState;
  loading: boolean;
}

const LoginPage: ConnectRC<PageProps> = ({ dispatch }) => {
  const { refresh } = useModel('@@initialState');
  const onFinish = (values: any): void => {
    dispatch &&
      dispatch({
        type: 'user/login',
        payload: { loginForm: values, refreshInitState: refresh },
      });
  };
  return (
    <div className={styles.loginContainer}>
      <div>
        <Title className={styles.title}>赛事管理</Title>
        <Text className={styles.subTitle}>最专业的游戏数据平台</Text>
        <Form
          name="normal_login"
          initialValues={{
            username: 'cwz',
            password: 'cwz123456',
          }}
          onFinish={onFinish}
          size="large"
          className={styles.loginForm}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              className={styles.input}
              prefix={
                <Icon component={ImgStore.Username} className={styles.icon} />
              }
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              className={styles.input}
              prefix={
                <Icon component={ImgStore.Lock} className={styles.icon} />
              }
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={styles.submitButton}
            >
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    user,
    loading: loading.models.user,
  }),
)(LoginPage);
