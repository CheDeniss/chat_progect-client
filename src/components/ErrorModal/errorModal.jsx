import React from 'react';

const ErrorModal = ({error, onClose}) => {
    return (
    <div
        className={`modal fade ${error ? 'show' : ''}`}
        style={{ display: error ? 'block' : 'none' }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="errorModalLabel"
        aria-hidden="true">


        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Помилка</h5>
                    <button onClick={onClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>{error}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>


        {/*<div className="modal-dialog" role="document">*/}
        {/*    <div className="modal-content">*/}
        {/*        <div className="modal-header">*/}
        {/*            <h5 className="modal-title " id="errorModalLabel">Помилка</h5>*/}
        {/*            <button*/}
        {/*                type="button"*/}
        {/*                className="close"*/}
        {/*                aria-label="Close"*/}
        {/*                onClick={onClose}*/}
        {/*            >*/}
        {/*                <span aria-hidden="true">&times;</span>*/}
        {/*            </button>*/}
        {/*        </div>*/}
        {/*        <div className="modal-body">*/}
        {/*            {error}*/}
        {/*        </div>*/}
        {/*        <div className="modal-footer">*/}
        {/*            <button*/}
        {/*                type="button"*/}
        {/*                className="btn btn-secondary"*/}
        {/*                onClick={onClose}*/}
        {/*            >*/}
        {/*                Закрити*/}
        {/*            </button>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>
    );
};

export default ErrorModal;
