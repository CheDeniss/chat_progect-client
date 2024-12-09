import React, {useEffect, useState} from 'react';
import socketService from "../../services/socketService.js";

const SearchingMessages = ({activeChat}) => {
    const [text, setText] = useState('')

    const handleSearching = (e) => {
        setText(e.target.value);
    };

    useEffect(() => {
        if (activeChat){
            socketService.send("search", {
                chatId: activeChat.id,
                searchText: text,
                isGroup: activeChat.isGroup
            });
        }
    }, [text]);

    useEffect(() => {
        setText('');
    }, [activeChat]);

    return (
        <div>
            <div className="input-group m-3 w-auto">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Пошук..."
                    value={text}
                    onChange={(e) => handleSearching(e)}
                />
                <button className="btn btn-outline-secondary" onClick={()=>setText('')}>✕</button>
            </div>
        </div>
    );
};

export default SearchingMessages;
