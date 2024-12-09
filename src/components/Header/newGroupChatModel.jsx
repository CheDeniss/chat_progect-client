import React, {useEffect, useState} from "react";
import socketService from "../../services/socketService.js";

const NewGroupChatModal = () => {
    const [groupName, setGroupName] = useState("");
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => { // Очищення стану при закритті модального вікна
        const resetState = () => {
            setGroupName("");
            setSelectedContacts([]);
            setContacts([]);
        };

        const modal2 = document.getElementById("exampleModalToggle2");
        modal2?.addEventListener("hidden.bs.modal", resetState);

        return () => {
            modal2?.removeEventListener("hidden.bs.modal", resetState);
        };
    }, []);

    const fetchContacts = () => {
        socketService.on("setUsers", (data) => {
            setContacts(data.data);
        });

        socketService.send("getUsers", {});

        return () => {
            socketService.off("setUsers");
        };
    };

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleContactSelection = (contactId) => {
        setSelectedContacts((prevSelected) =>
            prevSelected.includes(contactId)
                ? prevSelected.filter((id) => id !== contactId)
                : [...prevSelected, contactId]
        );
    };

    const handleCreateGroup = () => {
        const groupData = {
            name: groupName,
            members: selectedContacts,
        };

        socketService.send("createGroup", groupData);

        const handleGroupCreated = (data) => {
            console.log("Групу створено:", data);
            socketService.off("groupCreated", handleGroupCreated);

            socketService.send("getUsers", {});
        };

        socketService.on("groupCreated", handleGroupCreated);
    };

    return (
        <>
            {/* Перше модальне вікно */}
            <div className="modal fade"
                 id="newGroupChatModalToggle"
                 aria-hidden="true"
                 aria-labelledby="exampleModalToggleLabel"
                 tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Назва групи</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="GroupName" className="form-label">Введіть назву групи</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="GroupName"
                                    value={groupName}
                                    onChange={handleGroupNameChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                data-bs-target="#exampleModalToggle2"
                                data-bs-toggle="modal"
                                disabled={!groupName.trim()}
                                onClick={fetchContacts}
                                onKeyDown={(e) => e.key === 'Enter' && fetchContacts()}
                            >
                                Далі
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Друге модальне вікно */}
            <div
                className="modal fade"
                id="exampleModalToggle2"
                aria-labelledby="exampleModalToggleLabel2"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Виберіть учасників</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                <h1>{groupName}</h1>
                                {contacts.map((contact) => (
                                    <li
                                        key={contact.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span>{contact.name}</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedContacts.includes(contact.id)}
                                            onChange={() => handleContactSelection(contact.id)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                onClick={handleCreateGroup}
                                data-bs-dismiss="modal"
                                disabled={selectedContacts.length === 0}
                            >
                                Створити
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewGroupChatModal;
