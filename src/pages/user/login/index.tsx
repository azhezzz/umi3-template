import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserModelState, ConnectRC, Loading, connect } from 'umi';

import styles from './styles.less';

interface PageProps {
  user: UserModelState;
  loading: boolean;
}

const LoginPage: ConnectRC<PageProps> = ({ dispatch }) => {
  const onFinish: (value: any) => void = values => {
    if (dispatch) {
      dispatch({ type: 'user/login', payload: values });
    }
  };
  return (
    <div className={styles.loginContainer}>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    user,
    loading: loading.models.user,
  }),
)(LoginPage);
