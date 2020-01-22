/*
 * Random discrete (maximum, offset)
 */
export function randd(max: number, min = 0) {
	return ~~(Math.random() * (max - min) + min);
}

/*
 * Random uniform (maximum, offset)
 */
export function randu(max: number, min = 0) {
	return (Math.random() * (max - min) + min);
}

/*
 * Random gauss (standard deviation, expectation value)
 */
export function randg(sigma = 1, mu = 0) {
	let s = 0, u = 0, v = 0;

	do
	{
		u = randu(1.0, -1.0);
		v = randu(1.0, -1.0);
		s = u * u + v * v;
	} while (s == 0.0 || s >= 1.0);

	return mu + sigma * u * Math.sqrt(-2.0 * Math.log(s) / s);
}

/*
 * Random exponential (decay rate, offset)
 */
export function rande(decay: number, min = 0) {
	return min - Math.log(Math.random()) / decay;
}
