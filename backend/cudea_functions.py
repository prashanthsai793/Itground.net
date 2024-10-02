import pycuda.autoinit
import pycuda.driver as cuda
import numpy as np
from pycuda.compiler import SourceModule

# Define CUDA kernel
kernel_code = """
__global__ void predictTaskTimes(float *taskDurations, float *predictedTimes, int n) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < n) {
        predictedTimes[idx] = taskDurations[idx] * 1.1; // Simple prediction logic
    }
}
"""

mod = SourceModule(kernel_code)
predictTaskTimes = mod.get_function("predictTaskTimes")

def run_cuda_prediction(task_durations):
    n = len(task_durations)

    task_durations_gpu = cuda.mem_alloc(task_durations.nbytes)
    predicted_times_gpu = cuda.mem_alloc(task_durations.nbytes)
    cuda.memcpy_htod(task_durations_gpu, task_durations)

    block_size = 256
    grid_size = (n + block_size - 1) // block_size
    predictTaskTimes(task_durations_gpu, predicted_times_gpu, np.int32(n), block=(block_size, 1, 1), grid=(grid_size, 1))

    predicted_times = np.empty_like(task_durations)
    cuda.memcpy_dtoh(predicted_times, predicted_times_gpu)
    
    return predicted_times

def prioritize_tasks(tasks, criteria):
   
    return sorted(tasks, key=lambda x: x[criteria])
