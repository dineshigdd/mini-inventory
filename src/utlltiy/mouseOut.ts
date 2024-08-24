import { MouseEvent } from "react";



interface MouseOutProps {    
    itemId:number;
    listRef: React.RefObject<(HTMLLIElement | null)[]>;
    selectedIndex: (number | null);
    isItemselected: boolean;
    
  }


export const handleMouseOut = ({
    itemId,
    listRef,
    selectedIndex,
    isItemselected, 

}: MouseOutProps)=> (event: MouseEvent<HTMLLIElement>)=> {

    const item = listRef.current ? listRef.current[ itemId ] : null;
      
  
    if( itemId && item?.style && !isItemselected ) {
          item.style.backgroundColor = '';      
    }
  
    if( itemId && item?.style && isItemselected ){
      if( selectedIndex !== itemId ){
        item.style.backgroundColor = '';
      }else{
        item.style.backgroundColor = 'gray';
      }
  }
  } 