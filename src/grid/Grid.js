import React, { useRef, useEffect } from "react";
import styled from "styled-components";

export default function Grid(props) {
  const gridRef = useRef(null);
  const { children } = props;

  useEffect(() => {
    const grid = gridRef.current;
    adjustGridItemsHeight(grid);
  });

  return <GridWrapper ref={gridRef}>{children}</GridWrapper>;
}

// This function adjust each item in the grid accordlying
// with their height.
// Each item has to have an inner container, used to calculate
// its overflow. Check GridItem component for an example.
const adjustGridItemsHeight = (grid) => {
  const items = grid.children;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    let rowSpan = Math.ceil(
      (item.firstChild.getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }
};

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: 180px;

  /* display: flex;
  flex-wrap: wrap;
  gap: 15px; */
`;
