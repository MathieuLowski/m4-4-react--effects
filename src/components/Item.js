import React from "react";
import styled from "styled-components";

const Item = (props) => {
  const { name, cost, value, numOwned, handleCLick } = props;
  return (
    <>
      <Wrapper onClick={handleCLick}>
        <Name>{name}</Name>
        <Div>
          <Price>Costs: {cost}</Price>
          <Value>Produces {value} cookie/sec</Value>
          <Possessing>{numOwned}</Possessing>
        </Div>
      </Wrapper>
    </>
  );
};

const Possessing = styled.div``;
const Div = styled.div`
  display: flex;
  font-size: 13px;
`;
const Wrapper = styled.button`
  margin: 15px;
  background: none;
  color: gray;
  border: none;
  cursor: pointer;
  :hover {
    border: solid 1px grey;
  }
`;
const Name = styled.div`
  font-size: 20px;
  color: white;
`;
const Price = styled.div`
  margin: 5px;
`;
const Value = styled.div`
  margin: 5px;
`;

export default Item;
