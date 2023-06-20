import { useState } from "react";
import { getPositionsFromServer } from "api";

export const usePositions = () => {
  const [positions, setPositions] = useState([]);

  const getPositions = async () => {
    try {
      const { positions } = await getPositionsFromServer();

      setPositions(positions);
    } catch (error) {
      console.error(error);
    }
  };

  return { positions, getPositions };
}
