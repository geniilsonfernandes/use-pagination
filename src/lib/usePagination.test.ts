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

    expect(result.current.range).toEqual([1, 2, 3, 4, 5, "...", 10]);
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
  it("should change page correctly when totalPages is 2", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 2,
        initialPage: 1,
      })
    );

    expect(result.current.range).toEqual([1, 2]);
  });
  it("should change page correctly when totalPages is 4", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 4,
        initialPage: 1,
      })
    );

    expect(result.current.range).toEqual([1, 2, 3, 4]);
  });

  it("should call onPageChange correctly", () => {
    const onPageChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 1,
        onPageChange,
      })
    );

    act(() => {
      result.current.nextPage();
    });

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should set initial page to be 5 and render correctly range", () => {
    const onPageChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 5,
        onPageChange,
      })
    );

    expect(result.current.range).toEqual([1, "...", 4, 5, 6, "...", 10]);
  });
  it("should render custom boundary", () => {
    const onPageChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 5,
        onPageChange,
        boundary: "#",
      })
    );

    expect(result.current.range).toEqual([1, "#", 4, 5, 6, "#", 10]);
  });

  it("should handle boundary correctly", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 10,
        initialPage: 1,
        boundary: "...",
      })
    );

    expect(result.current.range).toEqual([1, 2, 3, 4, 5, "...", 10]);

    act(() => {
      result.current.handlePageChange(9);
    });

    expect(result.current.range).toEqual([1, "...", 6, 7, 8, 9, 10]);
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

    expect(result.current.range).toEqual([1, 2, 3, 4, 10]);

    act(() => {
      result.current.handlePageChange(9);
    });

    expect(result.current.range).toEqual([1, 7, 8, 9, 10]);
  });
  it("should set initial page to be 10", () => {
    const { result } = renderHook(() =>
      usePagination({
        totalPages: 100,
        initialPage: 10,
        boundary: "...",
        hiddenBoundary: true,
      })
    );

    expect(result.current.currentPage).toBe(10);

    expect(result.current.range).toEqual([1, 9, 10, 11, 100]);
  });
});
