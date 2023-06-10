import React, { useEffect, useRef, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { v4 as uuidv4 } from "uuid";
import { addItemList, updateTitleList } from '../../../utils/Task';
import { addCard, updateList } from '../../../utils/board';
import { useContext } from 'react';
import globalContext from '../../../utils/globalContext';

const getListStyle = (isDragging, defaultStyle) => {
  if (!isDragging) return defaultStyle;
  return {
      ...defaultStyle,
      transform: defaultStyle.transform + " rotate(5deg)",
  };
};

const getListTitleStyle = (isDragging, defaultStyle) => {
  if (!isDragging)
      return {
          ...defaultStyle,
          cursor: "pointer",
      };
  return {
      ...defaultStyle,
      cursor: "grabbing",
  };
};

export const mergeRefs = (...refs) => {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) return null;
    if (filteredRefs.length === 0) return filteredRefs[0];
    return (inst) => {
        for (const ref of filteredRefs) {
            if (typeof ref === "function") {
                ref(inst);
            } else if (ref) {
                ref.current = inst;
            }
        }
    };
};

export default function List({ list,members, index }) {
    const { board, setBoard } = useContext(globalContext);
  const [addingCard, setAddingCard] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);


  const onAddCard = async (e) => {
      e.preventDefault();
      if (cardTitle.trim() === "") return;
      const item={
        list: list?.id,
        title:cardTitle,
      }
      const result   = await addItemList(item)
      if(result!=undefined){
        setAddingCard(false);
        addCard(board, setBoard)(list.id, result);


      }
  };

  const listCards = useRef(null);
  useEffect(() => {
      if (addingCard)
          listCards.current.scrollTop = listCards.current.scrollHeight;
  }, [addingCard]);

  useEffect(() => {
      if (editingTitle) {
          const editListTitle = document.querySelector(".list__title-edit");
          editListTitle.focus();
          editListTitle.select();
      }
  }, [editingTitle]);

  return (
      <Draggable draggableId={"list" + list.id.toString()} index={index}>
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
                  <div
                      className="list"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getListStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                      )}
                  >
                      <div
                          className="list__title"
                          {...provided.dragHandleProps}
                          style={getListTitleStyle(
                              snapshot.isDragging,
                              provided.dragHandleProps.style
                          )}
                      >
                          {!editingTitle ? (
                              <p onClick={() => setEditingTitle(true)}>
                                  {list.title}
                              </p>
                          ) : (
                              <EditList
                                  list={list}
                                  setEditingTitle={setEditingTitle}
                              />
                          )}
                          <i className="far fa-ellipsis-h"></i>
                      </div>
                      <Droppable droppableId={list.id.toString()} type="item">
                          {(provided) => (
                              <div
                                  className="list__cards"
                                  ref={mergeRefs(
                                      provided.innerRef,
                                      listCards
                                  )}
                                  {...provided.droppableProps}
                              >
                                  {list.items.map((card, index) => (
                                      <DraggableCard
                                          card={card}
                                          list={list}
                                          index={index}
                                          members={members}
                                          key={uuidv4()}
                                      />
                                  ))}
                                  {provided.placeholder}
                                  {addingCard && (
                                      <AddCard
                                          onAddCard={onAddCard}
                                          cardTitle={cardTitle}
                                          setCardTitle={setCardTitle}
                                      />
                                  )}
                              </div>
                          )}
                      </Droppable>
                      {!addingCard ? (
                          <button
                              className="btn list__add-card"
                              onClick={() => setAddingCard(true)}
                          >
                              Add card
                          </button>
                      ) : cardTitle.trim() !== "" ? (
                          <button
                              className="btn list__add-card list__add-card--active btn"
                              onClick={onAddCard}
                          >
                              Add
                          </button>
                      ) : (
                          <button
                              className="list__add-card list__add-card--active btn btn--disabled"
                              disabled
                          >
                              Add
                          </button>
                      )}
                  </div>
              );
          }}
      </Draggable>
  );
};



const AddCard = ({ onAddCard, cardTitle, setCardTitle }) => (
  <form className="list__add-card-form" onSubmit={onAddCard}>
      <input
          type="text"
          name="title"
          value={cardTitle}
          placeholder="Enter card title..."
          onChange={(e) => setCardTitle(e.target.value)}
      />
  </form>
);

const EditList = ({ list, setEditingTitle }) => {
    const { board, setBoard } = useContext(globalContext);

  const [listTitle, setListTitle] = useState(list.title);

  const onEditList = async (e) => {
      e.preventDefault();
      if (listTitle.trim() === "") return;
      const result= await updateTitleList(list.id,  listTitle) 
      updateList(board, setBoard)(result);
      setEditingTitle(false);
  };

  return (
      <form onSubmit={onEditList}>
          <input
              className="list__title-edit"
              type="text"
              name="title"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
          ></input>
      </form>
  );
}
