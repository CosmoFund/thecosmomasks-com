import React from 'react';
import Number from './Number';




interface INumberFormat {
  value?: string | number | null;
  suffix?: string;
  prefix?: string;
}

function Number0(props: INumberFormat) {
  const { ...rest } = props;

  return (
    <Number
      decimalScale={0}
      fixedDecimalScale={true}
      {...rest}
    />
  );
}

export default Number0;
