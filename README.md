<div align="center">
  <img  src="./banner.png">
</div>

<h2 align="center">use Hook Pagination pull | Hook </h1>

[![npm](https://img.shields.io/npm/v/use-pagination-pull.svg?style=flat-square)](https://www.npmjs.com/package/use-pagination-pull)

<p align="center">
    The usePagination hook is a custom hook to handle pagination in React applications.
    With it, you can generate a pagination sequence and navigate between pages.
   
</p>

 <h2 align="center" id="stacks-utilizadas">Documentation storybook</h2>

<p align="center">
    <a  style="text-align: center; font-weight: bold; font-size: 18px" href="https://65de0e043d606805aeba4797--glowing-alfajores-c9ed2e.netlify.app/?path=/docs/hooks-usepagination--docs">
    storybook
 </a>
</p>

 <h2 align="center" id="stacks-utilizadas">Stacks</h2>
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,ts,react,figma,jest" />
  </a>
</p>

## Using hook

```typescript
const { currentPage, handlePageChange, nextPage, prevPage, range } =
  usePagination({
    initialPage: 1,
    totalPages: 20,
  });

// output;
// range => [1, '...', 3, 4, 5, '...', 20]

 handlePageChange(3)

// currentPage => 3
// range => [1, '...', 2, 3, 4, '...', 20]

```

## Example in React component

```typescript
import usePagination from "use-pagination";

const { currentPage, handlePageChange, nextPage, prevPage, range } =
  usePagination({
    initialPage: 1,
    totalPages: 20,
  });

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
</div>;
```



## Props | hook usePagination

| Props          | Type   | Description               |
| -------------- | ------ | ------------------------- |
| totalPages     | number | The total number of pages |
| initialPage    | number | The initial page          |
| boundary       | string | The boundary              |
| onPageChange   | func   | The callback function     |
| modeInfinite   | bool   | The infinite mode         |
| hiddenBoundary | bool   | The hidden boundary       |

## Packages Status [85% 🔃]

This is a hook created with Rollup.

[![npm](https://img.shields.io/npm/v/use-pagination-pull.svg?style=flat-square)](https://www.npmjs.com/package/use-pagination-pull)

## Changelog and Roadmap


- [x] Documentation
- [x] Testing
- [x] Initial release

## Development

To get running locally:

```
npm install
npm run storybook

# or

npm run dev
```

## Testing

```
npm run test
```

## Contributing

Please see our [contributing guide](https://github.com/geniilsonfernandes/use-pagination/blob/main/CONTRIBUTING.md)

## License

MIT License
