import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen bg-blue-100"> {/** <div className="flex items-center justify-center min-h-screen"> */}
        <div>
          <div><h2>Mini Inventory control system</h2></div>
      
        <div className="w-[25rem] ">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="font-bold">New Order</div>
                   <ul className="h-40 overflow-auto bg-slate-100 p-2">
                      <li>Jelly Roll</li>
                      <li>Concha</li>
                      <li>Croissant</li>
                  </ul>                 
                </div>
                <div>
                  <div className="font-bold">Available Items</div>
                  <ul className="h-40 overflow-auto bg-slate-100 p-2">
                      <li>Jelly Roll</li>
                      <li>Concha</li>
                      <li>Crissant</li>
                      <li>Hot dogs</li>
                      <li>Corn dogs</li>
                      <li>Jelly Roll</li>
                      <li>Concha</li>
                      <li>Crissant</li>
                      <li>Hot dogs</li>
                      <li>Corn dogs</li>                      
                  </ul>                
                </div>
              </div>

              <div className="flex flex-col justify-center mt-5">
                  <div className="flex justify-between">
                      <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Covert to Image</button>
                      <Link  href="/items/new" className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full">New Item</Link>                     
                  </div >
                  <div className="flex justify-between">
                      <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Send order</button>
                      <button className="bg-lime-500 w-fit m-2 px-5 py-2 rounded-full" type="button">Edit</button>
                  </div>
                  </div>
              <div className="mt-5">
                <div className="font-bold">Previous order</div>
                  <ul className="h-40 overflow-auto bg-slate-100 p-2">
                    <li>Jelly Roll</li>
                    <li>Concha</li>
                    <li>Croissant</li>
                    <li>Jelly Roll</li>
                    <li>Concha</li>
                    <li>Croissant</li>     
                    <li>Jelly Roll</li>
                    <li>Concha</li>                                
                  </ul>
              </div>
        </div>
      </div>
  </div>
  );
}
