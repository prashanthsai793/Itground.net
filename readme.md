# EffiTrack AI - Task Optimization with NVIDIA CUDA

/your_project

|-- app.py                 # Main Flask application file
|-- cuda_functions.py      # Contains CUDA kernel code and functions
|-- effitrack.css          # CSS for the React components
|-- EffiTrack.js           # React component for the Effitrack AI
|-- README.md              # This file




EffiTrack AI is a Flask-based application that leverages NVIDIA CUDA to perform predictive time tracking and smart task prioritization. The application takes a CSV file as input, predicts the time required for task completion, and suggests an optimal task order based on AI-driven analysis.

## Features
- **Predictive Time Tracking**: Uses AI to predict task completion times based on historical data.
- **Smart Task Prioritization**: Reorders tasks based on predicted times, urgency, and user efficiency.

## Technologies Used
- **Python**
- **Flask**
- **NVIDIA CUDA with PyCUDA**
- **React.js (for the front-end demo section)**
- **JavaScript**

## Prerequisites

- Python 3.7+
- NVIDIA GPU with CUDA support
- PyCUDA
- Flask

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/effitrack-ai.git
cd effitrack-ai

python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

pip install -r requirements.txt
python app.py
