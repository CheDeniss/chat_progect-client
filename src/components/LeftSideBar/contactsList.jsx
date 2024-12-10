import React, { useState, useEffect } from 'react';
import ContactItem from "./contactItem.jsx";
import socketService from "../../services/socketService.js";
import "../../styles/contactList.css";

const ContactsList = ({ setActiveChat }) => {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = () => {
        socketService.on("setUsers", (data) => {
            console.log("Fetched contacts:", data.data);
            setContacts(data.data); // Заповнюємо контакти
        });

        socketService.on("setGroups", (data) => {
            setContacts(data.data); // Заповнюємо групи
        });

        socketService.send("getUsers", {}); // Запит на отримання контактів
    };

    const updateContactsStatus = (data) => {
        console.log("updateContactsStatus - in", data);
        setContacts((prevContacts) => {
            const updatedStatusContacts = prevContacts.map((contact) => {
                if (contact.id === data.userId) {
                    return { ...contact, status: data.status }; // Оновлюємо статус
                }
                return contact;
            });
            console.log("updatedStatusContacts - out", updatedStatusContacts);
            return updatedStatusContacts;
        });
    };

    const updateContactMessagePreview = (data) => {
        setContacts((prevContacts) => {
            const updatedContacts = prevContacts.map((contact) => {
                if (contact.id === data.sender_id || contact.id === data.receiver_id) {
                    return { ...contact, lastMessage: data.message }; // Оновлюємо попередній перегляд повідомлення
                }
                return contact;
            });
            return updatedContacts;
        });
    }

    const handleMessageWasDeleted = (messageId) => {
        fetchContacts();
    };

    useEffect(() => {
        fetchContacts();

        socketService.on("newMessage", (data) => {
            updateContactMessagePreview(data.data);
        });

        // Підписуємося на зміну статусу
        socketService.on("userStatusChanged", (data) => {
            //console.log("userStatusChanged", data);
            updateContactsStatus(data.data);
        });

        socketService.on("messageDeleted", handleMessageWasDeleted);

        return () => {
            socketService.off("setUsers");
            socketService.off("setGroups");
            socketService.off("userStatusChanged");
            socketService.off("newMessage");
            socketService.off("messageDeleted");
        };
    }, []);

    return (
        <div className="list-group contact-list">
            {contacts.map((contact) => (
                <ContactItem
                    key={contact.id}
                    contact={contact}
                    onClick={() => setActiveChat(contact)}
                />
            ))}
        </div>
    );
};

export default ContactsList;
