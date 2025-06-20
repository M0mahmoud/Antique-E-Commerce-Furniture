import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ShopPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ShopPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}
        {/* Page numbers logic */}
        {(() => {
          const pages = [];
          let start = Math.max(1, currentPage - 2);
          let end = Math.min(totalPages, currentPage + 2);
          if (currentPage <= 3) {
            start = 1;
            end = Math.min(5, totalPages);
          } else if (currentPage >= totalPages - 2) {
            start = Math.max(1, totalPages - 4);
            end = totalPages;
          }
          if (start > 1) {
            pages.push(
              <PaginationItem key={1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(1);
                  }}
                  isActive={currentPage === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            );
            if (start > 2) {
              pages.push(<PaginationEllipsis key="start-ellipsis" />);
            }
          }
          for (let i = start; i <= end; i++) {
            pages.push(
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(i);
                  }}
                  isActive={currentPage === i}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (end < totalPages) {
            if (end < totalPages - 1) {
              pages.push(<PaginationEllipsis key="end-ellipsis" />);
            }
            pages.push(
              <PaginationItem key={totalPages}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(totalPages);
                  }}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return pages;
        })()}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ShopPagination;
