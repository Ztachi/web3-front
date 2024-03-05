/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-21 20:09:14
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-03-05 20:16:03
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
  [{ address: '0xa3A901aCB0689C4f85B691E5Fb34C4FA6162d0da', chainId: 11155111 }],
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
  {
    addressList: ['0xa3A901aCB0689C4f85B691E5Fb34C4FA6162d0da'],
    abi: [
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'accountAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Deposit',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        name: 'ErrorEvent',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'accountAddress',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Withdraw',
        type: 'event',
      },
      {
        stateMutability: 'nonpayable',
        type: 'fallback',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
        ],
        name: 'addAdministrator',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'checkIsAdministrator',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'checkIsGod',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: 'dataBase',
        outputs: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'adminAddress',
            type: 'address',
          },
        ],
        name: 'deleteAdministrator',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
        ],
        name: 'destroyingAccount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getAdministratorList',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getBalance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
        ],
        name: 'getUser',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'balance',
                type: 'uint256',
              },
              {
                components: [
                  {
                    internalType: 'uint256',
                    name: 'timestamp',
                    type: 'uint256',
                  },
                  {
                    internalType: 'string',
                    name: 'category',
                    type: 'string',
                  },
                  {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                  },
                ],
                internalType: 'struct Bank.TransactionInfo[]',
                name: 'transactionLog',
                type: 'tuple[]',
              },
            ],
            internalType: 'struct Bank.UserInfo',
            name: '',
            type: 'tuple',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getUserList',
        outputs: [
          {
            internalType: 'address[]',
            name: '',
            type: 'address[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'withdrawAll',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        stateMutability: 'payable',
        type: 'receive',
      },
    ],
  },
];

export default ETHEREUM_MAINNET_CHAIN_ID;
