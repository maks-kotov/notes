import './App.css'
import Header from './components/header/header'
import Search from './components/search/search'
import Create from './components/create/create'
import NodesList from './components/nodesList/nodesList'
import { useState } from 'react'
// import C1 from './components/c1/c1'
function App() {
  // пускай мы что-то набираем, потоом оно передаётся в родителя, потом в nodesList, а потом в node
  const [nodeArr, setNodeArr] = useState <string[]>([])
  const [editModeIsClicked, setEditModeIsClicked] = useState<boolean>(false)
  function pushNode(node:string):void {
    if(node.trim()) {
      setNodeArr((prevArr:string[])=>[...prevArr, node])
    }
  }  
  function switchEditMode(mode:boolean) {
    setEditModeIsClicked(mode)
  } 
  return (
  <div>
      {!editModeIsClicked && <Header />} {/*если настоящее значение false, то мы показываем. !editNodeIsClicked даёт true и оно покажется  */}
      {!editModeIsClicked && <Search />}
      <Create onButtonClick={pushNode} editModeIsClicked={editModeIsClicked}/>
      <NodesList nodeArr={nodeArr}/>
  </div>
  )
}

export default App
