import FilterSearch from "../components/FilterSearch";
import Pagination from "../components/Paginatation";

function Users() {
  return (
    <div className="h-screen overflow-hidden flex mt-20 justify-center">
      <section className="container px-4 mx-auto">
     
        <FilterSearch />


        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                     
                    
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300"
                      >
                        Full Name
                      </th>
                    
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300"
                      >
                        Gender
                      </th>
                      <th
                        scope="col"
                        className="px-8 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300"
                      >
                        Domain
                      </th>
                    
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-300"
                      >
                       Status
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-700">
                    
                    <tr>
                    <td className="px-8 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-100">Vikas kashyap</h2>
                       
                        </div>
                      </td>
                    
                      <td className="px-8 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-100">Male</h2>
                       
                        </div>
                      </td>
                    
                    
                     <td className="px-8 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-100">Google</h2>
                       
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="inline py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 ">
                          Customer
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-800">
                          Edit
                        </button>
                      </td>
                    </tr>
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

       
        <Pagination />
      </section>
    </div>
  );
}

export default Users;
