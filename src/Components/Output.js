
import React, { useState } from 'react';

const PredictionResult = () => {
    const [prediction, setPrediction] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchPrediction = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3001/prediction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ videoPath: '/path/to/video' }) 
            });
            const data = await response.json();
            setPrediction(data.prediction.result);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching prediction:', error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchPrediction} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Fetch Prediction'}
            </button>
            {prediction && (
                <div>
                    <h2>Prediction Result</h2>
                    <p>{prediction}</p>
                </div>
            )}
        </div>
    );
};

export default PredictionResult;
