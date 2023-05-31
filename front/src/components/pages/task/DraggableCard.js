import React from 'react'
import Card from './Card';
import { Draggable } from 'react-beautiful-dnd';

export default function DraggableCard({ card, list, index }) {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
        {(provided, snapshot) => {
            if (
                typeof provided.draggableProps.onTransitionEnd ===
                "function"
            ) {
                const anim = window?.requestAnimationFrame(() =>
                    provided.draggableProps.onTransitionEnd({
                        propertyName: "transform",
                    })
                );
            }
            return (
                <Card
                    card={card}
                    list={list}
                    provided={provided}
                    isDragging={snapshot.isDragging}
                />
            );
        }}
    </Draggable>
);
}
