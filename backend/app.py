from flask import Flask, request, jsonify
import numpy as np
from cuda_functions import run_cuda_prediction
from cuda_functions import run_cuda_prediction, prioritize_tasks

app = Flask(__name__)

@app.route('/process-tasks', methods=['POST'])
def process_tasks():
    csv_file = request.files['file']
    task_durations = np.loadtxt(csv_file, delimiter=',')
    
    predicted_times = run_cuda_prediction(task_durations)

    tasks = [{"name": f"Task {i+1}", "priority": "High", "time": predicted_times[i], "order": i+1} for i in range(len(predicted_times))]
    
    return jsonify(tasks)
    
prioritized_tasks = prioritize_tasks(tasks, 'time')

if __name__ == '__main__':
    app.run(debug=True)
