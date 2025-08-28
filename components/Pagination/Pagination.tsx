"use client"

import ReactPaginate from "react-paginate";
import css from "@/components/Pagination/Pagination.module.css"

interface PaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (currentPage: number) => void;
}

const Pagination = ({
    pageCount, currentPage, onPageChange,
}: PaginationProps) => {
    if (pageCount <= 1) return null;
    
    return (
        <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            forcePage={currentPage - 1}
            onPageChange={({ selected }) => onPageChange(selected + 1)}
            containerClassName={css.pagination}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
        />
    )
}

export default Pagination