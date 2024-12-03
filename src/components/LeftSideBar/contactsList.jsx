import React from 'react';
import ContactItem from "./contactItem.jsx";
import socketService from "../../services/socketService.js";

const ContactsList = ({ activeChat, setActiveChat }) => {
    const [contacts, setContacts] = React.useState([]);

    const fetchContacts = () => { // Функція для отримання списку контактів
        socketService.on("setUsers", (data) => {
            setContacts(data.data);
        });

        socketService.on("setGroups", (data) => {
            setContacts(data.data);
        });

        socketService.on("userStatusChanged", (data) => {
            console.log("userStatusChanged", data);
            updateContactsStatus(data.data);
        });

        const updateContactsStatus = (data) => {
            const updatedStatusContacts = contacts.map((contact) => {
                if (contact.id === data.userId) {
                    return { ...contact, status: data.status };
                }
                return contact;
            });
            setContacts(updatedStatusContacts);
        };

        socketService.send("getUsers", {});

        return () => {
            socketService.off("setUsers");
            socketService.off("setGroups");
            socketService.off("userStatusChanged");
        };
    };

    //console.log("contacts", contacts);

    React.useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="list-group">
            {contacts.map((contact) => (
                <ContactItem
                    key={contact.id}
                    contact={contact}
                    onClick={() => {
                        setActiveChat(contact);
                        fetchContacts();
                    }}
                />
            ))}
        </div>
    );
};

export default ContactsList;
