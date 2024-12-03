import React from 'react';

const ContactItem = ({contact, onClick}) => {

    //console.log("contact", contact);
    return (
        <div className="list-group-item list-group-item-action "
             aria-current="true"
             onClick={onClick}>
            <div className="d-flex justify-content-between" >
                <h4>{contact.name}</h4>
                {contact.status === 'online' &&
                    <small className="badge text-bg-success p-1 align-items-center h-100">Online</small>
                }
            </div>
            <span>
                {contact.lastMessage.length === 0
                    ? "..."
                    : contact.lastMessage.length > 40
                        ? `${contact.lastMessage.slice(0, 40)}...`
                        : contact.lastMessage}
            </span>
        </div>
    );
};

export default ContactItem;
