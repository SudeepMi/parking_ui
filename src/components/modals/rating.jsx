import React, { useState } from 'react';

function RatingForm() {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
    // Here you can add your custom logic for handling the rating change
    console.log('Selected Rating:', value);
    // For example, you can send the rating to a server, update a database, or trigger other actions
  };

  return (
    <div className=" w-half mt-8  px-4 py-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Rate This Parking Spot</h2>
      <div className="flex items-center mb-4">
        <span className="text-lg font-semibold mr-4">Your Rating:</span>
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`text-2xl mr-2 focus:outline-none ${num <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => handleRatingChange(num)}
          >
            ⭐
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500">Click on the stars to rate the parking spot. Your feedback is appreciated!</p>
      <p className="text-sm text-gray-600 mt-2 font-bold ">Your rating: {rating}</p>
    </div>
  );
}

export default RatingForm;
