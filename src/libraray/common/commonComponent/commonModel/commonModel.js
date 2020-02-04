import React from 'react';

import '../../../../resources/style/style.css';

const Modal = (props) => {

    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-body">
                  
                        {props.children}
                   
                </div>
                <div >
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue"  onClick={props.call}>CONTINUE</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;

