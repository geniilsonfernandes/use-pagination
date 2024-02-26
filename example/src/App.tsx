import "./App.css";
import usePagination from "./hook/usePagination";

function App() {
  const { currentPage, handlePageChange, range, nextPage, prevPage } =
    usePagination({
      initialPage: 1,
      totalPages: 10,
      hiddenBoundary: true,
    });

  return (
    <div>
      <p>Current Page: {currentPage}</p>
      <div>
        <button onClick={prevPage}>Previous</button>
        {range.map((page, i) => {
          if (typeof page === "string") return <button key={i}>...</button>;
          else
            return (
              <button
                key={i}
                className={currentPage === page ? "active-page" : ""}
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
