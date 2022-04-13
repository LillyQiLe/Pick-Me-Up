import { useDispatch, useSelector } from "react-redux";
import { Table, Input, Button, Popconfirm, Form, InputRef, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { State } from "../../state";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";

interface Item {
  key: number;
  yinsu: string;
  [index: number]: number | string;
}

interface Column {
  key: string | number,
  title: string,
  dataIndex: string | number,
  editable: boolean
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function ProportionTable() {
  const initialColumn: Column[] = [
    {
      key: "yinsu",
      title: "因素",
      dataIndex: "yinsu",
      editable: false
    }
  ];
  const finallyTags = useSelector((state: State) => state.finallyTags);
  const [columns, setColumns] = useState<Column[]>(initialColumn);
  const [data, setData] = useState<Item[]>([]);

  const [form] = useForm();


  useEffect(() => {
    let newColumns: Column[] = [];
    let newDate: Item[] = [];

    finallyTags.forEach((value, index) => {
      let column: Column = {
        key: index,
        title: value,
        dataIndex: index,
        editable: true
      }
      let singleRow: Item = {
        key: index,
        yinsu: value,
      }
      
      newColumns.push(column);
      newDate.push(singleRow);
    })
    
    setColumns([...initialColumn, ...newColumns]);
    setData([...newDate]);
    console.log('columns', [...initialColumn, ...newColumns])
  }, [finallyTags]);
  
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
        // editing: isEditing(record),
      }),
    };
  });

  console.log('mergedColumns', mergedColumns);

  return (
    <Form form={form} component={false}>
      <Table<Item> 
        components={{
          body: {
            cell: EditableCell
          }
        }}
        columns={mergedColumns} 
        dataSource={data}
        pagination={ false }
        bordered
      />
    </Form>
  );
}

export default ProportionTable;
