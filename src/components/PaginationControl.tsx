import React from "react";
import { ButtonGroup, Button } from "@material-ui/core";

interface PaginationControlProps {
  page: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
  className: string;
}

const PaginationControl = (props: PaginationControlProps) => {
  const { pageCount, page, onPageChange, className } = props;

  const getPageNumber = () => {
    const pageNumber: string[] = [];

    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumber.push(i.toString());
      }
      return pageNumber;
    }

    let temp1 = page <= 5 ? [1, 2, 3, 4, 5, 6] : [1, 2];
    const temp2 = page > 5 && page < pageCount - 4 ? [page - 1, page, page === pageCount ? page : page + 1] : [];
    const temp3 =
      page >= pageCount - 4
        ? [pageCount - 5, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
        : [pageCount - 1, pageCount];

    let last = 0;
    [...temp1, ...temp2, ...temp3].forEach((page) => {
      if (page === last + 1) {
        pageNumber.push(page.toString());
        last = page;
      } else if (page > last + 1) {
        pageNumber.push("...");
        pageNumber.push(page.toString());
        last = page;
      }
    });

    return pageNumber;
  };

  return (
    <ButtonGroup className={className} size="small" aria-label="small outlined button group">
      {page > 1 && <Button onClick={() => onPageChange(page - 1)}>{"<"}</Button>}
      {getPageNumber().map((pageNumber) => {
        if (pageNumber === "...") {
          return <Button disabled>...</Button>;
        } else if (pageNumber === props.page.toString()) {
          return (
            <Button color="primary" variant="contained">
              {pageNumber}
            </Button>
          );
        } else {
          return <Button onClick={() => onPageChange(+pageNumber)}>{pageNumber}</Button>;
        }
      })}
      {page < pageCount && <Button onClick={() => onPageChange(page + 1)}>{">"}</Button>}
    </ButtonGroup>
  );
};

export default PaginationControl;
