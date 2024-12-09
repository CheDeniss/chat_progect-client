import React from 'react';
import groupIcon from "../../assets/icon-group.png";
import dialogueIcon from "../../assets/icon-dialogue.png";
import "../../styles/contactItem.css";

const ContactItem = ({contact, onClick}) => {
    //console.log("contact", contact);
    return (
        <div className="contact-item-container list-group-item list-group-item-action ps-1"
             aria-current="true"
             onClick={onClick}>
            <div className="d-flex">
                <img
                    src={contact.isGroup === '1' ? groupIcon : dialogueIcon}
                    alt="іконка"
                />
                <div className="w-100 d-flex flex-column justify-content-between ms-1">
                    <div className="d-flex justify-content-between align-content-end">
                        <h4 className="contact-name">{contact.name}</h4>
                        {contact.status === 'online' &&
                            <small className="badge text-bg-success p-1 align-items-start">Online</small>
                        }
                    </div>
                    <p className="last-message">
                {contact.lastMessage.length === 0
                    ? "..."
                    : contact.lastMessage.length > 62
                        ? `${contact.lastMessage.slice(0, 62)}...`
                        : contact.lastMessage}
                </p>
                </div>
            </div>
        </div>
    );
};

export default ContactItem;
