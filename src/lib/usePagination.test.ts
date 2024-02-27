import { act, renderHook } from "@testing-library/react";
import usePagination from "./usePagination";

describe("usePagination", () => {
  it("should return the correct initial state", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 1,
        boundary: "...",
      })
    );

    expect(result.current.range).toEqual([1, 2, 3, "...", 10]);
  });

  it("should change page correctly", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 1,
      })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.handlePageChange(5);
    });

    expect(result.current.currentPage).toBe(5);
  });

  it("should handle boundary correctly", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 1,
        boundary: "...",
      })
    );

    expect(result.current.range).toEqual([1, 2, 3, "...", 10]);

    act(() => {
      result.current.handlePageChange(9);
    });

    expect(result.current.range).toEqual([1, "...", 8, 9, 10]);
  });

  it("should handle modeInfinite correctly", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 1,
        modeInfinite: true,
      })
    );

    expect(result.current.range).toEqual([1, 2, 3, 4, 5]);

    act(() => {
      result.current.handlePageChange(5);
    });

    expect(result.current.range).toEqual([1, "...", 4, 5, 6]);
  });

  it("should handle hiddenBoundary correctly", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 1,
        boundary: "...",
        hiddenBoundary: true,
      })
    );

    expect(result.current.range).toEqual([1, 2, 3, 10]);

    act(() => {
      result.current.handlePageChange(9);
    });

    expect(result.current.range).toEqual([1, 8, 9, 10]);
  });
});
