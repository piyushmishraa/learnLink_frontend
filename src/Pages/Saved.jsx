import React, { useEffect, useState } from 'react'
import Card from '../Component/Card';
import NavBar from '../Component/NavBar';

function Saved() {
  const [resources, setResources] = useState([]);
  const [saved, setSaved] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchrequest = async () => {
      const burl = 'https://learnlink-backend-0x63.onrender.com/resources';
      try {
        const request = await fetch(burl, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${window.localStorage.getItem('authToken')}` }
        });
        const data = await request.json();
        setCurrentUser(data.currentUser);
        setResources(data.resource || []);
      } catch (error) {
        console.log("failed to fetch saved page content " + error);
      }
    };
    fetchrequest();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const finalsaved = resources.filter((i) =>
        i.saved.length && i.saved.some((sa) => sa == currentUser)
      );
      setSaved(finalsaved);
    }
  }, [resources, currentUser]);

  return (
    <div className="min-h-screen flex flex-col">
        <NavBar  />
      {/* Header */}
      <div className="px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Saved Resources</h1>
        <p className="text-gray-600 mt-2">All the resources you’ve bookmarked in one place.</p>
      </div>

      {/* Saved Resources */}
      <div className="flex-1 px-6 pb-12 max-w-6xl mx-auto w-full">
        {saved.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saved.map((i) => (
              <Card
                key={i._id}
                likes={i.likes}
                title={i.title}
                category={i.category}
                url={i.url}
                imageUrl={i.imageUrl}
                noOfLikes={i.likes?.length || 0}
                resourceId={i._id}
                isLikedByUser={i.isLikedByUser}
                isSavedByUser={i.isSavedByUser}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-lg">You haven’t saved any resources yet.</p>
            <button
              onClick={() => window.location.href = '/resources'}
              className="mt-4 px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Explore Resources
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} LearnLink. All rights reserved.
      </footer>
    </div>
  );
}

export default Saved;

