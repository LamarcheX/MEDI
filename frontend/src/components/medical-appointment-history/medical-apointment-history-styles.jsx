import styled from "styled-components";
import { Input } from "../UI/input.styles";

export const Capsule = styled.div`
  background-color: #f4f4f4;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.02);
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const CapsuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CapsuleText = styled.span`
  flex: 1;
  text-align: left;
`;

export const Table = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export const TableRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const TableLabel = styled.div`
  font-weight: bold;
  color: #555;
  text-align: left;
  font-size: 14px; /* Reduce el tamaño del texto */
  padding: 5px; /* Agrega un poco de espacio entre las celdas */
`;

export const TableValue = styled.div`
  color: #333;
  text-align: left;
  font-size: 13px; /* Reduce el tamaño del texto */
  padding: 5px; /* Agrega un poco de espacio entre las celdas */
`;

export const TableTitle = styled.h3`
  font-size: 14px; /* Reduce el tamaño del título */
  margin-bottom: 10px;
  color: #333;
  text-align: left;
`;

export const InputField = styled(Input)`
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
export const TableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

export const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Dropdown = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;

  label {
    font-size: 14px;
    font-weight: 500;
    margin-right: 8px;
    color: #333;
  }

  select {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
    color: #333;
    outline: none;
    cursor: pointer;

    &:hover {
      border-color: #888;
    }

    &:focus {
      border-color: #0056b3;
      box-shadow: 0 0 4px rgba(0, 86, 179, 0.3);
    }
  }
`;
