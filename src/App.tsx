import './App.css'
import HelloWorld from './components/HelloWorld'
import { Link } from 'react-router-dom';
import recipesData from './data/recipes.json';

function App() {
  let isValid : boolean= true;
  const { recipes } = recipesData;
  return (
    <>
      <section id="center">
        <div>
          {isValid && <HelloWorld name="Omrane Riahi" />}
        </div>

        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <img src={recipe.image} width={100}></img>
              <p><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></p>
              <p>Temps de preparation : {recipe.prepTimeMinutes} minutes</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default App
