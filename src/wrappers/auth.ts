import { useModel, Redirect } from 'umi';

// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteProps, RouteComponentProps } from 'react-router';

const AuthWrapper = (props: RouteProps & RouteComponentProps) => {
  const { initialState, loading } = useModel('@@initialState');
  if (loading) return null;
  // 登陆成功
  if (initialState?.is_valid) {
    return props.children;
  }
  // 未登陆成功
  return new Redirect({ to: '/login' });
};

export default AuthWrapper;
