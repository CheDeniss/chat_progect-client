import React, {useEffect, useState} from "react";

const UserProfileModal = ({authUserData}) => {

    return (
        <>
            <div className="modal fade"
                 id="userProfileModalToggle"
                 aria-hidden="true"
                 aria-labelledby="exampleModalToggleLabel"
                 tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Профіль користувача</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <p>Ім'я - <b>{authUserData.name}</b></p>
                                <p>Електронна адреса - <b>{authUserData.email}</b></p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileModal;
