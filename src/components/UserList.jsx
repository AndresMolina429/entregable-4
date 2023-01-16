import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const UserList = ({userList, selectUser, getUsers, modal, showToast}) => {

    const deleteUser = (user) => {
      axios.delete(`https://users-crud.academlo.tech/users/${user.id}/`) 
      .then(res => {
        getUsers()
        showToast('Registro borrado con exito!!!')
      })
    };

    const initializeForm = () => {
       modal.style.display = "block";
       document.getElementById("user_form").reset();
    };

   window.addEventListener("click",function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  const editUser = (user) => {
    selectUser(user) 
    modal.style.display = "block";
  };

  const [page, setPage] = useState(1);
  const userPerPage = 6;
  const lastIndex = page * userPerPage;
  const firstIndex = lastIndex - userPerPage;
  const userPaginated = userList.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(userList.length / userPerPage);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

    return ( 
          <div className="container-users">
            <div className="header-users">
              <a href="#modal" className='create-user-btn'>
               <button className='button-create' id='abrirModal' onClick={initializeForm}>
                Create New User
               </button>
              </a>
            </div>
             <div className='container-page'>
              {pages.map((number) => (
                <button onClick={() => setPage(number)}>{number}</button>
              ))}
             </div>
             <div className='prev-next'>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Prev page
                </button>
                <div className='number-color'>
                 {page} / {totalPages}
                </div>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next page
                </button>
             </div>
            <div className='list'>
             <ul className='users'>
                {
                  userPaginated.map( user =>(
                    <li className="item-list card" key={user.id}>
                        <div className="card-header">
                          <h3>{user.first_name} {user.last_name}</h3>
                        </div>
                        <div className="card-body">
                          <ul>
                            <li>
                              <label htmlFor="userEmail">Email</label>
                              <div id='userEmail'>
                               {user.email}
                              </div> 
                            </li>
                            <li>
                              <label htmlFor="userBirthday">Birthday</label>
                              <div id='userBirthday'>
                               {user.birthday}
                              </div> 
                            </li>
                          </ul>
                        </div>
                        <div className="card-footer">
                           <a href='#'>
                            <button type='button' className='button-list delete' onClick={() => deleteUser(user)}>
                             <i className="fa-solid fa-trash"></i>
                            </button>
                           </a>
                            <a href="#modal">
                             <button type='button' className='button-list edit' onClick={() => editUser(user)}>
                              <i className="fa-solid fa-pencil"></i>
                             </button>
                            </a>
                        </div>
                    </li>
                  ))
                }
             </ul>
            </div>
         </div>
     );
}
 
export default UserList;