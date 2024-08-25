import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  console.log( props)
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children }
      
    </div>
  );
}