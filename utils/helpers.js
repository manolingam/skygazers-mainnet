import { BigNumber, utils } from 'ethers';

import priceCurveDroids from '../data/priceCurveDroids.json';

export const getAccountString = (account) => {
  const len = account.length;
  return `0x${account.substr(2, 3).toUpperCase()}...${account
    .substr(len - 3, len - 1)
    .toUpperCase()}`;
};

export const getPrices = (currentIndex, amount) => {
  let total = BigNumber.from(0);
  let itemPrices = [];
  for (let i = currentIndex; i < currentIndex + amount; i++) {
    const nftPrice = BigNumber.from(priceCurveDroids[i]);
    total = total.add(nftPrice);

    itemPrices.push(nftPrice);
  }

  return { total, itemPrices };
};
