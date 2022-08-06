import { useDispatch, useSelector } from "react-redux";
import { Table, Input, Button, Popconfirm, Form, InputRef, InputNumber, Typography } from "antd";
import { FormInstance } from "antd/lib/form";
import { State } from "../../state";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string | number;
  yinsu: string;
  [index: number]: number | string;
}

interface Column {
  title: string,
  dataIndex: string | number,
  editable: boolean
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
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

const initialColumn = [
  {
    key: "yinsu",
    title: "因素",
    dataIndex: "yinsu",
    editable: false
  }
];

const EditableTable = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const finallyTags = useSelector((state: State) => state.finallyTags);
  const [columns, setColumns] = useState<Column[]>(initialColumn);
  const [data, setData] = useState<Item[]>([]);
  
  useEffect(() => {
    let newColumns: Column[] = [];
    let newDate: Item[] = [];

    finallyTags.forEach((value, index) => {
      let column: Column = {
        title: value,
        dataIndex: index,
        editable: true
      }
      let singleRow: Item = {
        key: value,
        yinsu: value,
        [value]: 1 
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
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={ false }
      />
    </Form>
  );
};

export default EditableTable;


// function ProportionTable() {
//   const initialColumn: Column[] = [
//     {
//       key: "yinsu",
//       title: "因素",
//       dataIndex: "yinsu",
//       editable: false
//     }
//   ];
//   const finallyTags = useSelector((state: State) => state.finallyTags);
//   const [columns, setColumns] = useState<Column[]>(initialColumn);
//   const [data, setData] = useState<Item[]>([]);

//   useEffect(() => {
//     let newColumns: Column[] = [];
//     let newDate: Item[] = [];

//     finallyTags.forEach((value, index) => {
//       let column: Column = {
//         key: index,
//         title: value,
//         dataIndex: index,
//         editable: true
//       }
//       let singleRow: Item = {
//         key: index,
//         yinsu: value,
//       }
      
//       newColumns.push(column);
//       newDate.push(singleRow);
//     })
    
//     setColumns([...initialColumn, ...newColumns]);
//     setData([...newDate]);
//     console.log('columns', [...initialColumn, ...newColumns])
//   }, [finallyTags]);
  
//   const mergedColumns = columns.map(col => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record: Item) => ({
//         record,
//         inputType: 'number',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editable: true,
//         // editing: isEditing(record),
//       }),
//     };
//   });


//   console.log('mergedColumns', mergedColumns);

//   return (
//       <Table<Item> 
//         components={{
//           body: {
//             row: EditableRow,
//             cell: EditableCell,
//           },
//         }}
//         rowClassName={() => "editable-row"}
//         columns={mergedColumns} 
//         dataSource={data}
//         pagination={ false }
//         bordered
//       />
//   );
// }

// export default ProportionTable;
