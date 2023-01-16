import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import axios from 'axios'

function App() {
  const [userList, setUserList] = useState([])
  const [userSelected, setUserSelected] = useState(null)

  useEffect(() => {
  axios.get(`https://users-crud.academlo.tech/users/`)
  .then(res => setUserList(res.data))
}, []);

const selectUser = (user) => {
   setUserSelected(user)
   modal.style.display = "block";
};

const getUsers = () => {
  axios.get(`https://users-crud.academlo.tech/users/`)
  .then(res => setUserList(res.data))
};

var modal = document.getElementById("ventanaModal");

const showToastSuccess = (message) => {
    const toast_sucess = document.getElementById( "toast-success" )
    toast_sucess.textContent = message
    toast_sucess.classList.add( "visible" )

    setTimeout( () =>{
        toast_sucess.classList.remove( "visible" )
    }, 5000 )
}

const showToastError = (message) => {
    const toast_error = document.getElementById( "toast-error" )
    toast_error.textContent = message
    toast_error.classList.add( "visible" )

    setTimeout( () =>{
        toast_error.classList.remove( "visible" )
    }, 5000 )
}

  return (
    <div className="App">
        <UserList userList={userList} selectUser={selectUser} getUsers={getUsers} modal={modal} showToastError={showToastError} showToastSuccess={showToastSuccess}/>
        <UserForm userSelected={userSelected} getUsers={getUsers} selectUser={selectUser} modal={modal} showToastError={showToastError} showToastSuccess={showToastSuccess} />
        <div className="toast-success" id="toast-success">
          mensaje del toast
        </div>
        <div className="toast-error" id="toast-error">
          mensaje del toast
        </div>
    </div>
  )
}

export default App
