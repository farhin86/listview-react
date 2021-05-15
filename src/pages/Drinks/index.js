import React,{useCallback, useEffect, useRef, useState} from 'react';
import './index.scss';
import Card from '../../components/Card';
import Modal from '../../components/Modal';


export default function Drinks() {
const [inputText, setInputText] = useState('');
const [allDrinks, setAllDrinks] = useState([])
const [searchData, setSearchData]= useState([])
const [showModal, setShowModal] = useState(false);
const [drinksDetails, setDrinksDetails] = useState({})
const addedIngredient = useRef(null);

const fetchInputSuggestion=(value='')=>{
    let url= `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`
    fetch(url).then(res=> res.json().then(response=>{
        if(value=== ''){
            setAllDrinks(response?.drinks || [])
        }
        setSearchData(response?.drinks || []);
    }))
}

useEffect(() => 
    fetchInputSuggestion(), [])

let getSearch = useCallback(
    debounce(fetchInputSuggestion,3000),
    []
);

//search drinks
const setInputValue=(value)=>{
    setInputText(value)
    getSearch(value)
}

//sort drinks
const getSortedData=()=>{
    const sortedData= [...searchData].sort((a,b)=> a.idDrink-b.idDrink)
    setSearchData(sortedData);
}

//filter drinks
const fiterDrinks=(selectedFilter)=>{
    const filteredData= searchData.filter((eachItem)=> eachItem.strCategory === selectedFilter)
    setSearchData(filteredData);
}

//select drink and open new page/modal
const selectCard=(id)=>{
    const selectedDrink= searchData.filter(drinks=> drinks.idDrink === id)[0] || {}
    setDrinksDetails(selectedDrink)
    setShowModal(true);
}

//Show ingredients on the cards
const getIngredient=(drinkDetails)=>{
    let i=1,ingredients='';
    while(i<=3){
       const ingredient =  drinkDetails[`strIngredient${i}`]
        if(ingredient){
            ingredients+= `${i===1 ? '':','} ${drinkDetails[`strIngredient${i}`]}`;
        }
        i++
    }
    return ingredients
}

//updated data from api(now no api) on added ingredient, and updating in choosen card
const addIngredient=()=>{
    if(addedIngredient.current.value.length !== 0){
        let updatedSearchData = searchData.map(eachDrink=>{
            if(eachDrink.idDrink === drinksDetails.idDrink){
                eachDrink.strIngredient1 = addedIngredient.current.value ?? ''
            }
        })
        setAllDrinks(updatedSearchData || [])
        setShowModal(false)
    }
}
    return(
        <div className='drinks-wrapper'>
            <section>
            <input value={inputText} onChange={(e)=>setInputValue(e.target.value)}/>
            <div className='drinks-button-wrapper'>
                <button className='sort' onClick={()=>getSortedData()}>Sort by id</button>
                <select className='filter' onChange={(e) => fiterDrinks(e.target.value)}>
                    <option value="Punch / Party Drink">Punch / Party Drink</option>
                    <option value="Ordinary Drink">Ordinary Drink</option>
                    <option value="Cocktail">Cocktail</option>
                    <option value="Shot">Shot</option>
                </select>
            </div>
            </section>

            <div className='card-wrapper'>
            {searchData.map(eachCard=>{
                return <Card selectedCard={(id)=>selectCard(id)} key={eachCard.idDrink} catagory={eachCard.strCategory} imageUrl={eachCard.strDrinkThumb} name={eachCard.strDrink} id={eachCard.idDrink} ingredients={getIngredient(eachCard)}/>
            })}
            </div>
           {showModal && 
           <Modal closeModal={()=>setShowModal(false)}>
           {drinksDetails ? 
                <div className='modal-content'>
                    <img className='modal-image' src={drinksDetails.strDrinkThumb} alt='drink'/>
                     <div className='details'>
                        <div className='drink-name'>
                            Drink: {drinksDetails.idDrink}
                            </div> 
                            <div className='catagory-id'>
                                Category: {drinksDetails.strCategory}
                            </div>
                            <div className='catagory-id'>
                                Id: {drinksDetails.idDrink}
                            </div>
                            <div className='add-ing'>
                                <input ref={addedIngredient} className='ingredient' placeholder='Replace first ingredient' />
                                <button className='add' onClick={()=>addIngredient()}>Add</button>
                            </div>
                    </div> 
               </div>
              : "Loading"}
               </Modal>} 
        </div>
    )
}
export const debounce=(callBack,time)=>{
    let searchId;
    return function(...args){
        if(searchId){
            clearTimeout(searchId);
        }
        searchId = setTimeout(()=>{
            callBack(...args)
        }, time)
    }
}