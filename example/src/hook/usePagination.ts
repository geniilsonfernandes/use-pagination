import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  initialPage: number;
  boundary?: string;
  onPageChange?: (page: number) => void;
  modeInfinite?: boolean;
  hiddenBoundary?: boolean;
}

const usePagination = ({
  totalPages,
  initialPage,
  onPageChange,
  modeInfinite = false,
  boundary = "...",
}: PaginationProps) => {
  const sibling = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const calculateRange = () => {
    const range = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        range.push(i);
      }

      range.push(boundary);
      range.push(totalPages);
      return range;
    }

    if (currentPage >= totalPages - 2) {
      range.push(1);
      range.push(boundary);
      for (let i = 1; i <= 4; i++) {
        range.push(totalPages - 5 + i);
      }
      range.push(totalPages);

      return range;
    }

    if (totalPages <= sibling + 1) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      const leftBoundary = Math.min(
        Math.max(1, currentPage - sibling),
        totalPages - 4
      );
      const rightBoundary = Math.min(
        Math.max(5, currentPage + sibling),
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
      // Verifica se é possível avançar
      onPageChange?.(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      // Verifica se é possível voltar
      onPageChange?.(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const range = calculateRange();

  return {
    range,
    currentPage,
    handlePageChange,
    nextPage,
    prevPage,
  };
};

export default usePagination;
