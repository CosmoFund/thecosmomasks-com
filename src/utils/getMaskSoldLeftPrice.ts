const level1 = 3000;
const level2 = 7000;
const level3 = 11000;
const level4 = 15000;
const level5 = 16000;
const level6 = 16381;
const level7 = 16400;
const level8 = 16407;
const level9 = 16409;
const level10 = 16410;


export default function getMaskSoldLeftPrice(
  maskTotalSupply: number
): { price: number, sold: number, left: number, } {
  let price = 0;
  let sold = 0;
  let left = 0;

  if (maskTotalSupply === level10) {
    price = 0;
    sold = 0;
    left = 0;

  } else if (maskTotalSupply >= level9) {
    price = 1000000;
    sold = maskTotalSupply - level9;
    left = level10 - maskTotalSupply;

  } else if (maskTotalSupply >= level8) {
    price = 100000;
    sold = maskTotalSupply - level8;
    left = level9 - maskTotalSupply;

  } else if (maskTotalSupply >= level7) {
    price = 10000;
    sold = maskTotalSupply - level7;
    left = level8 - maskTotalSupply;

  } else if (maskTotalSupply >= level6) {
    price = 1000;
    sold = maskTotalSupply - level6;
    left = level7 - maskTotalSupply;

  } else if (maskTotalSupply >= level5) {
    price = 100;
    sold = maskTotalSupply - level5;
    left = level6 - maskTotalSupply;

  } else if (maskTotalSupply >= level4) {
    price = 17;
    sold = maskTotalSupply - level4;
    left = level5 - maskTotalSupply;

  } else if (maskTotalSupply >= level3) {
    price = 9;
    sold = maskTotalSupply - level3;
    left = level4 - maskTotalSupply;

  } else if (maskTotalSupply >= level2) {
    price = 5;
    sold = maskTotalSupply - level2;
    left = level3 - maskTotalSupply;

  } else if (maskTotalSupply >= level1) {
    price = 3;
    sold = maskTotalSupply - level1;
    left = level2 - maskTotalSupply;

  } else {
    price = 1;
    sold = maskTotalSupply - 0;
    left = level1 - maskTotalSupply;
  }

  return { price, sold, left, };
}
