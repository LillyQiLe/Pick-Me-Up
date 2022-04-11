import React, { useCallback, useRef, useState } from "react";
import { Button, Row, Col, Input, Table, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import { PlusOutlined } from '@ant-design/icons';
import ProportionTable from "./proportionTable";

function Proportion() {
  const dispatch = useDispatch();
  const {setFinallyTags} = bindActionCreators(actionCreators, dispatch);
  const finallyTags = useSelector((state: State) => state.finallyTags);

  const handleSetFinallyTags = () => {
    setFinallyTags(tags);
    console.log(finallyTags);
    // console.log(tags)
  }

  const [tags, setTags] = useState<Array<string>>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const saveInputRef = useRef(null);
 
  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    setTags(newTags);
  }

  const showInput = () => {
    setInputVisible(true);
    // todo: inputfocus
    // saveInputRef && saveInputRef.current.focus();
  }

  const handleInputChange = (e: { target: { value: any; }; }) => {
    setInputValue(e.target.value);
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }
    console.log(tags);
    setInputVisible(false);
    setInputValue('');
  }

  const handleEditInputChange = (e: { target: { value: any; }; }) => {
    setEditInputValue(e.target.value);
  }

  const handleEditInputConfirm = () => {
    setTags([...tags, editInputValue]);
    setEditInputIndex(-1);
    setEditInputValue('');
  }

  const saveEditInputRef = (input: any) => {
    // this.editInput = input;
    let editInput = input;
  }

  return (
    <>
      <Row>
        <Col span={18}>
          <Row style={{ margin: "20px 0", fontSize: "1.2rem" }}>
            <Col span={14} offset={2}>
              你在意哪些因素呢？
            </Col>
          </Row>
          <Row gutter={8} style={{ padding: "0 0 20px 0" }}>
            <Col span={18} offset={2}>
              {tags.map((tag, index) => {
                if (editInputIndex === index) {
                  return (
                    <Input
                      ref={saveEditInputRef}
                      key={tag}
                      size="small"
                      className="tag-input"
                      value={editInputValue}
                      onChange={handleEditInputChange}
                      onBlur={handleEditInputConfirm}
                      onPressEnter={handleEditInputConfirm}
                    />
                  );
                }

                const isLongTag = tag.length > 20;

                const tagElem = (
                  <Tag
                    className="edit-tag"
                    key={tag}
                    closable={true}
                    onClose={() => handleClose(tag)}
                    color="blue"
                  >
                    <span>
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible && (
                <Input
                  ref={saveInputRef}
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
                  <PlusOutlined /> 新标签
                </Tag>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={2}>
              <Button onClick={handleSetFinallyTags} style={{ margin: "0 0 20px 0"}}>确定</Button>
            </Col>
          </Row>
          <Row>
            <Col span={21} offset={2}>
              <ProportionTable/>
            </Col>
          </Row>
        </Col>
        <Col span={6} style={{ padding: "20px 0 0 0" }}>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
          <Tag color="orange">orange</Tag>
          <Tag color="gold">gold</Tag>
          <Tag color="lime">lime</Tag>
          <Tag color="green">green</Tag>
          <Tag color="cyan">cyan</Tag>
          <Tag color="blue">blue</Tag>
          <Tag color="geekblue">geekblue</Tag>
          <Tag color="purple">purple</Tag>
        </Col>
      </Row>
    </>
  );
}

export default Proportion;
