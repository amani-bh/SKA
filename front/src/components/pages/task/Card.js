import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { updateTitleItem } from '../../../utils/Task';
import globalContext from '../../../utils/globalContext';
import { useContext } from 'react';
import { updateCard } from '../../../utils/board';
import EditCardModal from './EditCardModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons';

const getCardStyle = (isDragging, isEditing, defaultStyle) => {
  if (isEditing) {
      return {
          cursor: "auto",
      };
  }
  if (!isDragging)
      return {
          ...defaultStyle,
          cursor: "pointer",
      };
  return {
      ...defaultStyle,
      transform: defaultStyle.transform + " rotate(5deg)",
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

export default function Card({ card, list, provided, isDragging }) {
    // console.log("card**",card)
  const { board, setBoard } = useContext(globalContext);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showLabelModal, setShowLabelModal] = useState(false);

    const cardElem = useRef(null);

    const handleCardClick = (e) => {
        if (isEditing) return;
        if (e.target.className.includes("pen")) return;
        setShowEditModal(true);
    };

    useEffect(() => {
        if (!isEditing) {
            setShowLabelModal(false);
        } else {
            const editCardTitle = document.querySelector(".card__title-edit");
            editCardTitle.focus();
            editCardTitle.select();
        }
    }, [isEditing]);

    const onEditCard = async (e) => {
        e.preventDefault();
        if (title.trim() === "") return;
        const result=await updateTitleItem(card.id,title)
        if(result!=undefined){
            setIsEditing(false);
        }
        updateCard(board, setBoard)(list.id, result);
    };

    const { innerRef, draggableProps, dragHandleProps } = provided;

    const cardImage = card.image || card.image_url || card.color;
    return (
        <>
            <div
                className={`card${cardImage ? " card--image" : ""}${
                    isEditing ? " card--edit" : ""
                }`}
                 ref={mergeRefs(cardElem, innerRef)}
                onClick={handleCardClick}
                {...draggableProps}
                style={getCardStyle(
                    isDragging,
                    isEditing,
                    draggableProps.style
                )}
                {...dragHandleProps}
            >
                {cardImage &&
                    (card.color ? (
                        <div
                            className="card__color"
                            style={{ backgroundColor: `#${card.color}` }}
                        ></div>
                    ) : (
                        <div className="card__image">
                            <img src={cardImage} />
                        </div>
                    ))}
                <div>
                    {!isEditing && (
                        <button
                            className="card__pen"
                            onClick={() => setIsEditing(true)}
                        >
                             <FontAwesomeIcon icon={faPen} />
                        </button>
                    )}
                    {isEditing ? (
                        <form onSubmit={onEditCard}>
                            <input
                                className="card__title-edit"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </form>
                    ) : (
                        <p className="card__title">{card.title}</p>
                    )}
                   
                    
                </div>
            </div>
            {showEditModal && (
                <EditCardModal
                    card={card}
                    setShowModal={setShowEditModal}
                    list={list}
                />
            )}
        </>
    );
};


export const getEditControlsSidePosition = (cardElem, offset = 0) => {
    // pass in ref.current
    if (!cardElem) return null;
    return {
        top: cardElem.getBoundingClientRect().y + offset + "px",
        left:
            cardElem.getBoundingClientRect().x +
            cardElem.getBoundingClientRect().width +
            10 +
            "px",
    };
};

const EditControls = ({
    onEditCard,
    cardElem,
    setShowModal,
    setShowLabelModal,
}) => {
    // useEffect(modalBlurHandler(setShowModal), []);
    return (
        <div className="card__edit-controls">
            <button onClick={onEditCard} className="btn">
                Save
            </button>
            <ul
                className="card__edit-controls-side"
                style={getEditControlsSidePosition(cardElem.current)}
            >
                <li>
                    <button onClick={() => setShowLabelModal(true)}>
                        <i className="fal fa-tags"></i> Edit Labels
                    </button>
                </li>
                <li>
                    <FontAwesomeIcon icon={faUser} /> Change Members
                </li>
                <li>
                    <i className="fal fa-arrow-right"></i> Move
                </li>
                <li>
                    <i className="fal fa-clock"></i> Change Due Date
                </li>
            </ul>
        </div>
    );
}
