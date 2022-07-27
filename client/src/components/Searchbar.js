import {useState} from 'react'

export default function Searchbar() {
  const [fname, setfname] = useState("your result will appear here");
  const [name, setname] = useState();
  
  const handleClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search/${name}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      var data = JSON.stringify(result);
      var as = JSON.parse(data);
      setfname(as[0].name);
    } catch (err) {
      setfname("Not found in database");
    } 
  };

    return (
      <div>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          </div>
          <input
            onChange={(e) => setname(e.target.value)}
            type="text"
            name="searchitem"
            id="searchitem"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="search"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
          <span className="sm:ml-3">
          <button onClick={(e)=>{handleClick()}}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </span>
          </div>
        </div>
       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
       <div className="px-4 py-5 sm:px-6">
         <h3 className="text-lg leading-6 font-medium text-gray-900">Search Result</h3>
       </div>
       <div className="border-t border-gray-200">
         <dl>
           <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
             <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{fname}</dd>
           </div>
         </dl>
     </div>
     </div>
     </div>
    )
  }