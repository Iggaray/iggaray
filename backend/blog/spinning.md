---
title: "Wandering about spinning"
date: "2025-07-17"
slug: "spinning"
summary: "A counter-clockwise approach to rotating movements."
tags: ["physics", "math", "blue-sky thinking", "visual reasoning"]
---


### "Let's assume that an only-rotating vector moves in circles..."

### – Roberto Dellelis

<p style="text-align: center"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Angular_velocity.svg">

And that's how my former General Mechanics teacher chose to open the topic of rotating frames of reference, a decade ago. He was always eager to start philosophical debates around elementary physics, which I always enjoyed and now remember with some nostalgia.

During that class, however, he just **postulated** the relative velocity formula for the points $\vec r$ of a rigid object "only-rotating" with respect to an inertial frame of reference:

$$
\vec{v} = \vec{\omega} \times \vec{r},
$$

and no debate was triggered concerning the belief underlying the opening statement, which lies at the core of the formula above.

After class, I kept wondering about the nature of rotation. What does rotating mean? Could I find an intuitive and reliable principle to define rotation, and derive the vector product formula from it?

Some years later, an unorthodox heuristic popped up out of the blue. The formula above implies that each successive derivative of position (speed, acceleration, etc.) can be obtained as a product with the constant angular velocity $(\vec \omega \times \cdot)$. Taking derivatives in this world is the same as applying the vector product.

$$
\vec{v} = \vec{\omega} \times \vec r,
$$

$$
\vec{a} = \vec{\omega} \times (\vec{\omega} \times \vec r),
$$

$$
\frac{d^n}{dt^n}\vec{r} = \vec{\omega} \times \cdots \times (\vec{\omega} \times \vec r),
$$

Hence, each derivative's modulus is a constant amplification of the base position's length $|\vec r |$:

$$
|\vec{v}| = \sin(\theta_{\omega, r})|\vec{\omega}| |\vec r|,
$$

$$
|\vec{a}| =  \sin(\theta_{\omega, r})|\vec{\omega}|^2 |\vec r|,
$$

$$
\left|\frac{d^n}{dt^n}\vec{r}\right| = \sin(\theta_{\omega, r})|\vec{\omega}|^n |\vec r|,
$$

Position and all its derivatives have constant lengths in time. Huh... interesting principle.

So let's spin $180°$ (or $\pi$) this reasoning. Can we define rotation as *the* movement that keeps the modulus of position and all its derivatives constant? Does that thing move in circles?

# 2D

To warm up, we can easily prove this statement in the plane:

**First:** the position vector must lie on a circle, to satisfy a constant modulus $|\vec r|$.

**Second:** the rotation's speed must also stay unchanged to satisfy the constant speed condition.

Hence, the only possible movement is a classical uniform rotational motion, where the angular velocity is given by $\omega = |\vec v| / |\vec r|$ (you can think of $\omega$ as the velocity of a unit circle trajectory. So by rescaling our distance metric by $1/|\vec r|$, we get $\omega$ directly from our rescaled $\vec v$).

<img src="https://www.physicshigh.com/uploads/9/8/0/7/98073256/uniform-cirular-translation_orig.gif" jsaction="" class="sFlh5c FyHeAf iPVvYb" style="text-align: center" alt="Circular Motion - Physics High" jsname="kn3ccd">

# 3D

More dimensions mean more freedom of movement. In the realm of three dimensions, the position vector could describe many trajectories along the surface of a sphere: a closed circle is not guaranteed at first sight. We should uncover more restrictions if circular movement truly holds.

<img src="/static/sphere_sine.png" alt="Sphere allows infinite trajectories." itemprop="contentUrl">

The fixed length of position means that velocity cannot have a component parallel to it. It must be orthogonal to the position, at all times. Here is a nice analytical proof:

$$
\frac{d }{dt}(|\vec r|) = 0 \rightarrow \frac{d }{dt}(|\vec r|^2) = 0 \rightarrow  \frac{d }{dt}(\vec r \cdot \vec r) = 0 \rightarrow 2 (\vec v \cdot \vec r) = 0 \rightarrow \vec v \perp \vec r. \;\; (1)
$$

Notice this result extends to any number of dimensions! And not only that: it applies to any of the position's derivatives, which are also constant by initial assumption. That is: each derivative is perpendicular to the following one — and to the previous one:

$$
\vec r^{\,(n)} \perp \vec r^ {\,(n+1)}.
$$

Let's play fitting this sequence of perpendicular derivatives into the 3D world. I'll assign the first axis, $\hat x$, to the position $\vec r$. Then, velocity $\vec v$ should lie on a perpendicular axis, let's say, $\hat y$. Now, it's tempting to assign the remaining axis $\hat z$ to the acceleration $\vec a$. And we would be completely wrong!

Let me show why $\vec a$ and $\vec r$ can't be perpendicular at any time by taking another derivative of equation (1):

$$
\frac{d }{dt}(\vec v \cdot \vec r) = 0 \rightarrow (\vec a \cdot \vec r) + (\vec v \cdot \vec v) = 0 \rightarrow \vec a \cdot \vec r = -|\vec v|^2 < 0 \,\,\, (2)
$$

We can't guarantee they are antiparallel either, since the angle between them is:

$$
\cos \theta_{r, a} = \frac{\vec a \cdot \vec r}{|\vec a||\vec r|} = -\frac{v^2}{a \, r} \,\,\,
$$

which is, in general, different from $180°$.

All we know is that the angle is constant in time and that $\vec a$ lies in a linear combination of the $\hat x$ and $\hat z$ directions.

### Parallel case

If we assume position and acceleration to be parallel, and include the projection result of equation (2), we get:

$$
\vec a = - \frac{v^2}{r^2} \, \vec{r} \,\,\,\, (3)
$$

Now we can prove that position and velocity — and the entire motion — always lie on the same plane. For that, it suffices to show that $\vec r \times \vec v$ is a constant vector:

$$
\frac{d}{dt}(\vec r \times \vec v) = \vec v \times \vec v + \vec r \times \vec a = 0 + 0 = 0,
$$

where all vector products are taken on parallel vectors, so they return null vectors. Hence, the entire movement happens on a plane. This plane's intersection with our restricted sphere of radius $|\vec r|$ leads us to the same circular case as in 2D.

<img src="/static/sphere_plane_intersection.png" alt="Sphere plane intersection.">

A nice detail is that equation (3) represents the movement of a harmonic oscillator, since $\vec a$ is position’s second derivative:

$$
\frac{d^2 \vec r}{dt^2} + \frac{v^2}{r^2}\vec{r} = 0
$$

We can solve separately for each component and get the solution:

$$
r_i = r_{i0}\cos\left(\frac{v}{r}\, t + \phi_i\right).
$$

We know this happens on the plane, so let's choose a reference frame where $r\_{z} = 0$, and impose constant norm for ${\vec r}$:

$$
\vec r = r_0 \left[\cos\left(\frac{v}{r}\, t + \phi_i\right) \hat x + \sin\left(\frac{v}{r}\, t + \phi_i\right) \hat y\right].
$$

This is the equation for a circular movement at constant angular speed $\vec \omega = \frac{v}{r} \hat z$.

### Oblique case

In this case, we can build a linearly independent set of derivatives of $\vec r$ at all times by picking the first three elements of the sequence ${\vec r, \vec v, \vec a}$. Since both $\vec r$ and $\vec a$ are perpendicular to $\vec v$, no linear combination of $\vec r$ and $\vec a$ can cancel out $\vec v$, proving that this triplet of vectors is linearly independent at all times.

In addition, in our 3D world, this set is a full basis on its own. Hence, our three vectors can generate any deeper derivative at all times:

$$
\vec r ^{\,(n)} = a_n \vec{r} + b_n \vec{v} + c_n \vec{a},
$$

where $a_n, b_n, c_n$ are constants depending only on the particular derivative of position we choose.

In particular, it's intriguing what will happen with the next element of the sequence, $d\vec{a}/{dt} = \vec{r}^{\,(3)}$.

This third derivative of position must be perpendicular to its neighbor $\vec a$. And it is also perpendicular to $\vec r$. We can prove it by deriving equation (2) again:

$$
\frac{d }{dt}(\vec a \cdot \vec r) = 0 \rightarrow (\vec r ^{\,(3)} \cdot \vec r) + (\vec a \cdot \vec v) = 0 \rightarrow \vec r ^{\,(3)} \cdot \vec r = 0
$$

The only non-perpendicular base vector left is $\vec v$. As we've shown, second-order neighbors are non-perpendicular. In this case, since we ran out of space, they are necessarily parallel, since $a_3 = c_3 = 0$ and $b_3 \neq 0$:

$$
\vec r ^{\,(3)} = b_3 \vec{v}
$$

Who is $b_3$? We can get it by projecting the third derivative of position onto velocity, since they are parallel:

$$
b_3 = \frac{\vec r ^{\,(3)} \cdot  \vec{v}} {v^2} = - \frac{a^2}{v^2},
$$

where we made use of equation (2) to solve the inner product, adapting it to a different pair of second neighbors: $\vec a \rightarrow \vec r ^{\,(3)}$ and $\vec r \rightarrow \vec v$.

We've arrived at the same differential equation we solved for $\vec r$ in the parallel case, but now for the velocity:

$$
\frac{d^2 \vec v}{dt^2} + \frac{a^2}{v^2}\vec{v} = 0,
$$

$$
\vec v = v_0 \left[\cos\left(\frac{a}{v}\, t + \phi_i\right) \hat x + \sin\left(\frac{a}{v}\, t + \phi_i\right)\hat y\right].
$$

We can recover $\vec r$ by integrating velocity over time, adding nothing more than a constant in the $\hat z$ direction and some phase shift:

$$
\vec r = \frac{v_0^2}{a} \left[\sin\left(\frac{a}{v}\, t + \phi_i\right) \hat x - \cos\left(\frac{a}{v}\, t + \phi_i\right)\hat y\right] + z_0 \hat z.
$$

Once again, the resulting movement describes a circle drawn at angular velocity $\vec \omega = \frac{v}{r} \hat z$, but with a displaced center at altitude $z_0$.

**So Roberto was right: in 2 and 3 dimensions, only-rotating vectors do move in circles!**

# 4D and beyond...

We haven't relied on dimensionality assumptions for **almost** all the steps. The only exception was the 3-element basis we built to prove that velocity and its second derivative must be parallel.

Can we still uncover another restriction, generalizing our result to higher dimensions?

The short answer is no. Things change after 3D. If in doubt, check the following example:

$$
\vec r(t) = (\cos t, \sin t, \cos(\sqrt 2 t), \sin(\sqrt 2 t))
$$

This trajectory has constant radius, and so do all its infinite derivatives. However, it isn't even a closed loop! Not a circle, my friends.

Here I leave a nice 3D projected animation of this curve. Thanks for reading this far. Have fun!

![alt text](/static/projection.gif)


---

In memoriam Roberto Dellelis.
