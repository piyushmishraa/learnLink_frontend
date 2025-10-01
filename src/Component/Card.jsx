// import React, { useState } from 'react';
// import unheart from "../assets/images/unheart.png";
// import heart from "../assets/images/heart.png";
// import save from "../assets/images/save.png";
// import saved from "../assets/images/saved.png";

// function Card(props) {
//   const title = props.title;
//   const imageUrl = props.imageUrl;
//   const [noOfLikes, setNoOfLikes] = useState(props.noOfLikes);
//   const [isLiked, setIsLiked] = useState(props.isLikedByUser || false);
//   const [isSaved, setIsSaved] = useState(props.isSavedByUser);
//   const resourceId = props.resourceId;

//   const actualStateOfLike = isLiked ? heart : unheart;
//   const actualStateOfSave = isSaved ? saved : save;

//   const handleClickLike = async () => {
//     const newLikedState = !isLiked;
//     setIsLiked(newLikedState);
//     setNoOfLikes(prev => prev + (newLikedState ? 1 : -1));

//     try {
//       const url = `http://localhost:3001/resources/${resourceId}/like`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${window.localStorage.getItem('authToken')}` }
//       });
//       if (!response.ok) throw new Error("API request failed");
//     } catch (error) {
//       console.log(error);
//       setIsLiked(isLiked);
//       setNoOfLikes(prev => prev + (newLikedState ? -1 : 1));
//     }
//   };

//   const handleClickSave = async () => {
//     const newSavedState = !isSaved;
//     setIsSaved(newSavedState);

//     try {
//       const url = `http://localhost:3001/resources/${resourceId}/save`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${window.localStorage.getItem('authToken')}` }
//       });
//       if (!response.ok) throw new Error("API request failed");
//     } catch (error) {
//       console.log(error + " save error from frontend");
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xl mx-auto my-4 flex flex-col items-center">
//       {imageUrl && <img src={imageUrl} alt={title} className="w-full h-36 object-cover" />}
//       <div className="p-4 w-full">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
//         <p className="text-gray-600 text-sm mt-1">Likes: {noOfLikes}</p>
//         <div className="flex space-x-3 mt-2">
//           <img 
//             src={actualStateOfLike} 
//             className="w-6 h-6 cursor-pointer" 
//             onClick={handleClickLike} 
//             alt="Like button"
//           />
//           <img 
//             src={actualStateOfSave} 
//             className="w-6 h-6 cursor-pointer" 
//             onClick={handleClickSave} 
//             alt="Save button"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;
import React, { useState } from 'react';
import unheart from "../assets/images/unheart.png";
import heart from "../assets/images/heart.png";
import save from "../assets/images/save.png";
import saved from "../assets/images/saved.png";

function Card(props) {
  const title = props.title;
  const imageUrl = props.imageUrl;
  const [noOfLikes, setNoOfLikes] = useState(props.noOfLikes);
  const [isLiked, setIsLiked] = useState(props.isLikedByUser || false);
  const [isSaved, setIsSaved] = useState(props.isSavedByUser);
  const resourceId = props.resourceId;
  const linkurl=props.linkurl;

  const actualStateOfLike = isLiked ? heart : unheart;
  const actualStateOfSave = isSaved ? saved : save;

  const handleClickLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setNoOfLikes(prev => prev + (newLikedState ? 1 : -1));

    try {
      const url = `https://learnlink-backend-0x63.onrender.com/resources/${resourceId}/like`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${window.localStorage.getItem('authToken')}` }
      });
      if (!response.ok) throw new Error("API request failed");
    } catch (error) {
      console.log(error);
      setIsLiked(isLiked);
      setNoOfLikes(prev => prev + (newLikedState ? -1 : 1));
    }
  };

  const handleClickSave = async () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);

    try {
      const url = `https://learnlink-backend-0x63.onrender.com/resources/${resourceId}/save`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${window.localStorage.getItem('authToken')}` }
      });
      if (!response.ok) throw new Error("API request failed");
    } catch (error) {
      console.log(error + " save error from frontend");
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden w-full max-w-sm mx-auto my-3 border border-gray-200">
      {imageUrl && (
        <div className="w-full h-40 bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-gray-900 font-semibold text-lg truncate leading-tight mb-3">
          {title}
        </h3>
        <a
          href={linkurl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700 block mb-3"
        >
          Visit Resource
        </a>

        {/* Like + Save Buttons */}
        <div className="flex items-center space-x-4">
          {/* Heart + Likes */}
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={handleClickLike}
          >
            <img
              src={actualStateOfLike}
              className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
              alt="Like button"
            />
            <span className="text-gray-600 text-sm">{noOfLikes}</span>
          </div>

          {/* Save Button */}
          <div
            className="flex items-center cursor-pointer"
            onClick={handleClickSave}
          >
            <img
              src={actualStateOfSave}
              className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
              alt="Save button"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;




//plan->on click like a post request should be made for liking shit
//plan->on click like a post request should be made for liking shit

// return (
//     <div className="group cursor-pointer">
//       <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-4">
//         {imageUrl ? (
//           <img 
//             src={imageUrl} 
//             alt={title}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400"></div>
//         )}
//       </div>
//       <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition">
//         {title}
//       </h3>
//       <p className="text-gray-600 text-sm mb-3">
//         {props.category && `${props.category} • `}A comprehensive resource for developers and learners.
//       </p>
//       <div className="flex items-center justify-between">
//         <span className="text-gray-500 text-sm">{noOfLikes}</span>
//         <div className="flex gap-2">
//           <button 
//             onClick={handleClickLike}
//             className={`text-xs px-2 py-1 rounded transition ${
//               isLiked 
//                 ? 'bg-red-50 text-red-600' 
//                 : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
//             }`}
//           >
//             {isLiked ? '♥' : '♡'}
//           </button>
//           <button 
//             onClick={handleClickSave}
//             className={`text-xs px-2 py-1 rounded transition ${
//               isSaved 
//                 ? 'bg-blue-50 text-blue-600' 
//                 : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
//             }`}
//           >
//             {isSaved ? '★' : '☆'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );