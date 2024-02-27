import { PaginationProps } from "./types";
import usePagination from "./usePagination";

interface RenderPaginationProps extends PaginationProps {}
const RenderPagination = ({
  initialPage,
  totalPages,
  boundary,
  hiddenBoundary,
  modeInfinite,
  onPageChange,
}: RenderPaginationProps) => {
  const { currentPage, handlePageChange, nextPage, prevPage, range } =
    usePagination({
      initialPage: initialPage || 1,
      totalPages,
      boundary,
      hiddenBoundary,
      modeInfinite,
      onPageChange,
    });

  const classPrefix = "use-pagination";

  const classnames = {
    pagination: `${classPrefix}-pagination`,
    page: `${classPrefix}-page`,
    boundary: `${classPrefix}-page--boundary`,
    active: `${classPrefix}-page--active`,
    navigationButton: `${classPrefix}-page--navigation-button`,
    navigationButtonDisabled: `${classPrefix}-page--navigation-button-disabled`,
  };
  return (
    <div>
      <button
        onClick={() => prevPage()}
        disabled={currentPage === 1}
        className={[
          classnames.navigationButton,
          currentPage === 1 ? classnames.navigationButtonDisabled : "",
        ].join(" ")}
      >
        Previous
      </button>
      {range.map((page, i) => {
        if (typeof page === "string") {
          return (
            <div className={classnames.boundary} key={i}>
              {page}
            </div>
          );
        }
        return (
          <button
            className={[
              classnames.page,
              page === currentPage ? classnames.active : "",
            ].join(" ")}
            key={i}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => nextPage()}
        disabled={currentPage === totalPages}
        className={[
          classnames.navigationButton,
          currentPage === 1 ? classnames.navigationButtonDisabled : "",
        ].join(" ")}
      >
        Next
      </button>
    </div>
  );
};

export default RenderPagination;
