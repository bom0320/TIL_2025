'use client';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';

const initialItems = ['🍎 Apple', '🍌 Banana', '🍇 Grape', '🍑 Peach'];

export default function SimpleDnDList() {
  const [items, setItems] = useState<string[]>(initialItems);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // 드래그 시작 위치, 드롭된 위치 
    if (!destination) return;

    
    const newItems = [...items];
    const [movedItem] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, movedItem);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="fruitList">
        {(provided) => (
          <ul
            ref={provided.innerRef} // 여기가 드롭 가능한 dom 요소
            {...provided.droppableProps} // 드롭 영역
            style={{ padding: 20, backgroundColor: '#f0f0f0' }}
            
          >


            {items.map((item, index) => (
              // 여기서 key 와 draggableId는 같아야 한다.
              <Draggable key={item} draggableId={item} index={index}>
                
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps} // 위치 계산, 이동 가능 설정
                    {...provided.dragHandleProps} // 마우스로 끌 수 있게 하는 핸들
                    style={{
                      ...provided.draggableProps.style,
                      padding: '8px 12px',
                      margin: '8px 0',
                      background: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      cursor: 'grab',
                    }}
                  >
                    {item}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
