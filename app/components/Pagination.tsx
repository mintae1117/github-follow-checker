"use client";

import styled from "styled-components";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useGithubStore } from "../store/useGithubStore";

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  background: ${(props) => (props.$active ? "#3b82f6" : "var(--card-bg)")};
  border: 1px solid ${(props) => (props.$active ? "#3b82f6" : "var(--border-color)")};
  border-radius: 8px;
  color: ${(props) => (props.$active ? "white" : "var(--text-primary)")};
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: #3b82f6;
    background: ${(props) => (props.$active ? "#3b82f6" : "var(--hover-bg)")};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  color: var(--text-secondary);
  font-size: 14px;
  padding: 0 8px;
`;

const Ellipsis = styled.span`
  color: var(--text-secondary);
  padding: 0 4px;
`;

export default function Pagination() {
  const currentPage = useGithubStore((state) => state.currentPage);
  const setCurrentPage = useGithubStore((state) => state.setCurrentPage);
  const getTotalPages = useGithubStore((state) => state.getTotalPages);

  const totalPages = getTotalPages();

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoChevronBack size={18} />
      </PageButton>

      {pageNumbers.map((page, index) =>
        page === "ellipsis" ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <PageButton
            key={page}
            $active={currentPage === page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageButton>
        )
      )}

      <PageButton
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoChevronForward size={18} />
      </PageButton>

      <PageInfo>
        {currentPage} / {totalPages}
      </PageInfo>
    </PaginationContainer>
  );
}
