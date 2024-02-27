// src/stories/usePagination.stories.js
import usePagination from "../index";

export default {
  title: "Hooks/usePagination",
  component: usePagination,
  tags: ["autodocs"],
  argTypes: {
    boundary: {
      control: {
        type: "text",
        defaultValue: "...",
      },
      description: "Boundary text",
    },
    hiddenBoundary: {
      control: {
        type: "boolean",
        defaultValue: false,
      },
      description: "Hidden boundary",
    },
    modeInfinite: {
      control: {
        type: "boolean",
        defaultValue: false,
      },
      description: "Infinite mode",
    },
    initialPage: {
      control: {
        type: "number",
        defaultValue: 1,
      },

      description: "Initial page",
    },
  },
};

const Template = (args) => {
  const { boundary = "...", hiddenBoundary, modeInfinite, initialPage } = args;

  console.log(args);
  const { currentPage, handlePageChange, nextPage, prevPage, range } =
    usePagination({
      initialPage: initialPage,
      totalPages: 20,
      boundary,
      hiddenBoundary,
      modeInfinite,
    });

  return (
    <div>
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
};

export const Default = Template.bind({});
export const HiddenBoundary = Template.bind({}, { hiddenBoundary: true });
export const Infinite = Template.bind({}, { modeInfinite: true });
export const CustomBoundary = Template.bind({}, { boundary: "#" });
export const CustomInitialPage = Template.bind({}, { initialPage: 5 });
