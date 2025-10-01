import React, { useEffect, useState } from 'react'
import NavBar from '../Component/NavBar'
import Card from '../Component/Card'
import chevron from "../assets/images/chevron.png"
import leftChevron from "../assets/images/left-chevron.png"
import CategoryComponent from '../Component/CategoryComponent'
import Contribute from '../Component/Contribute'
import { useRef } from 'react'
import KnowledgeBanner from '../Component/KnowledgeBanner'

function Resources() {
  const [resources, setResources] = useState([]);
  const [categoryResources, setCategoryResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dialogRef = useRef();
  const [categoryActive, setCategoryActive] = useState(null);

  const categories = [
    "Practice & Coding Challenges",
    "Documentation & References",
    "System Design & Architecture",
    "Tools & Utilities",
    "Quick References & Cheatsheets",
    "Learning Resources & Guides",
    "Collections & Open Source",
  ];

  // Filter with search
  const searchedResources = categoryResources.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Slice for carousel
  const visibleResources = searchedResources.slice(currentIndex, currentIndex + 3);

  const moveRight = () => {
    if (currentIndex < searchedResources.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const moveLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const url = 'https://learnlink-backend-0x63.onrender.com/resources';
    const fetchData = async () => {
      try {
        const request = await fetch(url, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${window.localStorage.getItem('authToken')}` }
        });
        const responseData = await request.json();

        const allResources = responseData.resource || [];
        setResources(allResources);
        setCategoryResources(allResources);
        setCurrentUser(responseData.currentUser || null);

        console.log('Resources:', allResources);
        console.log('Current User:', responseData.currentUser);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    if (!category) {
      setCategoryResources(resources);
      setCategoryActive(null);
    } else {
      const filtered = resources.filter((r) => r.category === category);
      setCategoryResources(filtered);
      setCategoryActive(category);
    }
    setSearchQuery("");
    setCurrentIndex(0);
  };

  const toggleDialogRef = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open") ?
      dialogRef.current.close() :
      dialogRef.current.show();
    console.log("clicked");
  }

  return (
    <>
      <NavBar />

      <div className='mx-4 sm:mx-7 mt-6'>
        <KnowledgeBanner />
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-6 px-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full max-w-md px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentIndex(0);
          }}
        />
      </div>

      {/* Carousel - Desktop: 3 cards with arrows, Mobile: scrollable grid */}
      <div className="mt-8 px-4">
        {/* Desktop Carousel View (hidden on mobile) */}
        <div className="hidden lg:flex justify-center items-center gap-4">
          <button
            onClick={moveLeft}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full hover:bg-gray-100 transition ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <img src={leftChevron} className="w-6 h-6" alt="Previous" />
          </button>

          <div className="flex gap-4 justify-center">
            {visibleResources.length === 0 ? (
              <p className="text-gray-500 py-10">No resources found 😭</p>
            ) : (
              visibleResources.map((i) => (
                <Card
                  key={i._id}
                  likes={i.likes}
                  title={i.title}
                  category={i.category}
                  linkurl={i.url}
                  imageUrl={i.imageUrl}
                  noOfLikes={i.likes?.length || 0}
                  resourceId={i._id}
                  isLikedByUser={i.isLikedByUser}
                  isSavedByUser={i.isSavedByUser}
                />
              ))
            )}
          </div>

          <button
            onClick={moveRight}
            disabled={currentIndex >= searchedResources.length - 3}
            className={`p-2 rounded-full hover:bg-gray-100 transition ${currentIndex >= searchedResources.length - 3 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            <img src={chevron} className="w-6 h-6" alt="Next" />
          </button>
        </div>

        {/* Mobile Grid View (visible on mobile and tablet) */}
        <div className="lg:hidden">
          {searchedResources.length === 0 ? (
            <p className="text-gray-500 py-10 text-center">No resources found 😭</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {searchedResources.map((i) => (
                <Card
                  key={i._id}
                  likes={i.likes}
                  title={i.title}
                  category={i.category}
                  linkurl={i.url}
                  imageUrl={i.imageUrl}
                  noOfLikes={i.likes?.length || 0}
                  resourceId={i._id}
                  isLikedByUser={i.isLikedByUser}
                  isSavedByUser={i.isSavedByUser}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 mt-8 px-4">
        {categories.map((cat, idx) => (
          <CategoryComponent
            key={idx}
            name={cat}
            onClick={() => handleCategoryClick(cat)}
            categoryActive={categoryActive === cat}
          />
        ))}
      </div>

      {/* Contribute Button */}
      <div className='flex justify-center mt-8 mb-8 px-4'>
        <button 
          onClick={toggleDialogRef} 
          className="border-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition text-sm sm:text-base"
        >
          Wanna Contribute Something?
        </button>
      </div>

      {/* Dialog */}
      <dialog 
        ref={dialogRef}
        className="fixed inset-0 m-0 p-0 w-full h-full max-w-none max-h-none bg-black/50 backdrop-blur-sm border-none"
      >
        <div className='flex flex-col items-center justify-center h-full p-5 gap-5'>
          <Contribute onClick={toggleDialogRef} />
        </div>
      </dialog>
    </>
  );
}

export default Resources;


// import React, { useEffect, useState } from 'react'
// import NavBar from '../Component/NavBar'
// import Card from '../Component/Card'
// import chevron from "../assets/images/chevron.png"
// import leftChevron from "../assets/images/left-chevron.png"
// import CategoryComponent from '../Component/categoryComponent'
// import Contribute from '../Component/Contribute'
// import { useRef } from 'react'

// function Resources() {
//   const [resources, setResources] = useState([]);
//   const [categoryResources, setCategoryResources] = useState([]); // after category filter
//   const [searchQuery, setSearchQuery] = useState(""); // NEW
//   const [currentUser, setCurrentUser] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const dialogRef = useRef();


//   const categories = [
//     "Practice & Coding Challenges",
//     "Documentation & References",
//     "System Design & Architecture",
//     "Tools & Utilities",
//     "Quick References & Cheatsheets",
//     "Learning Resources & Guides",
//     "Collections & Open Source",
//   ];

//   // --- Filter with search ---
//   const searchedResources = categoryResources.filter(r =>
//     r.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // --- Slice for carousel ---
//   const visibleResources = searchedResources.slice(currentIndex, currentIndex + 3);

//   const moveRight = () => {
//     if (currentIndex < searchedResources.length - 3) {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   const moveLeft = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   useEffect(() => {
//     const url = 'http://localhost:3001/resources';
//     const fetchData = async () => {
//       try {
//         const request = await fetch(url, {
//           method: 'GET',
//           headers: { 'Authorization': `Bearer ${window.localStorage.getItem('authToken')}` }
//         });
//         const responseData = await request.json();

//         const allResources = responseData.resource || [];
//         setResources(allResources);
//         setCategoryResources(allResources);
//         setCurrentUser(responseData.currentUser || null);

//         console.log('Resources:', allResources);
//         console.log('Current User:', responseData.currentUser);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCategoryClick = (category) => {
//     if (!category) {
//       setCategoryResources(resources); // reset
//     } else {
//       const filtered = resources.filter((r) => r.category === category);
//       setCategoryResources(filtered);
//     }
//     setSearchQuery(""); // clear search when switching category
//     setCurrentIndex(0);
//   };
  
//   //toggling dialog ref
//   const toggleDialogRef = () => {
//     if (!dialogRef.current) {
//       return;
//     }
//     dialogRef.current.hasAttribute("open") ?
//       dialogRef.current.close() :
//       dialogRef.current.show();
//     console.log("clicked");
//   }

//   return (
//     <>
//       <div>Resources</div>
//       <NavBar />

//       {/* 🔍 Search Box */}
//       <div className="flex justify-center my-4">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           className="border px-3 py-2 rounded-md w-1/2"
//           value={searchQuery}
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//             setCurrentIndex(0); // reset carousel when searching
//           }}
//         />
//       </div>

//       {/* Carousel */}
//       <div className="flex flex-wrap justify-center items-center gap-4">
//         <img
//           src={leftChevron}
//           className="w-6 h-6 cursor-pointer"
//           onClick={moveLeft}
//         />

//         {visibleResources.length === 0 ? (
//           <p>No resources found 😭</p>
//         ) : (
//           visibleResources.map((i) => (
//             <Card
//               key={i._id}
//               likes={i.likes}
//               title={i.title}
//               category={i.category}
//               url={i.url}
//               imageUrl={i.imageUrl}
//               noOfLikes={i.likes?.length || 0}
//               resourceId={i._id}
//               isLikedByUser={i.isLikedByUser}
//               isSavedByUser={i.isSavedByUser}
//             />
//           ))
//         )}

//         <img
//           src={chevron}
//           className="w-6 h-6 cursor-pointer"
//           onClick={moveRight}
//         />
//       </div>

//       {/* Categories */}
//       <div className="flex flex-wrap justify-center gap-2 mt-4">
//         <CategoryComponent
//           key="all"
//           name="All"
//           onClick={() => handleCategoryClick(null)}
//         />
//         {categories.map((cat, idx) => (
//           <CategoryComponent
//             key={idx}
//             name={cat}
//             onClick={() => handleCategoryClick(cat)}
//           />
//         ))}
//       </div>
      
//       <button onClick={toggleDialogRef} className="border-2"> want to Contribute Something </button>
      
//       <dialog 
//         ref={dialogRef} 
//         className="fixed inset-0 m-0 p-0 w-full h-full max-w-none max-h-none bg-black/50 backdrop-blur-sm border-none"
//       > 
//         <div className='flex items-center justify-center w-full h-full p-4'> 
//           <Contribute onClick={toggleDialogRef} /> 
//         </div>
//       </dialog>
//     </>
//   );
// }

// export default Resources;


// initially we are getting resources and we are setting resources to them and categories to them 
// we are also rendering visiblelist which is categoryResources.slice(currentIndex, currentIndex + 3); ans since category consist of all resources initally we are seeing every resourcves
//then we are updating our categprylist after a change right ,so handleclciked is passed as a prop 
//wht ahndle click is doing? grabbing which categor is clciked and setting out categorylist with those resources of that category  and then ressting the carasoul
