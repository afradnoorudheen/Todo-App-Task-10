import React,{useState,useEffect} from 'react';
import Form from './Form';
import TodoList from './TodoList';



function App() {
  const [inputText, setInputText]=useState("");
  const [todos, setTodos]=useState([]);
  const [status,setStatus]=useState("All");
  const [filteredTodos,setFilteredTodos]=useState([]);

  useEffect(() =>{
    getLocalTodos();
  },[]);


  useEffect(() =>{
    const filterHandler = () =>{
      switch(status){
         case 'completed':
           setFilteredTodos(todos.filter(todo => todo.completed === true));
           break;
           case 'uncompleted':
            setFilteredTodos(todos.filter(todo => todo.completed === false));
            break;  
           default:
             setFilteredTodos(todos);
             break;
      }
    };

    const saveLocalTodos =() =>{
      localStorage.setItem("todos",JSON.stringify(todos)); 
    };

    filterHandler();
    saveLocalTodos();
  },[todos,status]);

  

 /* const filterHandler = () =>{
    switch(status){
       case 'completed':
         setFilteredTodos(todos.filter(todo => todo.completed === true));
         break;
         case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;  
         default:
           setFilteredTodos(todos);
           break;
    }
  };*/
   /*  const saveLocalTodos =() =>{
       localStorage.setItem("todos",JSON.stringify(todos)); 
     };*/
     const getLocalTodos =() =>{
       if(localStorage.getItem("todos")==null){
        localStorage.setItem("todos",JSON.stringify([]));
       }
        else{
         let todoLocal= JSON.parse(localStorage.getItem('todos'));
         setTodos(todoLocal);
        }
       
     };

    return (
    <div className='App'>
    <header>
    <h1>Todo App</h1>
   </header>
    <Form setStatus={setStatus} todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText}/>
    <TodoList filteredTodos={filteredTodos} todos={todos} setTodos={setTodos}/>
    </div>

  );
}

export default App;
