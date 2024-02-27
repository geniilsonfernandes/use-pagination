import usePagination from "../../src/index";
import "./App.css";

function App() {
  const { currentPage, handlePageChange, nextPage, prevPage, range } =
    usePagination({
      initialPage: 1,
      totalPages: 20,
    });

  return (
    <div>
      <h4 className="title">Default Pagination</h4>
      <p> </p>
      <div className="pagination">
        <button onClick={prevPage}>Previous</button>
        {range.map((page, i) => {
          if (typeof page === "string") {
            return (
              <span key={i} className="page">
                {page}
              </span>
            );
          }
          return (
            <button
              key={i}
              className={page === currentPage ? "page active" : "page"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
