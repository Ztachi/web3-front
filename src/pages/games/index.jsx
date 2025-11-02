import { Card, Button } from 'antd';

import FloatButtonList from '@/components/floatButtonList';

const gameList = [
  {
    title: 'phaser game demo',
    description: 'a demo of phaser game',
    url: 'https://game.demo.ztachi.com',
  },
  {
    title: 'Metal Max Remake',
    description: 'A RPG game remake of Metal Max',
    url: 'https://game.mmr.ztachi.com',
  },
];

const Games = () => (
  <div className="h-screen flex justify-center items-center">
    {gameList.map((game) => (
      <Card key={game.url}>
        <Card.Meta title={game.title} description={game.description} />
        <div className="text-center mt-10">
          <Button type="primary" target="_blank" href={game.url}>
            Play
          </Button>
        </div>
      </Card>
    ))}
    <FloatButtonList />
  </div>
);
export default Games;
