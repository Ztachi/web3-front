import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getKeywords, getChainByNameOrChain, setKeywords } from '@/store/modules/chain';

import { Button, Card, Descriptions, Popover, Pagination, Input } from 'antd';

import style from './index.module.scss';

import SecondLevelPage from '@/components/layout/secondLevelPage';

const { Meta } = Card;
const { Search } = Input;

//分页数量
const pageSize = 48;

const ChainSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //关键词搜索
  const keywords = useSelector(getKeywords);
  //筛选出来的列表
  const filterList = useSelector((state) => getChainByNameOrChain(state, keywords));
  //第几页
  const [pageNumber, setPageNumber] = useState(1);
  //总页数
  const currentPageStart = (pageNumber - 1) * pageSize;
  const total = filterList.length;

  return (
    <SecondLevelPage
      headers={
        <>
          <Search
            className="w-[400px] mr-[20px]"
            placeholder="search by name or chainId"
            allowClear
            enterButton="Search"
            defaultValue={keywords}
            onSearch={(text) => {
              dispatch(setKeywords(text));
              setPageNumber(1);
            }}
          />
          <Pagination
            simple
            total={total}
            pageSize={pageSize}
            onChange={setPageNumber}
            current={pageNumber}
            showSizeChanger={false}
          />
        </>
      }
      options={{
        containerClassName:
          'grid grid-cols-5 2xl:grid-cols-6 gap-[10px] 2xl:gap-[20px] auto-rows-min right-[8px]',
      }}
    >
      {filterList
        .slice(currentPageStart, currentPageStart + pageSize)
        .map(({ name, chainId, networkId, icon }) => (
          <Card
            key={chainId}
            className={style['ant-card-background']}
            style={
              icon && {
                backgroundImage: `url("https://icons.llamao.fi/icons/chains/rsz_${icon}.jpg")`,
              }
            }
          >
            <Meta
              title={
                <Popover title={name}>
                  <Button
                    type="link"
                    className="cursor-pointer pl-0"
                    onClick={() => {
                      navigate(`${chainId}`);
                    }}
                  >
                    {name}
                  </Button>
                </Popover>
              }
              description={
                <Descriptions
                  items={[
                    { label: 'Chain ID', children: chainId, span: 3 },
                    { label: 'network ID', children: networkId, span: 3 },
                  ]}
                />
              }
            />
          </Card>
        ))}
    </SecondLevelPage>
  );
};

export default ChainSearch;
