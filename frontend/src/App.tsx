import Pagination from "./components/Pagination";
import useFetch from "./hooks/useFetch";

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
  const url = "http://localhost:3000/paginated-listings?page=1&perPage=10"
  const { data } = useFetch<PropertyListing>(
    url
  );

  
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white shadow-md">
        <div className="container mx-4 py-4">
          <h1 className="text-2xl font-semibold">Apartments</h1>
        </div>
      </header>

      {/* Body Content */}
      <div className="container px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Grid Elements */}
          {data?.items.map( ({id, title, media, locality}) => (
            <div key={id} className="bg-white rounded-lg shadow-md p-4 hover:bg-purple-100">
              <img
                src={media}
                alt="Element 1"
                className="w-full h-auto"
              />
              <p className="mt-2 text-lg font-semibold">{title}</p>
              <p className="mt-2 text-lg font-semibold">{locality}</p>
            </div>))}


          {/* Repeat similar code for other grid elements */}
        </div>
      </div>
      <footer className="sticky bottom-0 bg-white shadow-md">
        <div className="container mx-4 py-4 flex justify-center">
          <Pagination totalCount={100}  currentPage={1} pageSize={10} onPageChange={() => {}} />
        </div>
      </footer>
    </div>
  );
}
export default App