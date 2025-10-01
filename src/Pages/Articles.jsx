import React, { useEffect, useState } from 'react'
import ArticlesCard from '../Component/ArticlesCard';
import NavBar from '../Component/NavBar';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const url = "https://learnlink-backend-0x63.onrender.com/articles";
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const call = await fetch(url, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${window.localStorage.getItem('authToken')}` 
          }
        });
        
        if (!call.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const calldata = await call.json();
        setArticles(calldata);
        setError(null);
      } catch (error) {
        console.log("trouble while fetching articles:", error);
        setError("Unable to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, []);
  
  return (
    <>
      <NavBar />
      <div className='min-h-screen bg-gray-50'>
        {/* Header section with better mobile padding */}
        <div className='px-4 py-6 sm:px-6 lg:px-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
            Articles
          </h1>
          <p className='text-gray-600 text-sm sm:text-base'>
            Discover the latest insights and knowledge
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className='mx-4 sm:mx-6 lg:mx-8 mb-6'>
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
              {error}
            </div>
          </div>
        )}

        {/* Articles grid with improved responsive spacing */}
        {!loading && !error && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 pb-8'>
            {articles.length > 0 ? (
              articles.map((i) => (
                <ArticlesCard 
                  key={i.id} 
                  description={i.description} 
                  title={i.title} 
                  url={i.url} 
                  image={i.social_image}
                />
              ))
            ) : (
              <div className='col-span-full text-center py-20 text-gray-500'>
                No articles available at the moment.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Articles;