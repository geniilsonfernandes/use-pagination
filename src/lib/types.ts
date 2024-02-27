export interface PaginationProps {
    totalPages: number;
    initialPage: number;
    boundary?: string;
    onPageChange?: (page: number) => void;
    modeInfinite?: boolean;
    hiddenBoundary?: boolean;
  }
  
export type Range = number | string;
  