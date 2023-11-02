import React, {useState,useEffect} from "react";
import appwriteService from "../appwrite/database";

function Todos({userId}) {
  const [todos, setTodos] = useState()
  // const [newTodos, setNewTodo] = useState()
  const [loader, setLoader] = useState(false)
  useEffect(()=>{
    setLoader(true)
    try {
      const getTodos = appwriteService.listDatabase()
      getTodos.then(res=>{setTodos(res.documents)})
    } catch (error) {
      console.error('Database List failed:', error);
    }
    setLoader(false)
  }, [])

  const deleteTodo = async (id)=>{
    try {
      const updatedTodos =  await appwriteService.deleteDatabase(id)
      updatedTodos.then(res=>{setTodos(res.documents)})
      // updatedTodos.then(res=>{console.log(res)})
    } catch (error) {
      console.log('Database Delete failed:', error)
    }
    window.location.reload();
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <p className="text-xl font-bold mb-2">Todo List</p>
        {loader ? (
          <p>Loading ...</p>
        ) : (
          <div>
          {todos &&  todos.map((item)=>{
            // console.log(userId == item.$permissions[0].slice(11,-2))
            // console.log(userId)
            // console.log(item)
            // console.log(item.$permissions[0])
            // console.log("break")
            if(userId == item.$permissions[0].slice(11,-2)){ 
              return(
            <div key={item.$id}>
              <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
                <div>
                  <p>{item.todo}</p>
                </div>
                <div>
                  <span onClick={()=>{deleteTodo(item.$id)}} className="text-red-400 cursor-pointer">Delete</span>
                </div>
              </div>
            </div>)}
          })}
          </div>

          // normal print without any condition 
          // <div>
          //   {todos &&  todos.map((item)=>(
          //     <div key={item.$id}>
          //       {console.log(`item id`,item.$permissions[0].slice(11,-2))}
          //       {console.log(typeof (`item id`,item.$permissions[0].slice(11,-2)))}
          //     <div className="p-4 flex items-center justify-between border-b-2 bg-gray-100 rounded-lg mb-1">
          //       <div>
          //         <p>{item.todo}</p>
          //         {/* <input type="text" value={item.todo} onChange={(e)=>setNewTodo(e.target.value)}/> */}
          //       </div>
          //       {/* <div>
          //         <span onClick={()=>{updateTodo(item.$id)}} className="text-blue-400 cursor-pointer">update</span>
          //       </div> */}
          //       <div>
          //         <span onClick={()=>{deleteTodo(item.$id)}} className="text-red-400 cursor-pointer">Delete</span>
          //       </div>
          //     </div>
          //   </div>
          //   ))}
          // </div>
        )}
      </div>
    </>
  );
}

export default Todos;
