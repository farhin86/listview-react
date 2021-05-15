import React from 'react';
import './index.scss';

export default function  Card({imageUrl,name,id,catagory,selectedCard,ingredients}) {
    return(
                <div className='card-section' onClick={()=>selectedCard(id)}>
                    <img className='item-image' src={imageUrl}/>
                    <div className='name'>
                        {name}  
                    </div>
                    <div className='name'>Id: {id}</div>
                    <div className='sub-title'>{catagory}</div>
                    <div className='name'>Ingredients:</div>
                    <div className='sub-title'> {ingredients}</div>
                </div>
    )
}