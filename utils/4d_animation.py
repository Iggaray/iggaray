import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from mpl_toolkits.mplot3d import Axes3D

# Step 1: Time and original 4D curve
t = np.linspace(0, 200, 2000)
r = np.vstack((
    np.cos(t),
    np.sin(t),
    np.cos(np.sqrt(2)*t),
    np.sin(np.sqrt(2)*t)
)).T  # Shape (N, 4)

# Step 2: Define the normal vector and find orthonormal basis for 3D hyperplane orthogonal to it
n = np.array([1, 1, 1, 1])
n = n / np.linalg.norm(n)

# Use Gram-Schmidt to get 3 orthonormal vectors orthogonal to n
basis = []
candidates = [
    np.array([1, -1, 0, 0]),
    np.array([0, 1, -1, 0]),
    np.array([0, 0, 1, -1])
]

for v in candidates:
    v_proj = v - np.dot(v, n) * n
    for b in basis:
        v_proj -= np.dot(v_proj, b) * b
    norm = np.linalg.norm(v_proj)
    if norm > 1e-10:
        basis.append(v_proj / norm)

# Step 3: Projection matrix (4D to 3D)
proj_matrix = np.vstack(basis).T  # Shape (4, 3)
proj_3d = r @ proj_matrix  # Shape (N, 3)

# Step 4: Setup plot
fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')
ax.set_title('Projected movement in 3D')
line, = ax.plot([], [], [], lw=1, color='darkblue')

# Set plot limits
ax.set_xlim(-2, 2)
ax.set_ylim(-2, 2)
ax.set_zlim(-2, 2)
ax.set_xlabel('Proj X')
ax.set_ylabel('Proj Y')
ax.set_zlabel('Proj Z')

# Step 5: Animation functions
def init():
    line.set_data([], [])
    line.set_3d_properties([])
    return line,

def update(frame):
    line.set_data(proj_3d[:frame, 0], proj_3d[:frame, 1])
    line.set_3d_properties(proj_3d[:frame, 2])
    return line,

ani = FuncAnimation(fig, update, frames=len(t), init_func=init, interval=20, blit=True)

# Optional: show in notebook or script
# plt.show()

# Step 6: Save as GIF
ani.save('projection.gif', writer='pillow', fps=20)
