import React from 'react';
import './index.scss';

export default function  Modal({children,closeModal
}) {
    return(
        <div className='modal-wrapper'>
            <section>
                {children}
                <button className='close' onClick={closeModal}>Go back</button>
            </section>
        </div>
    )
}