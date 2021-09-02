import React from 'react';
import NumberFormat from 'react-number-format';




interface INumberFormat {
  value?: string | number | null;
  suffix?: string;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
}

function Number(props: INumberFormat) {
  const { ...rest } = props;

  return (
    <NumberFormat
      displayType={'text'}
      defaultValue={0}
      thousandSeparator={true}
      {...rest}
    />
  );
}

export default Number;
