import { Button, Input } from 'antd';
import React, { useCallback, useState } from 'react';

function Main() {
  const [elementCount, setelementCount] = useState(0);

  const generateElement = useCallback((event) => {
    setelementCount(event.target.value);
  }, [elementCount])

  return (
    <div>
      <Input.Group compact>
        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="至少需要1衡量指标噢"/>
        <Button type="primary" onClick={generateElement}>Submit</Button>
      </Input.Group>
      <p>{elementCount}</p>
    </div>
  );
}

export default Main;
