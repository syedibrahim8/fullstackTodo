import {useState,useEffect} from 'react';
import axios from 'axios'

function Add() {
  const API = import.meta.env.VITE_URL;
  const [todos,setTodos] = useState([]);
  const [title,setTitle] = useState("");
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [editId,setEditId] = useState(null);
  const [editTitle,setEditTitle] = useState("");

  const getAllTodods = async ()=>{
    try {
      const response = await axios.get(`${API}/getall`);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  useEffect(()=>{
    getAllTodods();
  },[])

  const addTodo = async () => {
    try {
      if(!title){
        setError("Bhai kuch likho na ji");
        return
      }
      let response = await axios.post(`${API}/add`,{title})
      setTitle("")
      setError("")
      setSuccess(response.data.msg)
      getAllTodods()
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      setError("");
      await axios.delete(`${API}/delete/${id}`)
      setTodos((X)=>X.filter((todo)=>todo._id !== id))
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  const startEdit = async (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);   
  }

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
  }

  const updateTodo = async (id) => {
    try {
      if(!editTitle){
        setError("Title required")
        return;
      }
      await axios.put(`${API}/update/${id}`,{title:editTitle})
      setSuccess("Todo Updated")
      setEditId(null);
      setEditTitle("");
      getAllTodods();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  return (
    <>
    <div className='min-h-screen bg-linear-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4'>
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl p-6 border border-white/40">
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800 tracking-tight'>Todo MERN Stack App</h1>
        {
          error && (
            <p className='text-red-500 text-sm text-center mb-3'>{error}</p>
          )
        }
        {
          success && (
            <p className='text-green-500 text-sm text-center mb-3'>{success}</p>
          )
        }
        <div className='flex gap-2 mb-5'>
          <input type="text" value={title} onChange={(e)=>{
            setTitle(e.target.value)
            setSuccess("")
            setError("")
          }}
          placeholder='Add a new Todo'
          className='flex-1 rounded-xl border border-gray-300 px-4 py-2 text-gray-800 
               focus:outline-none focus:ring-2 focus:ring-indigo-400 
               focus:border-indigo-400 transition'
          />
          <button onClick={()=>{
            addTodo()
          }}
          className='bg-indigo-500 hover:bg-indigo-600 active:scale-95 
               transition text-white font-semibold px-4 py-2 rounded-xl shadow-md cursor-pointer'>Add Todo</button>
        </div>
        <ul className='space-y-3'>
          {
            todos.map((todo,index)=>(
              <li key={todo._id}
              className='flex items-center justify-between gap-2 rounded-xl border border-gray-200 
             bg-white px-3 py-2 shadow-sm hover:shadow-md transition'
              >
                {editId === todo._id ? (
                  <input value={editTitle}
                   onChange={(e) => setEditTitle(e.target.value)}
                   className='flex-1 rounded-lg border border-gray-300 px-3 py-1
               focus:outline-none focus:ring-2 focus:ring-green-400'
                   />
                ):(
                <span className='flex-1 font-semibold text-gray-800 break-words'>
                  {index+1}.{todo.title}
                </span>
              )}

              <div className='flex gap-2'>
                  {editId === todo._id ? (
                    <>
                    <button onClick={()=>updateTodo(todo._id)}
                      className='bg-green-500 hover:bg-green-600 active:scale-95 
                   transition text-white px-3 py-1 rounded-lg text-sm cursor-pointer'
                      >
                      Save
                    </button>

                     <button
                        onClick={cancelEdit}
                        className="bg-gray-400 hover:bg-gray-500 active:scale-95 
                   transition text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                      >
                      Cancel
                      </button>
                    </>
                  ):(
                     <>
                      <button
                        onClick={() => startEdit(todo)}
                        className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 
                   transition text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="bg-red-500 hover:bg-red-600 active:scale-95 
                   transition text-white px-3 py-1 rounded-lg text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </>
                  )}
              </div>                
              </li>
            ))
          }
        </ul>
      </div>
    </div>
    </>
  )
}

export default Add