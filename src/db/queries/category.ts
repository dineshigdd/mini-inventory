import type { Inventory } from "@prisma/client";
import { db } from '@/db';


export function fetchInventoryItems(){
    return db.inventory.findMany();
}