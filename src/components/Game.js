import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPusrchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  const handleSpaceBar = (key) => {
    if (key.code === "Space") {
      setNumCookies(numCookies + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpaceBar);
    return () => {
      window.removeEventListener("keydown", handleSpaceBar);
    };
  });

  const calculateCookiesPerTick = (purchasedItems) => {
    let cookiesPerTick = 0;
    items.forEach(
      (item) => (cookiesPerTick += purchasedItems[item.id] * item.value)
    );
    return cookiesPerTick;
  };
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const handleCookiBtn = () => {
    setNumCookies(numCookies + 1);
  };

  const handleCLick = (items) => {
    if (numCookies >= items.cost) {
      setNumCookies(numCookies - items.cost);
      setPusrchasedItems({
        ...purchasedItems,
        [items.id]: purchasedItems[items.id] + 1,
      });
    } else {
      window.alert(`You are missing some cookies for that item`);
    }
  };

  useEffect(() => {
    document.title = `${numCookies} cookies - Cookie Clicker Workshop`;
    return () => {
      document.title = `Cookie Clicker Workshop`;
    };
  }, [numCookies]);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>
        <Button onClick={handleCookiBtn}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={purchasedItems[item.id]}
              handleCLick={() => handleCLick(item)}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
