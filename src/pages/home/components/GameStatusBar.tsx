import React, { memo } from 'react';
import { Button, Space } from 'antd';

import { ENUMS } from '@/utils';

const gameStatusOptions = [
  {
    key: ENUMS.GAME_STATUS.ONGOING,
    text: '进行中',
  },
  {
    key: ENUMS.GAME_STATUS.UPCOMING,
    text: '即将开始',
  },
  {
    key: ENUMS.GAME_STATUS.DONE,
    text: '已经结束',
  },
  {
    key: ENUMS.GAME_STATUS.ALL,
    text: '全部',
  },
];

interface Props {
  status: ENUMS.GAME_STATUS;
  handleGameStatusChange: (status: ENUMS.GAME_STATUS) => void;
}

export default memo((props: Props) => {
  console.log(props);
  const onGameStatusChange = (status: ENUMS.GAME_STATUS) => () => {
    console.log(status);
    props.handleGameStatusChange(status);
  };
  return (
    <div>
      <Space>
        {gameStatusOptions.map(item => (
          <Button
            key={item.key}
            type="primary"
            onClick={onGameStatusChange(item.key)}
          >
            {item.text}
          </Button>
        ))}
      </Space>
    </div>
  );
});
