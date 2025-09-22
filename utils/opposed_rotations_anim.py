# Re-run the animation code after reset, now including a static midpoint circle

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, PillowWriter

# --- Scene parameters ---
R = 1.2
gap = 2.0
omega = 2*np.pi/6.0
fps = 30
duration = 6
frames = int(duration * fps)

# --- Camera ---
y_cam = 6.0
f = 4.0

def project(P):
    P = np.asarray(P)
    x = P[..., 0]
    y = P[..., 1]
    z = P[..., 2]
    denom = (y_cam - y)
    u = f * x / denom
    v = f * z / denom
    return np.stack([u, v], axis=-1)

phi = np.linspace(0, 2*np.pi, 400)
left_rim = np.stack([np.full_like(phi, -gap), R*np.cos(phi), R*np.sin(phi)], axis=1)
right_rim = np.stack([np.full_like(phi, gap), R*np.cos(phi), R*np.sin(phi)], axis=1)
shaft_pts = np.array([[-gap, 0, 0], [gap, 0, 0]])

fig, ax = plt.subplots(figsize=(8, 4))
ax.set_aspect('equal', adjustable='box')
ax.axis('off')

left_rim_line, = ax.plot([], [], lw=2, color='black')
right_rim_line, = ax.plot([], [], lw=2, color='black')
shaft_line, = ax.plot([], [], lw=1, alpha=0.35)

left_mark, = ax.plot([], [], lw=3)
right_mark, = ax.plot([], [], lw=3)

# --- Static midpoint blue circle ---
midpoint_3d = np.array([0.0, 0.0, 0.0])
midpoint_2d = project(midpoint_3d)
mid_circle = plt.Circle(midpoint_2d, 0.1, color='blue')
ax.add_patch(mid_circle)

ax.text(0, -2.2, "Perspective view: facing disks rotate oppositely", ha='center')

all_pts = np.vstack([left_rim, right_rim, shaft_pts])
UV = project(all_pts)
ux, vx = UV[:,0], UV[:,1]
pad = 0.3
ax.set_xlim(ux.min()-pad, ux.max()+pad)
ax.set_ylim(vx.min()-pad-0.2, vx.max()+pad+0.2)

def mark_segment(center_x, theta, scale=0.95):
    P0 = np.array([center_x, 0.0, 0.0])
    Pr = np.array([center_x, scale*R*np.cos(theta), scale*R*np.sin(theta)])
    return project(np.vstack([P0, Pr]))

def init():
    left_rim_line.set_data(*project(left_rim).T)
    right_rim_line.set_data(*project(right_rim).T)
    shaft_line.set_data(*project(shaft_pts).T)
    theta0 = np.pi/2
    L = mark_segment(-gap, theta0)
    Rm = mark_segment(gap, theta0)
    left_mark.set_data(L[:,0], L[:,1])
    right_mark.set_data(Rm[:,0], Rm[:,1])
    return left_rim_line, right_rim_line, shaft_line, left_mark, right_mark, mid_circle

def update(frame):
    t = frame / fps
    theta_left = np.pi/2 + omega*t
    theta_right = np.pi/2 + omega*t
    L = mark_segment(-gap, theta_left)
    Rm = mark_segment(gap, theta_right)
    left_mark.set_data(L[:,0], L[:,1])
    right_mark.set_data(Rm[:,0], Rm[:,1])
    return left_mark, right_mark, mid_circle

anim = FuncAnimation(fig, update, init_func=init, frames=frames, interval=1000/fps, blit=True)

outfile = "coupled_disks_perspective_midpoint.gif"
anim.save(outfile, writer=PillowWriter(fps=fps))

outfile
