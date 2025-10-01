import React from 'react'

function ArticlesCard(props) {
  return (
    <a 
      href={props.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block max-w-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow m-2"
    >
      {props.image && (
        <img 
          src={props.image} 
          alt={props.title} 
          className="w-full h-40 object-cover" 
        />
      )}
      <div className="p-4">
        <p className="font-semibold text-lg truncate">{props.title}</p>
       
      </div>
    </a>
  )
}

export default ArticlesCard
