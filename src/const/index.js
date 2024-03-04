/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-21 20:09:14
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-03-04 17:48:15
 * @Description:
 */
//以太坊主网id
export const ETHEREUM_MAINNET_CHAIN_ID = 1;
//以太币单位
export const ETHEREUM_UNITS = 'ETH';
//定时器
//获取余额
export const GET_BALANCE_INTERVAL = 10 * 1000;
//获取GAS fee
export const GET_GAS_PRICE_INTERVAL = 5 * 1000;
//合约地址集合（按照组件顺序排列）
export const CONTRACT_ADDRESS_LIST = [
  [
    { address: '0x72d2c88009E508F6d86d063a172C4f5fda4DB7F8', chainId: 11155111 },
    { address: '0xA6961033B2EF6403a3e80227348b15c0C7b52094', chainId: 5 },
  ],
  [{ address: '0x79d30CfEAb7EF6b4f6e6849CdfAE10212a198E69', chainId: 11155111 }],
];
//API集合
export const ABI_GATHER = [
  {
    addressList: [
      '0x72d2c88009E508F6d86d063a172C4f5fda4DB7F8',
      '0xA6961033B2EF6403a3e80227348b15c0C7b52094',
    ],
    abi: [
      {
        inputs: [],
        name: 'getName',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_name',
            type: 'string',
          },
        ],
        name: 'setName',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
  {
    addressList: ['0x79d30CfEAb7EF6b4f6e6849CdfAE10212a198E69'],
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'comments',
        outputs: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'comment',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getComments',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'addr',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'comment',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
              },
            ],
            internalType: 'struct Comment.User[]',
            name: '',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
        ],
        name: 'sendComment',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
  },
];

export default ETHEREUM_MAINNET_CHAIN_ID;
