import React, { useState } from 'react';
import './effitrack.css';

const DemoSection = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setFileUploaded(true);

    try {
      const response = await fetch('http://localhost:5000/process-tasks', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      // Simulate AI processing delay
      setTimeout(() => {
        setAnalysisDone(true);
        setTasks(result);
      }, 1000); // Simulate 1-second delay for demo
    } catch (error) {
      console.error('Error processing file:', error);
    }
  };

  const handleDownload = () => {
    const csvContent = [
      ["Task Name", "Priority Level", "Predicted Time", "Suggested Order"],
      ...tasks.map(task => [task.name, task.priority, task.time, task.order])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "optimized_tasks.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setFileUploaded(false);
    setAnalysisDone(false);
    setTasks([]);
  };

  return (
    <div className="demo-section">
      <h2>See EffiTrack AI in Action</h2>
      <p>Experience the power of AI-driven task optimization. Upload your task list and watch EffiTrack AI prioritize and predict completion times in real-time.</p>
      
      {!fileUploaded && (
        <div className="upload-section">
          <h3>Step 1: Upload Your Task List</h3>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileUpload} 
          />
        </div>
      )}
      
      {fileUploaded && !analysisDone && (
        <div className="analysis-section">
          <h3>Step 2: AI Analysis</h3>
          <p>EffiTrack AI is analyzing your tasks...</p>
          <div className="progress-bar">
            <div className="progress-bar-fill"></div>
          </div>
        </div>
      )}
      
      {analysisDone && (
        <div className="result-section">
          <h3>Step 3: View Prioritized Task List</h3>
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Priority Level</th>
                <th>Predicted Time</th>
                <th>Suggested Order</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.priority}</td>
                  <td>{task.time}</td>
                  <td>{task.order}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="download-section">
            <h3>Step 4: Download the Optimized Task List</h3>
            <button onClick={handleDownload}>Download CSV</button>
          </div>
          
          <div className="reset-section">
            <h3>Step 5: Start Over</h3>
            <button onClick={handleReset}>Upload New CSV</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoSection;
