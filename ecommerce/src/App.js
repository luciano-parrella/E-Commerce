import './App.css';
import NavBar from './components/NavBar';
import ItemListContainer from './containers/ItemListContainer';

function App() {
  return (
    <div className="App">
      <NavBar mensaje = {"Hola, cómo estás?"}/>
      <ItemListContainer greeting = {"Bienvenidos a Performance, E-Commerce de Suplementos Deportivos"}/>
    </div>
  );
}

export default App;
