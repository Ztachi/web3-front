import { Card, Button, Col } from 'antd';

import FloatButtonList from '@/components/floatButtonList';

const gameList = [
  {
    title: 'phaser game demo',
    description: 'a demo of phaser game',
    url: 'https://game.demo.bearstudio.games',
  },
  {
    title: 'Metal Max Remake',
    description: 'A RPG game remake of Metal Max',
    url: 'https://game.mmr.bearstudio.games',
  },
];

const Games = () => (
  <div className="h-screen flex justify-center items-center">
    {gameList.map((game) => (
      <Col
        span={6}
        key={game.url}
        className="mr-[20px] transition-transform  hover:scale-125 hover:relative hover:z-10"
      >
        <Card>
          <Card.Meta title={game.title} description={game.description} />
          <div className="text-center mt-10">
            <Button type="primary" target="_blank" href={game.url}>
              Play
            </Button>
          </div>
        </Card>
      </Col>
    ))}
    <FloatButtonList />
  </div>
);
export default Games;
