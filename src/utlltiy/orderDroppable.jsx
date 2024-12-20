//This File may not needed
import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function OrderDroppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable-order-list-item',
  });
  const style = {
    color: isOver ? 'red' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children }
      
    </div>
  );
}

