import { useContractRead } from 'wagmi';
import { useState } from 'react';
import { utils, ethers } from 'ethers';

import { CURVE_SALE_MINTER_CONTRACT } from '@/utils/constants';
import CURVE_SALE_MINTER_ABI from '../abi/CurveSaleMinter.json';
import PRICE_CURVE from '../data/priceCurveDroids.json';

export function useCurveSaleMinter() {
  const [gazersRemaining, setGazersRemaining] = useState(0);
  const [nextPrice, setNextPrice] = useState(0);

  const {} = useContractRead({
    address: CURVE_SALE_MINTER_CONTRACT,
    abi: CURVE_SALE_MINTER_ABI,
    functionName: 'p',
    cacheOnBlock: true,
    onSuccess: (p) => {
      const data = p
        ? parseFloat(utils.formatEther(p))
        : parseFloat(ethers.BigNumber.from('0').toString());
      setNextPrice(data);
    }
  });

  // returns the current index in this curveminter
  const { data: currentIndex } = useContractRead({
    address: CURVE_SALE_MINTER_CONTRACT,
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

  return { gazersRemaining, nextPrice, currentIndex };
}
