import { useDispatch, useSelector } from "react-redux";
import { Table, Input, Button, Popconfirm, Form, InputRef, InputNumber } from "antd";
import { FormInstance } from "antd/lib/form";
import { State } from "../../state";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";
const EditableContext = React.createContext<FormInstance<any> | null>(null);

// 每一行数据格式
interface Item {
  key: number;
  yinsu: string;
  [index: number]: number | string;
}

// 每一行的组件
interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


// 表格单元组件相关
interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  yinsu: string;
  [index: number]: number | string;
}

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

interface Column {
  key: string | number,
  title: string,
  dataIndex: string | number,
  editable: boolean
}


//TODO
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
        editable: true,
        // editing: isEditing(record),
      }),
    };
  });


  console.log('mergedColumns', mergedColumns);

  return (
      <Table<Item> 
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => "editable-row"}
        columns={mergedColumns} 
        dataSource={data}
        pagination={ false }
        bordered
      />
  );
}

export default ProportionTable;
