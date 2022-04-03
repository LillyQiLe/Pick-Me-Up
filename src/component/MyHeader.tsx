import { Steps, Divider } from 'antd';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
const { Step } = Steps;

function MyHeader() {
  const [current, setCurrent] = useState(0);

  const onChange = useCallback(() => {
    setCurrent(current+1);
  }, [current])

  return (
    <>
      <Steps current={current} onChange={onChange}>
        <Step title="Step 1" description="This is a description." />
        <Step title="Step 2" description="This is a description." />
        <Step title="Step 3" description="This is a description." />
      </Steps>

      <Divider />
    </>
  );
}

export default MyHeader;