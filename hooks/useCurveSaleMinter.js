import { useContractRead, useNetwork } from 'wagmi';
import { useState } from 'react';
import { formatEther } from 'viem';

import { CURVE_SALE_MINTER_CONTRACTS } from '@/utils/constants';
import CURVE_SALE_MINTER_ABI from '../abi/CurveSaleMinter.json';
import PRICE_CURVE from '../data/priceCurveDroids.json';

export function useCurveSaleMinter() {
  const { chain } = useNetwork();

  const [gazersRemaining, setGazersRemaining] = useState(0);
  const [nextPrice, setNextPrice] = useState(0);

  const { data: price } = useContractRead({
    address: CURVE_SALE_MINTER_CONTRACTS[chain.id],
    abi: CURVE_SALE_MINTER_ABI,
    functionName: 'p',
    cacheOnBlock: true,
    onSuccess: (data) => {
      getNextPrice(Number(data));
    }
  });

  const getNextPrice = (_nextPrice) => {
    let nextPrice = _nextPrice
      ? parseFloat(formatEther(_nextPrice))
      : parseFloat(BigInt('0').toString());

    setNextPrice(nextPrice);
  };

  // returns the current index in this curveminter
  const { data: currentIndex } = useContractRead({
    address: CURVE_SALE_MINTER_CONTRACTS[chain.id],
    abi: CURVE_SALE_MINTER_ABI,
    functionName: 'currentIndex',
    cacheOnBlock: true,
    onSuccess: (data) => {
      getGazersRemainingAtThisPrice(Number(data));
    }
  });

  // how many remain at this price ?
  const getGazersRemainingAtThisPrice = (index) => {
    if (!index || index > PRICE_CURVE.length) return { data: null };
    let iterator = index;
    while (
      iterator <= PRICE_CURVE.length &&
      PRICE_CURVE[iterator] === PRICE_CURVE[index]
    ) {
      iterator++;
    }

    setGazersRemaining(iterator - index + 1);
  };

  return { gazersRemaining, nextPrice };
}
