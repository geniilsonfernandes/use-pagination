import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  initialPage: number;
  boundary?: string;
  onPageChange?: (page: number) => void;
  modeInfinite?: boolean;
  hiddenBoundary?: boolean;
}

type Range = number | string;

const usePagination = ({
  totalPages,
  initialPage = 1,
  onPageChange,
  modeInfinite = false,
  hiddenBoundary = false,
  boundary = "...",
}: PaginationProps) => {
  const siblings = 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  const createRange = (start: number, end: number) => {
    const range: Range[] = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const calculateRange = () => {
    const range: Range[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }

      return range;
    }


    if (modeInfinite) {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          range.push(i);
        }
      }

      if (currentPage > 3) {
        range.push(1);

        range.push(boundary);
        range.push(currentPage - 1);
        range.push(currentPage);
        range.push(currentPage + 1);
      }

      return range;
    }

    const initialSiblings = hiddenBoundary ? 4 : 5;
    const initialLimit = hiddenBoundary ? 3 : 4;

    const endLimit = hiddenBoundary ? 1 : 2;
    const startEnd = hiddenBoundary ? 4 : 5;
    const endSiblings = totalPages - endLimit;

    if (currentPage <= initialLimit) {
      range.push(...createRange(1, initialSiblings));
      range.push(boundary);
      range.push(totalPages);
      return range;
    }

    if (currentPage >= endSiblings) {
      range.push(1);
      range.push(boundary);
      for (let i = 1; i <= startEnd - 1; i++) {
        range.push(totalPages - startEnd + i);
      }
      range.push(totalPages);
      return range;
    }

    if (totalPages <= endSiblings) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      const leftBoundary = Math.min(
        Math.max(1, currentPage - siblings),
        totalPages - 3
      );
      const rightBoundary = Math.min(
        Math.max(5, currentPage + siblings),
        totalPages
      );

      if (leftBoundary > 1) {
        range.push(1);
        if (leftBoundary > 2) {
          range.push(boundary);
        }
      }

      for (let i = leftBoundary; i <= rightBoundary; i++) {
        range.push(i);
      }
      if (rightBoundary < totalPages) {
        if (rightBoundary < totalPages - 1) {
          range.push(boundary);
        }
        range.push(totalPages);
      }
    }
    return range;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page as number);
  };

  const nextPage = () => {
    if (modeInfinite) {
      onPageChange?.(currentPage + 1);
      setCurrentPage(currentPage + 1);
      return;
    }
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const range = calculateRange();

  function removeBoundary(range: Range[]) {
    return range.filter((item) => item !== boundary);
  }

  return {
    range: hiddenBoundary ? removeBoundary(range) : range,

    currentPage,
    handlePageChange,
    nextPage,
    prevPage,
  };
};

export default usePagination;
