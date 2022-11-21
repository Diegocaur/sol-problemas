import React from 'react'



export default function Popup(props) {
    return (props.trigger) ? (
        <div className="popup" style={{zIndex:1, top: 0}}>
            <div className="popup-inner rounded">
                <button className="btn btn-danger close-btn" onClick={() => props.setTrigger(false)}>X</button>
                { props.children }
            </div>
        </div>
    ) : "";
}
