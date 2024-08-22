import React, { ReactNode } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableProps {
  itemId: number;
  children: ReactNode;
  setRef: (itemId: number) => (instance: HTMLLIElement | null) => void;

}


function Draggable({ itemId, children , setRef }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id:itemId,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,        
      }
    : undefined;


       // Merging setNodeRef and setRef into one ref callback
   const combinedRef = (element: HTMLLIElement ) => {
    setNodeRef(element);  // This ref is used for the draggable behavior
    setRef(itemId)(element);  // This ref is used for your listRef logic
  };

  return (
    
    <li ref={combinedRef} style={style} {...listeners} {...attributes}>
      {children}
    </li>
  );
}

export default Draggable;
