/*
 * @Author: ztachi(legendryztachi@gmail.com)
 * @Date: 2024-02-11 21:50:45
 * @LastEditors: ztachi(legendryztachi@gmail.com)
 * @LastEditTime: 2024-02-11 21:59:00
 * @Description:
 */
const walletList = Object.values(
  import.meta.glob('./**/index.js', {
    eager: true,
    import: 'default',
  })
);

const walletObj = {};
walletList.forEach((wallet) => {
  walletObj[wallet.type] = wallet;
});

export { walletObj };
export default walletList;
