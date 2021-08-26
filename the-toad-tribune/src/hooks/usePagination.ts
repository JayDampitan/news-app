import { useState } from "react";

/**
 * Creates a pageNumber state with functions that handles the
 * pagination.
 * @returns {[onNextButton,onPrevButton,pageNumber,startBeginning,startEnd]} An array that contains onNextButton function,
 * onPrevButton function, pageNumber state, startBeginning
 * function, startEnd function.
 */
const usePagination = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const onNextButton = () => setPageNumber((prevIndex) => prevIndex + 1);

  const onPrevButton = () => setPageNumber((prevIndex) => prevIndex - 1);

  const startBeginning = () => setPageNumber(0);

  const startEnd = (endIndex: number) => setPageNumber(endIndex);

  return [
    onNextButton,
    onPrevButton,
    pageNumber,
    startBeginning,
    startEnd,
  ] as const;
};

export default usePagination;
