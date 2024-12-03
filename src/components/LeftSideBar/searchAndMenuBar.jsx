import React from 'react';
import CanvasWindow from "./canvasWindow";

const SearchAndMenuBar = ({setIsAuthenticated}) => {
    return (
        <div className="input-group  mb-1 mt-1" style={{ marginLeft: '-5px' }}>
            <button className="btn btn-secondary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample">&#9776;</button>
            <span className="input-group-text" id="basic-addon1">&#x1F50D;&#xFE0E;</span>
            <input type="text" className="form-control" placeholder="Пошук..." aria-label="Username"
                   aria-describedby="basic-addon1"/>

            <CanvasWindow setIsAuthenticated={setIsAuthenticated}/>
        </div>
    );
};

export default SearchAndMenuBar;
