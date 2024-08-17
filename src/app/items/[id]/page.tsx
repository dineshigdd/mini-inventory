import * as actions from '@/actions/index';
import Link from 'next/link';

interface ItemDetailsPageProps{
    params:{
        id: string;
    }   
}


export default async function ItemDetailsPage( props: ItemDetailsPageProps ){

    const item = await actions.fetchInventoryItem( parseInt(props.params.id ));
    const category=  await actions.fetchCategory( item?.category_code! );

    const action = actions.deleteInventoryItem.bind(null, parseInt(props.params.id ));

    return(
        <div className="grid place-items-center min-h-screen bg-blue-100"> 
         <div>
                <div className='leading-10'>
                    <h2><strong>Item Details</strong></h2>                   
                    <p>Item Name: { item?.name}</p>
                    <p>Category: { category?.name }</p>
                    <p>Quantity Available: { item?.quantity_in_hand }</p>
                    <p>The Date Stocked: { new Date( item?.date! ).toLocaleDateString('en-US')}</p>
                </div>  

                <div className="flex justify-between mt-5">  
                    <form action={ action }>         
                        <button   className="bg-red-400 w-fit px-5 py-2 rounded-full">
                            Delete Item
                        </button>               
                    </form>     
                        <Link href={ `/items/${ item?.id }/edit`}   type="submit" className="bg-lime-500 w-fit px-5 py-2 rounded-full">
                            Edit Item
                        </Link>
                </div>
            </div>
        </div>
        
        )
}