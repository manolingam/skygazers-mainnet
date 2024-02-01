import { BigNumber } from 'ethers';

import priceCurveDroids from '../data/priceCurveDroids.json';

export const getAccountString = (account) => {
  const len = account.length;
  return `0x${account.substr(2, 2).toUpperCase()}...${account
    .substr(len - 2, len - 1)
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

export const formatHoursBefore = (dateString) => {
  // Parse the input date string
  const date = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = currentDate - date;

  // Convert the difference to days and remaining hours
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  // Construct the result string
  let result = '';

  if (daysDifference > 0) {
    result += `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'}`;
    if (hoursDifference > 0) {
      result += ` ${hoursDifference} ${
        hoursDifference === 1 ? 'hour' : 'hours'
      }`;
    }
  } else if (hoursDifference > 0) {
    result += `${hoursDifference} ${
      hoursDifference === 1 ? 'hour' : 'hours'
    } before`;
  } else {
    result = 'now';
  }

  return result;
};
