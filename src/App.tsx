import './App.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Create from './components/create/create'
import NodesList from './components/nodesList/nodesList'
// import C1 from './components/c1/c1'
interface obj {
  id:number,name:string,description?: string
}
function App() {

  return (
  <div>
      <Header />
      <Search />
      <Create />
      <NodesList />
  </div>
  )
}

export default App
