import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "./App.css";
import usePagination from "./hook/usePagination";

function App() {
  const { currentPage, handlePageChange, nextPage, prevPage, range } =
    usePagination({
      initialPage: 1,
      totalPages: 6,
    });
  const markdown = `
    # Use Pagination pull

    The usePagination hook is a custom hook to handle pagination in React
    applications.

    ## Usage

    import usePagination from "use-pagination";

    const { currentPage, handlePageChange, nextPage, prevPage, range } = usePagination({
      initialPage: 1,
      totalPages: 20,
    });

    ## Example

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

  `;
  return (
    <div className="container">
      <div className="header">
        <h1>Use Pagination pull</h1>
        <p>
          The usePagination hook is a custom hook to handle pagination in React
          applications.
        </p>
      </div>
      <div className="content">
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

        <div className="section">
          <h2>Installation</h2>
          <pre>
            <code>npm i use-pagination-pull</code>
          </pre>

          <Markdown
            className="markdown"
            remarkRehypeOptions={{ allowDangerousHtml: true }}
            rehypePlugins={[rehypeHighlight]}
          >
            {markdown}
          </Markdown>

          <h2>Props</h2>
          <ul>
            <li>
              <span className="prop">initialPage</span> (number): The initial
              page of pagination.
            </li>
            <li>
              <span className="prop">totalPages</span> (number): The total
              number of pages.
            </li>
            <li>
              <span className="prop">onPageChange</span> (function): A callback
              function called when the page is changed.
            </li>
            <li>
              <span className="prop">modeInfinite</span> (boolean): Defines if
              pagination should be infinite or limited.
            </li>
            <li>
              <span className="prop">hiddenBoundary</span> (boolean): Defines if
              page boundaries should be hidden.
            </li>
            <li>
              <span className="prop">boundary</span> (string): The character
              used to represent hidden boundaries.
            </li>
          </ul>
          <h2>Return</h2>
          <ul>
            <li>
              <span className="prop">currentPage</span> (number): The current
              page.
            </li>
            <li>
              <span className="prop">handlePageChange</span> (function):
              Function to change the current page.
            </li>
            <li>
              <span className="prop">nextPage</span> (function): Function to go
              to the next page.
            </li>
            <li>
              <span className="prop">prevPage</span> (function): Function to go
              to the previous page.
            </li>
            <li>
              <span className="prop">range</span> (array): Array containing the
              page numbers to be displayed.
            </li>
          </ul>
        </div>

        <footer className="footer">
          <div>
            <a
              href="https://github.com/geniilsonfernandes"
              target="_blank"
              rel="noreferrer"
              className="avatar"
            >
              <img
                className="footer__avatar"
                src="https://avatars.githubusercontent.com/u/77983928?v=4"
              />
              <div className="footer__info">
                <div className="footer__name">Geniilson Fernandes</div>
                <div className="footer__username">@geniilsonfernandes</div>
              </div>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
