import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getKeywords, getChainByNameOrChain, setKeywords } from '@/store/modules/chain';

import { Button, Card, Descriptions, Popover, Pagination, Input, Empty } from 'antd';

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
  //当前页展示数据
  const currentPageDataList = filterList.slice(currentPageStart, currentPageStart + pageSize);
  //是否有数据
  const hasData = currentPageDataList.length > 0;

  //推出的时候清空搜索
  useEffect(() => () => dispatch(setKeywords('')), [dispatch]);

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
        containerClassName: ` auto-rows-min right-[8px] ${hasData ? 'grid grid-cols-5 2xl:grid-cols-6 gap-[10px] 2xl:gap-[20px]' : 'flex justify-center items-center'}`,
      }}
    >
      {hasData ? (
        currentPageDataList.map(({ name, chainId, networkId, icon }) => (
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
        ))
      ) : (
        <Empty />
      )}
    </SecondLevelPage>
  );
};

export default ChainSearch;
