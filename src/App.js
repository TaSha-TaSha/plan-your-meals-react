import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import MyList from './MyList';
import MyMealsAndIngredients from './MyMealsAndIngredients';

function App() {
// здесь добавили в useState([]) не просто пустой массив а localStorage
  const [ mealPlans, setMealPlans ] = useState(
    localStorage.mealPlans ? JSON.parse(localStorage.mealPlans) : []);
  const [ selectedDay, setSelectedDay ] = useState(false);

  // LocalStorage последний этап
  // нужен для сохранения заметок при перезагрузке браузера
  useEffect( () => {
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans))
  }, [mealPlans])

  const addMeal = () => {
// создаем обьект при клике на add
    const newMeal = {
      title: `Today is ....`,
      id: uuid(),
      mealForADay: "",
      ingredients: ""
// устанавливаем библиотеку для ID npm i react-uuid 
// и импортируем ее внаш объект 
    }
    setMealPlans( [ newMeal, ...mealPlans ] )
// обращаем внимание на скобки массива []
// добавь в новый массив новую заметку но и также не убирай предыдущие, 
// поэтому оператор расширения
    // console.log(`It Works ADDING !!!`)
    console.log(newMeal)
  };

  const deleteDay = (mealId) => {
    setMealPlans(mealPlans.filter( ( {id} ) => id !== mealId) )
  };

  const updateDay = (myUpdatedMeal) => {
    const updatedMeals = mealPlans.map( (element) => {
      if (element.id === myUpdatedMeal.id) {
        return myUpdatedMeal;
      }
      return element
    })
    setMealPlans(updatedMeals)
  }

  const getActiveMeal = () => {
    return mealPlans.find( ( {id} ) => id === selectedDay )
  }

  return (<div className='App'>
    <MyList 
    mealPlans={ mealPlans }
    addMeal={ addMeal } 
    deleteDay={ deleteDay }
    selectedDay={ selectedDay }
    setSelectedDay={ setSelectedDay }
    />

    <MyMealsAndIngredients 
    selectedDay={ getActiveMeal() }
    updateDay={ updateDay }
    />
    </div>);
}

export default App;

// https://medium.com/@stasonmars/подробно-про-метод-filter-в-javascript-1fcb239a0d74 

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter 

// https://doka.guide/js/array-filter/ 

// ====== для работы с localStorage ====== //

// Изучите этот материал перед просмотром следующего урока:

// https://dev-gang.ru/article/ispolzovanie-localstorage-s-react-hooks-2gjbv4l84d/ 

// https://stasonmars.ru/javascript/ispolzuem-localstorage-v-react/ 


// Изучите этот материал перед просмотром следующего урока:

// https://learn.javascript.ru/json 

// https://www.digitalocean.com/community/tutorials/js-json-parse-stringify-ru 

