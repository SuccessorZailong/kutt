import { Col, RowCenterH } from "./Layout"
import React, { useState } from "react";
import Text, { H1 } from "./Text";
import { Flex } from "reflexbox/styled-components";
import { useFormState } from "react-use-form-state";
import { TextInput } from "./Input";
import styled from "styled-components";
import Icon from "./Icon";
import { Colors } from "../consts";

const SubmitIconWrapper = styled.div`
  content: "";
  position: absolute;
  top: 0;
  right: 12px;
  width: 64px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover svg {
    fill: #673ab7;
  }
  @media only screen and (max-width: 448px) {
    right: 8px;
    width: 40px;
  }
`;

const MessageBox = styled.div`
  //width: 50vw;
  //height: 300px;
  padding: 20px 30px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #efefef;
  box-shadow:  20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
`;

interface Form {
  target: string;
  shortUrlNum: number;
  clicksNum: number;
}

const Inquire = () => {
  const [formState, { text }] = useFormState<Form>();
  const [loading, setLoading] = useState(false);


  return (
    <Col width={800} maxWidth="100%" px={[3]} flex="0 0 auto" mt={4} mb={4}>
      <RowCenterH mb={[4, 48]}>
        <H1 fontSize={[25, 27, 32]} light>
          Query your links.
        </H1>
      </RowCenterH>
      <Flex
        as="form"
        id="queryForm"
        width={1}
        alignItems="center"
        justifyContent="center"
        style={{ position: "relative" }}
      >
        <TextInput
          {...text("target")}
          placeholder="Paste query your long URL"
          placeholderSize={[16, 17, 18]}
          fontSize={[18, 20, 22]}
          aria-label="target"
          width={1}
          height={[58, 64, 72]}
          px={0}
          pr={[48, 84]}
          pl={[32, 40]}
          autoFocus
          data-lpignore
        />
        <SubmitIconWrapper role="button" aria-label="submit">
          <Icon
            name={loading ? "spinner" : "inquire"}
            size={[22, 26, 28]}
            fill={loading ? "none" : "#aaa"}
            stroke={loading ? Colors.Spinner : "none"}
            mb={1}
            mr={1}
          />
        </SubmitIconWrapper>
      </Flex>
      <Flex mt={5}>
        <MessageBox>
          <Col mb={[3, 0]} ml={[0, 24]}>
            <Text
              as="label"
              fontSize={[14, 15]}
              mb={2}
              bold
            >
              Short Url Num：
            </Text>

          </Col>
          <Col mb={[3, 0]} ml={[0, 24]}>
            <Text
              as="label"
              fontSize={[14, 15]}
              mb={2}
              bold
            >
              Clicks Num：
            </Text>
          </Col>
        </MessageBox>
      </Flex>
    </Col>
  );
};

export default Inquire;
