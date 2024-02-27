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
      <p>Current Page: {currentPage}</p>
      <div className="pagination">
        <button onClick={prevPage}>Previous</button>
        {range.map((page, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            className={page === currentPage ? "page active" : "page"}
          >
            {page}
          </button>
        ))}
        <button onClick={nextPage}>Next</button>
      </div>
      <button onClick={() => handlePageChange(3)}>Go to page 3</button>
    </div>
  );
}

export default App;
