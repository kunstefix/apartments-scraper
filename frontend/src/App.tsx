import useFetch from "./hooks/useFetch";

interface MyData {
  // Define your data structure here
}

function App() {
  const url = "http://localhost:3030/all-listings"
  const { data, loading, error } = useFetch<MyData>(
    url
  );
  
  const elements = [1,2,3 ,4, 5, 6, 7, 8, 9, 10]
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-white shadow-md">
        <div className="container mx-4 py-4">
          <h1 className="text-2xl font-semibold">Apartments</h1>
        </div>
      </header>

      {JSON.stringify(data, null, 2)}
      {/* Body Content */}
      <div className="container px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Grid Elements */}
          {elements.map(e => (
            <div key={e} className="bg-white rounded-lg shadow-md p-4 hover:bg-purple-100">
              <img
                src="https://d18-a.sdn.cz/d_18/c_img_QL_J8/RHEmJW.jpeg?fl=res,749,562,3|wrm,/watermark/sreality.png,10|shr,,20|jpg,90"
                alt="Element 1"
                className="w-full h-auto"
              />
              <p className="mt-2 text-lg font-semibold">Element {e} Text</p>
            </div>))}


          {/* Repeat similar code for other grid elements */}
        </div>
      </div>
    </div>
  );
}
export default App