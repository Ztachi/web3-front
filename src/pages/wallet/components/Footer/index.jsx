import { Button } from 'antd';

const LinkList = [
  {
    label: 'Chain Search',
    url: '/tools',
  },
  {
    label: 'Useweb3',
    url: 'https://www.useweb3.xyz/',
  },
  {
    label: 'Infura',
    url: 'https://app.infura.io/',
  },
  {
    label: 'PoW Faucets',
    url: 'https://faucets.pk910.de/',
  },
  {
    label: 'IPFS',
    url: 'https://ipfs.tech/',
  },
  {
    label: 'Web3js',
    url: 'https://docs.web3js.org/',
  },
  {
    label: 'Ethersjs',
    url: 'https://docs.ethers.org/',
  },
  {
    label: 'Solidity Lang',
    url: 'https://docs.soliditylang.org/',
  },
  {
    label: 'Solidity by Example',
    url: 'https://solidity-by-example.org/',
  },
  {
    label: 'Truffle Suite',
    url: 'https://trufflesuite.com/',
  },
  {
    label: 'Remix',
    url: 'https://remix.ethereum.org/',
  },
];

const Footer = () => (
  <div className="bg-white rounded-lg p-[10px] leading-[30px]">
    {LinkList.map(({ label, url }) => (
      <Button
        title={`jump to ${label}`}
        key={url}
        type="link"
        href={url}
        target={url.charAt(0) === '/' ? '_self' : '_blank'}
      >
        {label}
      </Button>
    ))}
  </div>
);

export default Footer;
