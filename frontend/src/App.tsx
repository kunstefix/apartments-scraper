import { useState } from "react";
import Pagination from "./components/Pagination";
import useFetchProperties from "./hooks/useFetchProperties";
import ListingCard from "./components/ListingCard";

interface PropertyListing {
  items: {
    id: number;
    title: string;
    locality: string;
    media: string
  }[],
  allItemsCount: number,
  currentPage: number,
  itemsPerPage: number
}

function App() {
  const PAGE_SIZE = 16;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useFetchProperties<PropertyListing>(
    currentPage,
    PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white shadow-lg z-10">
        <div className="container mx-4 py-4">
          <h1 className="text-2xl font-semibold">Apartments</h1>
        </div>
      </header>

      {/* Body Content */}
      <div className="container px-4 mt-8 h-full pb-20">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {/* Grid Elements */}
          {data?.items.map(({ id, title, media, locality }, index) => <ListingCard
            key={id} id={id} title={title} media={media} locality={locality} index={index} />)}
          {!data?.items.length && "Sorry, no data"}
        </div>
      </div>
      <footer className="fixed bottom-0 bg-white shadow-md mt-2 w-full border-black border-t-2 " >
        <div className="container mx-4 py-4 flex justify-center">
          <Pagination
            totalCount={data?.allItemsCount || 100}
            currentPage={currentPage}
            pageSize={PAGE_SIZE}
            onPageChange={setCurrentPage} />
        </div>
      </footer>
    </div>
  );
}
export default App