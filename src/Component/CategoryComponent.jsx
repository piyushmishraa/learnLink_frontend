import React from 'react'

function CategoryComponent(props) {
 
   return (
    <div
      onClick={props.onClick}
      className={`border border-gray-300 rounded-lg p-4 w-64 text-center shadow-md cursor-pointer font-light text-xs 
        ${props.categoryActive ? "bg-gray-100 text-black" : "bg-white hover:bg-gray-100 text-black"}`}
    >
      <p>{props.name}</p>
    </div>
  );
}

export default CategoryComponent