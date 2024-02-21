import Icon from '@ant-design/icons';

import metamask from '@/assets/icons/metamask.svg?react';
import blockChain from '@/assets/icons/blockChain.svg?react';
import smartContract from '@/assets/icons/smartContract.svg?react';

export const MetaMaskIcon = (props) => <Icon component={metamask} {...props} />;
export const BlockChainIcon = (props) => <Icon component={blockChain} {...props} />;
export const SmartContractIcon = (props) => <Icon component={smartContract} {...props} />;

export default MetaMaskIcon;
