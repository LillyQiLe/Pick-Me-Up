import React, { useCallback, useRef, useState } from "react";
import { Button, Layout, Row, Col, Input, Table, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

type TagState = {
  tags: Array<string>;
  inputVisible: boolean;
  inputValue: string;
  editInputIndex: number;
  editInputValue: string;
};

function Proportion() {
  const [state, setState] = useState<TagState>({
    tags: [],
    inputVisible: false,
    inputValue: "",
    editInputIndex: -1,
    editInputValue: "",
  });

  const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = state;

  const handleClose = useCallback(
    (removedTag) => {
      const tags = state.tags.filter((tag) => tag !== removedTag);
      console.log(tags);
      setState({ ...state, tags: tags });
    },
    [state]
  );

  const showInput = useCallback(() => {
    setState({ ...state, inputVisible: true });
    // , () => this.input.focus()
  }, [state]);

  const handleInputChange = useCallback(
    (e) => {
      setState({ ...state, inputValue: e.target.value });
    },
    [state]
  );

  const handleInputConfirm = useCallback(() => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setState({
      ...state,
      tags,
      inputVisible: false,
      inputValue: "",
    });
  }, [state]);

  const handleEditInputChange = useCallback(
    (e) => {
      setState({ ...state, editInputValue: e.target.value });
    },
    [state]
  );

  const handleEditInputConfirm = useCallback(() => {
    setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        ...state,
        tags: newTags,
        editInputIndex: -1,
        editInputValue: "",
      };
    });
  }, [state]);

  const saveInputRef = useCallback((input) => {
    input = input;
  }, [state]);

  const saveEditInputRef = useCallback((input) => {
    // this.editInput = input;
    let editInput = input;
  }, [state]);



  return (
    <>
      <Row>
        <Col span={18}>
          <Row style={{ padding: "20px 0", fontSize: "1.2rem" }}>
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
                    closable={index !== 0}
                    onClose={() => handleClose(tag)}
                  >
                    <span
                      onDoubleClick={(e) => {
                        if (index !== 0) {
                          setState(
                            { ...state, editInputIndex: index, editInputValue: tag },
                          );
                          e.preventDefault();
                        }
                      }}
                    >
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
                  <PlusOutlined /> New Tag
                </Tag>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={2}>
              <Button>确定</Button>
            </Col>
          </Row>
          <Row>
            <Col span={21} offset={2}>
              <Table></Table>
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
