import React, {useState} from "react";
import UserManagement from "./userManagement.jsx";
import NewGroupChatModal from "./newGroupChatModel.jsx";
import UserProfileModal from "./userProfileModal.jsx";

const CanvasWindow = ({authUserData, setIsAuthenticated}) =>

    <>
        <div className="offcanvas offcanvas-start"
             //data-bs-scroll="true"
             // data-bs-backdrop="false"
             data-bs-theme="dark"
             tabIndex="-1"
             id="offcanvasExample"
             aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                {/*<h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>*/}
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div>
                    <UserManagement setIsAuthenticated={setIsAuthenticated}/>
                    <div className="list-group list-group-flush ">
                        <a href="#"
                           className="list-group-item list-group-item-action mt-3"
                            data-bs-toggle="modal"
                            data-bs-target="#userProfileModalToggle"
                        >Профіль</a>

                        <a href="#"
                           className="list-group-item list-group-item-action"
                           data-bs-toggle="modal"
                           data-bs-target="#newGroupChatModalToggle"
                        >
                            Нова група
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <NewGroupChatModal/>
        <UserProfileModal authUserData={authUserData}/>

    </>


export default CanvasWindow;