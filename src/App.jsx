import { Router, Routes, Route } from "react-router";
import Invite from "./Invite";

const App = ()=>{
  return(
    <Routes>
      <Route exact path='/' element ={<Invite/>}/>
    </Routes>
  )

}
export default App;