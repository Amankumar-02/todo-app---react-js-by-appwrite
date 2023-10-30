import React, {useState,} from "react";
import appwriteService from "../appwrite/database";
// import config from '../config/config'

function TodoForm() {
  const [todo, setTodo] = useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await appwriteService.createDatabase({todo:todo});
      console.log(`todo added`)
    } catch (error) {
      console.error('Database creation failed:', error);
    }
    window.location.reload()
    e.target.reset();
  }
  // console.log(todo)

  return (
    <>
      <div className="max-w-7xl mx-auto mt-10">
        <form action="" onSubmit={handleSubmit} className="flex justify-center mb-10">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter Todo"
            className="border p-2 w-2/3 rounded-md"
            onChange={(e)=>{setTodo(e.target.value)}}
          />
          <button
            className="bg-purple-500 p-2 text-white ml-2 rounded-md"
            type="submit"
          >
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
}

export default TodoForm;
