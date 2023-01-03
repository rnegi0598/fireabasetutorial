import { collection, getDocs,addDoc,updateDoc,deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useState,useEffect } from "react";
import {db} from './firebase-config';

import inputCss from './App.module.css';

function App() {

  const [users,setUsers] =useState([]);
  const [newName,setNewName]=useState('');
  const [newAge,setNewAge]=useState(0);
  

  const usersCollectionRef=collection(db,"users");

  useEffect(()=>{

    const getUsers=async ()=>{

      // Realtime update
      
      onSnapshot(usersCollectionRef,(querySnapshot)=>{
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({...doc.data(),id:doc.id});
        });
        setUsers(data);

      })
      

        // const data=await getDocs(usersCollectionRef);
        // setUsers(
        //   data.docs.map((doc)=>{
        //     return {...doc.data(),id:doc.id};
        //   })
        // )

    }

    getUsers();

  }, []);
  


  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });

  };

  const increaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const decreaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age - 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };


  return (
    
    <div className="App">
      {/* add new contact  */}
      <div  className={inputCss.inputFields}>
        <label>
          Name:
        <input
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        </label>
        <label>
          Age:
        <input
          type="number"
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
        />
        </label>
        <button onClick={createUser}> Create User</button>
      </div>
      

      
      {/* display contact list */}
      
        <div className={inputCss.displayContacts}>
          {
            users.map((user)=>{
              return (
                <div key={user.id}>
                  {" "}
                  <h1>Name: {user.name}</h1>
                  <h1>Age:{user.age}</h1>

                  <button onClick={() => {increaseAge(user.id, user.age);}} >
                    {" "}Increase Age                  
                  </button>
                  <button onClick={() => {decreaseAge(user.id, user.age);}} >
                    {" "}Decrease Age                  
                  </button>

                  <button onClick={() => {deleteUser(user.id);}} >
                      {" "}Delete User                  
                  </button>
                </div>
              )
            })
          }
        </div>
    </div>
  );
}

export default App;
