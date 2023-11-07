import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import styled from "styled-components";

const layout = [
  { i: "Japan", x: 0, y: 0, w: 1, h: 1 },
  { i: "Vietnam", x: 1, y: 0, w: 1, h: 1 },
  { i: "Jeju", x: 2, y: 0, w: 1, h: 1 },
  { i: "+", x: 3, y: 0, w: 1, h: 1 },
];

const GridItemWrapper = styled.div`
  background: #f5f5f5;
  cursor: pointer; /* 커서 모양을 포인터로 변경하여 클릭 가능한 요소임을 표시 */
  border: 2px solid ${(props) => (props.selected ? "#0099a4" : "transparent")};
`;

const GridItemContent = styled.div`
  padding: 8px;
`;

const Root = styled.div`
  padding: 16px;
`;

const GridComponent = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    if (selectedItem === item) {
      // 이미 선택된 상태에서 더블클릭하면 해당 URL로 이동
      window.location.href = `/${item}`;
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <Root>
      <GridLayout layout={layout} cols={4} rowHeight={100} width={1000}>
        {layout.map((item) => (
          <GridItemWrapper
            key={item.i}
            onClick={() => handleItemClick(item.i)}
            onDoubleClick={() => handleItemClick(item.i)} // 더블클릭 시에 해당 url로 넘어감
            style={{
              border:
                selectedItem === item.i
                  ? "2px solid #0099a4"
                  : "2px solid gray",
            }} //테두리 효과 주지말까
          >
            <GridItemContent>{item.i}</GridItemContent>
          </GridItemWrapper>
        ))}
      </GridLayout>
    </Root>
  );
};

export default GridComponent;
