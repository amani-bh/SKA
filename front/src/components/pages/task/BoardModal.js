import { Button, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { useEffect } from 'react';

export const BoardModal = (props) => {

    const { closeModal, action, visible } = props;
    const [boardTitle, setBoardTitle] = useState('');
    const [boardDescription, setBoardDescription] = useState('');
    const [loading, setLoading] = useState(false);
   

    const isEmptyText = (text) => !text || !text.trim();

    const handleCreateBoard = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (isEmptyText(boardTitle) && isEmptyText(boardDescription)) {
            return;
        }
        await action({
            title: boardTitle,
            description:boardDescription
        });
        setBoardTitle('');
        setBoardDescription('');
        setLoading(false);
    };

    return (
        <Modal
            title="Add board"
            width="400px"
            open={visible}
            onCancel={closeModal}
            footer={null}
        >
            <form className={`w-full`} onSubmit={(event) => handleCreateBoard(event)}>
                <Input
                    className={`mb-3`}
                    placeholder="Title"
                    onChange={(event) => setBoardTitle(event.target.value)}
                    value={boardTitle}
                />
                <TextArea
                    className={`mb-3`}
                    placeholder="Description"
                    onChange={(event) => setBoardDescription(event.target.value)}
                    value={boardDescription}
                />
                <Button
                    type="primary"
                    onClick={(event) => handleCreateBoard(event)}
                    loading={loading}
                    disabled={isEmptyText(boardTitle) && isEmptyText(boardDescription)}
                >
                    Add
                </Button>
            </form>
        </Modal>
    );
};

