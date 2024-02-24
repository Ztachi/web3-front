import Icon from '@ant-design/icons';

import metamask from '@/assets/icons/metamask.svg?react';
import blockChain from '@/assets/icons/blockChain.svg?react';
import blockChain1 from '@/assets/icons/blockChain1.svg?react';
import smartContract from '@/assets/icons/smartContract.svg?react';
import loading from '@/assets/icons/loading.svg?react';

export const MetaMaskIcon = (props) => <Icon component={metamask} {...props} />;
export const BlockChainIcon = (props) => <Icon component={blockChain} {...props} />;
export const BlockChainIcon1 = (props) => <Icon component={blockChain1} {...props} />;
export const SmartContractIcon = (props) => <Icon component={smartContract} {...props} />;
export const Loading = (props) => <Icon component={loading} {...props} />;

export default MetaMaskIcon;
