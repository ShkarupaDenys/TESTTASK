import { useState } from 'react';
import { getPositionsFromServer } from 'api';

export const usePositions = () => {
  const [positions, setPositions] = useState([]);

  const getPositions = async () => {
    try {
      const { positions: dataPositions } = await getPositionsFromServer();

      setPositions(dataPositions);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return { positions, getPositions };
};
