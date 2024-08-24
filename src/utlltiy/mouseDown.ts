import { MouseEvent  } from "react";



interface MouseDownProps {    
    itemId:number,
    listRef: React.RefObject<(HTMLLIElement | null)[]>,
    selectedIndex: (number | null),
    selectedMouseOverIndex: number | null,
    getSelectedItem:( selectedMouseOverIndex: number )=> void,
    setIsItemselected:(isItemselected: boolean)=> void,
    setSelectedIndex:( itemId: number )=> void
  }

export const handleMouseDown = ({
    itemId,
    listRef,
    selectedIndex,
    selectedMouseOverIndex,
    getSelectedItem,
    setIsItemselected,
    setSelectedIndex,
}: MouseDownProps
) =>(event: MouseEvent<HTMLLIElement>)=> {
        
    // handleClick(itemId);
    setSelectedIndex(itemId); // Update the selected item index for highlighting
    setIsItemselected( true )
    
    
    if ( selectedIndex == null ){             
          getSelectedItem( selectedMouseOverIndex!)
    }else{
          getSelectedItem( itemId )
    }
     
    listRef.current ? listRef.current.forEach((item, idx) => {
      if (item) {
        item.style.backgroundColor = idx === itemId ? 'gray' : ''; // Set background to gray for selected item
      }
    }): null;
  };