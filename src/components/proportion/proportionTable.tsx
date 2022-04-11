import { Space, Table, Tag } from "antd";
import Column from "antd/lib/table/Column";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../state";


function ProportionTable() {
  const dispatch = useDispatch();
  const finallyTags = useSelector((state: State) => state.finallyTags);

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Table dataSource={dataSource} columns={columns}/>
  );
}

export default ProportionTable;