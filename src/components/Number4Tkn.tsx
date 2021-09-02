import React from 'react';
import Number4 from './Number4';




interface INumberFormat {
  value?: string | number | null;
}

function Number4Tkn(props: INumberFormat) {
  const { ...rest } = props;

  return (
    <Number4
      suffix={' CMP'}
      {...rest}
    />
  );
}

export default Number4Tkn;
