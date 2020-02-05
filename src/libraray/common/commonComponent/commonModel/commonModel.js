import React from 'react';
import Button from '../../commonComponent/Button/button'
import '../../../../resources/style/style.css';

const Modal = (props) => {
    let {children,show,close,call} = props
    return (
        <div>
            <div className="modal-wrapper"
                    style={{
                        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: show ? '1' : '0'
                    }}>
                    <div className="modal-body">
                            {children}
                    </div>
                    <div>
                        <Button className="btn-cancel" onClick={close} value = "CLOSE" />
                        <Button className="btn-continue"  onClick={call} value = "CONTINUE" />
                    </div>
            </div>
        </div>
    )
}

export default Modal;

