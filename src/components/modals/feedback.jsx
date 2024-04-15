import React, { useState } from 'react';

function FeedbackForm() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      feedback: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Add code to handle form submission (e.g., send feedback data to server)
      try {
        const response =  await fetch('http://localhost:4000/spots/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
       
        
        if (response.ok) {
          // Handle success, maybe show a success message
          console.log('Form data submitted successfully!');
        } else {
          // Handle error, maybe show an error message
          console.error('Failed to submit form data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
  
    return (
      <div className=" w-half  mt-8 px-6 py-6  bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Place your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="Enter your name" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="email">Your Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1" htmlFor="feedback">Your Feedback:</label>
            <textarea id="feedback" name="feedback" value={formData.feedback} onChange={handleChange} className="w-full px-3 py-2 border rounded-md resize-none" placeholder="Enter your feedback"></textarea>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600" >Submit</button>
        </form>
      </div>
    );
  }
  
  export default FeedbackForm;