import React from 'react';
import Number4 from './Number4';




interface INumberFormat {
  value?: string | number | null;
}

function Number4Eth(props: INumberFormat) {
  const { ...rest } = props;

  return (
    <Number4
      suffix={' ETH'}
      {...rest}
    />
  );
}

export default Number4Eth;
