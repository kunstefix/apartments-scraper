import { useMemo } from 'react'

interface PaginationProps {
  onPageChange: (page: number) => void
  totalCount: number
  currentPage: number
  pageSize: number
  siblingCount?: number
  className?: string
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = ''
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]
  const isFirstPageSelected = currentPage === 1
  const isLastPageSelected = currentPage === lastPage
  return (
    <nav className={`flex w-fit align-middle ${className}`}>
      <button
        disabled={isFirstPageSelected}
        onClick={onPrevious}
        aria-label="Previous"
        className={!isFirstPageSelected ? `transition-opacity duration-200 hover:opacity-60` : ''}
      >
        <div className={`mr-6 flex ${isFirstPageSelected ? 'text-neutral-500' : 'text-black'}`}>
         {"<"}
          <span className="hidden sm:inline ml-1">Previous</span>
        </div>
      </button>
      <div className="flex space-x-2">
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <div key={`dots-${i}`} className="h-7 w-7 text-center	">
                ...
              </div>
            )
          }

          return (
            <button
              key={pageNumber}
              disabled={pageNumber === currentPage}
              className={`h-7 w-7 rounded-full ${
                pageNumber === currentPage ? 'bg-neutral-50' : 'transition-colors duration-200 hover:bg-neutral-100'
              } `}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button
        disabled={isLastPageSelected}
        onClick={onNext}
        aria-label="Next"
        className={!isLastPageSelected ? `transition-opacity duration-200 hover:opacity-60` : ''}
      >
        <div className={`ml-6 flex ${isLastPageSelected ? 'text-neutral-500' : 'text-black'}`}>
          <span className="hidden sm:inline mr-1">Next</span>
          {">"}
        </div>
      </button>
    </nav>
  )
}

interface PaginationOptions {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

const DOTS = '...'
const range = (start: number, end: number): number[] => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}
const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: PaginationOptions): (string | number)[] => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    /*
      We do not want to show dots if there is only one position left
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 1
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange as (string | number)[]
}

export default Pagination
