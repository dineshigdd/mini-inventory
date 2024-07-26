export default function ItemCreatePage(){
    return(
     <form className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="font-bold m-3">Add a new Item</h2>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label className="w-15" htmlFor="item">Item Name</label>
                <input 
                    name="itemName"
                    className="border rounded p-2 w-full"
                    id="itemName"
                />
            </div>       

            <div className="flex gap-4">
                <label className="w-15" htmlFor="category">Category</label>
                <select className="border rounded p-2 w-full" name="category" id="category">
                    <option value="bakery">Bakery</option>
                    <option value="hotfood">Hot Food</option>
                    <option value="coldcoffee">Cold offee</option>
                </select>      
            </div>     
            
            <div className="flex gap-4 justify-end">
                <button type="submit" className="bg-lime-500 w-fit px-5 py-2 rounded-full">
                    Add Item
                </button>
            </div>
            
        </div>
    </form>
    );
}