import type { NextApiRequest, NextApiResponse } from "next";
import { fetchInventoryItems } from "@/actions";

export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    try{
        const inventory = await fetchInventoryItems();
        res.status(200).json(inventory)
    } catch( error ){
        res.status( 500 ).json({ error: "Failed to fetch inventory"});
    }  
}