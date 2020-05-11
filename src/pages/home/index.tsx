import React from 'react';
import { HomeModelState, ConnectRC, Loading, connect } from 'umi';

import { ENUMS } from '@/utils';
import GameStatusBar from './components/GameStatusBar';

interface PageProps {
  home: HomeModelState;
  loading: boolean;
}
const HomePage: ConnectRC<PageProps> = props => {
  const {
    home: { gameStatus },
    dispatch,
  } = props;
  const handleGameStatusChange = (status: ENUMS.GAME_STATUS) => {
    console.log(status);
    dispatch?.({ type: 'asd' });
  };
  return (
    <div>
      <GameStatusBar
        status={gameStatus}
        handleGameStatusChange={handleGameStatusChange}
      />
    </div>
  );
};

export default connect(
  ({ home, loading }: { home: HomeModelState; loading: Loading }) => ({
    home,
    loading: loading.models.home,
  }),
)(HomePage);
