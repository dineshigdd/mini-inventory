import { MouseEvent, ReactNode  } from "react";



interface MouseOverProps {    
    itemId:number,
    listRef: React.RefObject<(HTMLLIElement | null)[]>;  
    selectedIndex: (number | null),
    isItemselected: boolean,  
    setSelectedMouseOverIndex:( itemId: number )=> void;
  }

  export const handleMouseOver = ({
    itemId,
    listRef,
    selectedIndex,
    isItemselected,
    setSelectedMouseOverIndex
  }: MouseOverProps) => (event: MouseEvent<HTMLLIElement>) => {  
  
  

    const item = listRef.current ? listRef.current[itemId] : null;


    setSelectedMouseOverIndex( itemId )
    
    if( itemId && item?.style  ){
          item.style.backgroundColor = 'lightgray';         
    }

    if( itemId && item?.style && isItemselected ){
      if( selectedIndex !== itemId ){
        item.style.backgroundColor = 'lightgray';
      }else{
        item.style.backgroundColor = 'gray';
      }
  }

   
} 