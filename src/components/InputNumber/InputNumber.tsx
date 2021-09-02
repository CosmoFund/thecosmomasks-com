import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import './InputNumber.scss';



interface Props {
  onChangeAmount: any;
}

const InputNumber: React.FC<Props> = ({ onChangeAmount }) => {
  const [value, setValue] = useState(0);

  const handleInc = () => {
    setValue(value + 1);
    onChangeAmount(value + 1);
  }

  const handleDec = () => {
    setValue(value > 0 ? value - 1 : 0);
    onChangeAmount(value > 0 ? value - 1 : 0);
  }

  const onChange = (e: any) => {
    setValue(+e.target.value);
    onChangeAmount(+e.target.value);
  }

  return (
    <div className='number-wrapper'>
      <button className='up' onClick={handleInc}>
        <Icon name='caret up' />
      </button>
      <Input
        type='number'
        size='small'
        value={value}
        min={0}
        onChange={onChange}
      />
      <button className='down' onClick={handleDec}>
        <Icon name='caret down' />
      </button>
    </div>
  );
};

export default InputNumber;
