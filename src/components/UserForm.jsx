import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const UserForm = ({userSelected, getUsers, selectUser, modal, showToast}) => {
   const { handleSubmit, register, reset } = useForm()

   useEffect(() => {
      if(userSelected){
         reset(userSelected)
      }
 }, [userSelected]);

   const submit = (dataUser) => {
      if (userSelected){
         axios.put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, dataUser)
         .then(() => {
            getUsers()
            selectUser(null)
            showToast('Registro Actualizado con Éxito!!!')
         })
         const dataUserReset = { first_name: '', last_name: '', email: '', password:'', birthday:'' }
         reset(dataUserReset)
         modal.style.display = "none";
      }else{
         axios.post(`https://users-crud.academlo.tech/users/`, dataUser)
         .then(() => getUsers())
         const dataUserReset = { first_name: '', last_name: '', email: '', password:'', birthday:'' }
         reset(dataUserReset)
         modal.style.display = "none";
         showToast('Registro Creado con Éxito!!!')
      }
   }

   return ( 
          <section id="ventanaModal" className='modal'>
            <div className='contenido-modal'>
             <form onSubmit={handleSubmit(submit)} id="user_form">
               <div className='title-close'>
                <h2>New user</h2>
                <span className="close" onClick={() => {modal.style.display = "none";}}>&times;</span>
               </div>
              <div className="input-container-name">
                <div className="input-icon icon-name">
                  <i className="fa-solid fa-user fa-2x"></i>
                </div>
                <div className='input'>
                  <label htmlFor="first_name">First name</label>
                  <input type="text" id='first_name' placeholder='First Name'
                   {...register("first_name")}
                  />
                </div>
 
                <div className='input'>
                 <label htmlFor="last_name">Last name</label>
                  <input type="text" id='last_name' placeholder='Last Name' required
                   {...register("last_names")}
                   />
                </div>
              </div>
              <div className="input-container">
                  <div className="input-icon">
                   <i className="fa-solid fa-envelope fa-2x"></i>
                  </div>
                  <div className='input'>
                   <label htmlFor="email">E-mail</label>
                   <input type="email" id='email' placeholder='Email' required
                   {...register("email")}
                  />
                 </div>
              </div>
              <div className="input-container">
                 <div className="input-icon">
                  <i className="fa-solid fa-lock fa-2x"></i>
                 </div>
                <div className='input'>
                  <label htmlFor="password">Password</label>
                  <input type="password" id='password' placeholder='Password' required
                  {...register("password")}
                  />
                 </div>
              </div>
              <div className="input-container">
                 <div className="input-icon">
                  <i className="fa-solid fa-cake-candles fa-2x"></i>
                  </div>
                  <div className='input'>
                 <label htmlFor="birthday">Birthday</label>
                 <input type="date" id='birthday' placeholder='Birthday' required
                  {...register("birthday")}
                  />
                 </div>
              </div>
              <div className='button-container'>
                <button type='submit' className="button-form">Save</button>
              </div>
             </form>
            </div>
          </section>
     );
}
 
export default UserForm;