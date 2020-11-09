import styled from "styled-components";

export const StyledCell = styled.div`
  width: auto;
  margin: 0.5px;
  background: rgba(${(props) => props.color}, 0.8);
  border: ${(props) => (props.type === 0 ? "0px solid" : "4px solid")};
  border-bottom-color: rgba(${(props) => props.color}, 0.2);
  border-left-color: rgba(${(props) => props.color}, 0.2);
  border-top-color: rgba(${(props) => props.color}, 1);
  border-right-color: rgba(${(props) => props.color}, 0.5);
`;
