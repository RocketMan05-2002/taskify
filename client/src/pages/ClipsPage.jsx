import React from 'react';
import Card from '../components/Card';

const ClipsPage = () => {
  const clips = [
    {id:1, clipHeading:"Learn Java", clipDescription:"Look up some good Java learning videos to hone concepts."},
    {id:2, clipHeading:"Learn Maven", clipDescription:"Look up some good Maven tutorials to master build tools."},
    {id:3, clipHeading:"Learn Spring", clipDescription:"Explore Spring framework to understand dependency injection."},
    {id:4, clipHeading:"Learn Springboot", clipDescription:"Learn Spring Boot for rapid backend development."},
    {id:5, clipHeading:"Learn Docker", clipDescription:"Check out Docker tutorials to containerize your apps."},
  ];
  const currentUser = "Abhi";

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      
      {/* Header */}
      <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-200">{currentUser}'s Tasks</h1>
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {clips.map((clip) => (
          <Card 
            key={clip.id} 
            clipHeading={clip.clipHeading} 
            clipDescription={clip.clipDescription} 
          />
        ))}
      </div>
    </div>
  );
};

export default ClipsPage;