import React, { useState, useRef } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { NavBar } from './HomePage';

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files)); 
  };

  const handleSubmit = async () => {
    setLoading(true); 
    const formDataArray = selectedFiles.map((file) => {
      const formData = new FormData();
      formData.append('image', file);
      return formData;
    });

    try {
      const responses = await Promise.all(formDataArray.map((formData) =>
        axios.post('http://localhost:8000/predict/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        })
      ));
      const predictedLabels = responses.map((response) => response.data.predicted_label);
      setPredictions(predictedLabels);
    } catch (error) {
      console.error('Error:', error); 
    } finally {
      setLoading(false); 
    }
  };

  const handleReset = () => {
    setSelectedFiles([]);
    setPredictions([]);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  // Function to get information based on predicted label
  const getPredictionInfo = (label) => {
    switch (label) {
      case 'Mild_Demented':
        return "An MRI scan predicted to indicate mild dementia reveals subtle changes in brain structure, suggesting early-stage cognitive decline. Consulting with a healthcare professional is crucial for confirmation and guidance. Developing a personalized care plan tailored to the individual's needs is essential, focusing on medication, lifestyle adjustments, and support services. Staying socially and mentally engaged, maintaining a healthy lifestyle, and seeking support are vital for managing symptoms and improving quality of life. Monitoring symptoms closely and prioritizing safety precautions can help navigate the challenges of living with dementia. <a href='https://www.alz.org/alzheimers-dementia/what-is-alzheimers'>Click here to know more</a>";
      case 'Moderate_Demented':
        return "An MRI scan indicating moderate dementia suggests significant brain changes associated with advanced cognitive decline. Seeking immediate medical attention for confirmation and treatment is crucial. Developing a comprehensive care plan with healthcare professionals, focusing on medication, therapy, and support services, becomes imperative. Engaging in cognitive exercises, maintaining a healthy lifestyle, and fostering social connections can help manage symptoms and enhance quality of life. Regular monitoring of symptoms and safety precautions are essential to ensure the well-being of the individual and those around them. <a href='https://www.alz.org/alzheimers-dementia/what-is-alzheimers'>Click here to know more</a>";
      case 'Non_Demented':
        return "An MRI scan indicating non-demented status suggests the absence of significant structural changes associated with dementia. The individual should maintain a healthy lifestyle, including regular exercise, a balanced diet, and mental stimulation. Routine check-ups and monitoring cognitive function are still important for overall brain health. Engaging in social activities and hobbies can support cognitive function and well-being. Prioritizing mental health and managing stress levels can also contribute to maintaining cognitive vitality. <a href='https://www.alz.org/alzheimers-dementia/what-is-alzheimers'>Click here to know more</a>";
      case 'Very_Mild_Demented':
        return "An MRI scan indicating Very Mild Demented suggests early signs of cognitive decline. The individual should seek medical evaluation for confirmation and treatment planning. Engage in cognitive exercises and activities to stimulate the brain. Prioritize a healthy lifestyle with regular exercise, a balanced diet, and sufficient sleep. Consider participating in support groups or therapy for emotional support. Discuss medication options with healthcare providers to manage symptoms. Plan for future care needs and legal arrangements. Stay connected with loved ones and maintain social engagement for emotional well-being. <a href='https://www.alz.org/alzheimers-dementia/what-is-alzheimers'>Click here to know more</a>";
      default:
        return "Prediction information not available.";
    }
  };

 
  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="mb-4">Upload Images to predict Alzheimer's Disease</h2>
            <input ref={inputFileRef} type="file" className="form-control mb-3" accept="image/*" multiple onChange={handleFileChange} />
              <button className="btn btn-primary mr-2" onClick={handleSubmit} disabled={selectedFiles.length === 0 || loading}>
                {loading ? 'Loading...' : 'Upload'} 
              </button>    
              &nbsp;
              <button className="btn btn-secondary mr-2" onClick={handleReset} disabled={loading} >
                Reset
              </button>
              
            {predictions.length > 0 && (
              <div>
                {predictions.map((prediction, index) => (
                  <div key={index}>
                    <div className="alert alert-success" role="alert"
                    style={{ marginTop: '20px'}}
                    >
                    Prediction for {selectedFiles[index].name}: {prediction}
                    </div>
                    {/* Display the selected image */}
                    <img 
                      src={URL.createObjectURL(new Blob([selectedFiles[index]], { type: 'image/jpeg' }))} 
                      alt={`Selected ${index + 1}`} 
                      style={{ width: '40%', height: 'auto', marginTop: '20px' }} // Adjust image size here
                    />
                    <div className="mt-3">
                      {/* Additional information about the prediction */}
                      <p dangerouslySetInnerHTML={{ __html: getPredictionInfo(prediction) }} />
                      <hr/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default ImageUpload;
