import React, {useState} from "react";
import UserManagement from "../Header/userIcon";
import ContactsList from "./contactsList.jsx";
import socketService from "../../services/socketService.js";
import NewGroupChatModal from "./newGroupChatModel.jsx";

const CanvasWindow = ({setIsAuthenticated}) =>

    // const fetchContacts = () => {
    //     socketService.on("setUsers", (data) => {
    //         setContactNames(data.data);
    //     });
    //
    //     socketService.send("getUsers", {});
    //     console.log("contactNames", contactNames);
    //
    //     return () => {
    //         socketService.off("setUsers");
    //     };
    // }

    <>
        {/*<div>*/}
        {/*    <div className="modal fade" id="exampleModalToggle" aria-labelledby="exampleModalToggleLabel" tabIndex="-1"*/}
        {/*         style={{display: 'none'}} aria-hidden="true">*/}
        {/*        <div className="modal-dialog modal-dialog-centered">*/}
        {/*            <div className="modal-content">*/}
        {/*                <div className="modal-header">*/}
        {/*                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Назва групи</h1>*/}
        {/*                    <button type="button" className="btn-close" data-bs-dismiss="modal"*/}
        {/*                            aria-label="Close">*/}
        {/*                    </button>*/}
        {/*                </div>*/}
        {/*                <div className="modal-body">*/}
        {/*                    <div className="mb-3">*/}
        {/*                        <label htmlFor="GroupName" className="form-label"></label>*/}
        {/*                        <input type="text" className="form-control" id="GroupName" required/>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*                <div className="modal-footer">*/}
        {/*                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle2"*/}
        {/*                            id="NextButton"*/}
        {/*                            data-bs-toggle="modal">Далі*/}
        {/*                    </button>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*    <div className="modal fade" id="exampleModalToggle2" aria-labelledby="exampleModalToggleLabel2"*/}
        {/*         tabIndex="-1" style={{display: 'none'}} aria-hidden="true">*/}
        {/*        <div className="modal-dialog modal-dialog-centered">*/}
        {/*            <div className="modal-content">*/}
        {/*                <div className="modal-header">*/}
        {/*                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Modal 2</h1>*/}
        {/*                    <button type="button" className="btn-close" data-bs-dismiss="modal"*/}
        {/*                            aria-label="Close"></button>*/}
        {/*                </div>*/}
        {/*                <div className="modal-body">*/}
        {/*                    fetchContacts();*/}
        {/*                    <p>{contactNames}</p>*/}

        {/*                </div>*/}
        {/*                <div className="modal-footer">*/}
        {/*                    <button className="btn btn-primary" data-bs-target="#exampleModalToggle"*/}
        {/*                            data-bs-toggle="modal">Створити*/}
        {/*                    </button>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}


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
                           data-bs-target="#exampleModalToggle"
                        >
                            Нова група
                        </a>
                        <a href="#" className="list-group-item list-group-item-action">A third link item</a>
                        <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
                    </div>
                </div>
            </div>
        </div>
        <NewGroupChatModal/>

    </>


export default CanvasWindow;