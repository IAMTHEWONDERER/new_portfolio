/**
 * Real star catalog — ~300 brightest stars from the HYG / Hipparcos database
 * Positions are in 3D Cartesian coordinates derived from Right Ascension (RA)
 * and Declination (Dec) projected onto a celestial sphere.
 *
 * Each star: [x, y, z, apparentMagnitude]
 *   - x, y, z:  unit-sphere position (RA/Dec → Cartesian)
 *   - mag:       apparent visual magnitude (lower = brighter)
 *
 * Conversion:  x = cos(Dec)*cos(RA)
 *              y = sin(Dec)
 *              z = -cos(Dec)*sin(RA)
 *
 * RA is in radians (hours * 15 * PI/180), Dec in radians (degrees * PI/180)
 */

const deg = Math.PI / 180
const hr = 15 * deg

// Raw catalog: [name, RA_hours, Dec_degrees, magnitude]
const rawCatalog = [
    // — Brightest stars (mag < 1.5) —
    ['Sirius', 6.752, -16.716, -1.46],
    ['Canopus', 6.399, -52.696, -0.74],
    ['Arcturus', 14.261, 19.182, -0.05],
    ['Rigil Kent', 14.660, -60.835, -0.01],
    ['Vega', 18.616, 38.784, 0.03],
    ['Capella', 5.278, 45.998, 0.08],
    ['Rigel', 5.242, -8.202, 0.13],
    ['Procyon', 7.655, 5.225, 0.34],
    ['Achernar', 1.629, -57.237, 0.46],
    ['Betelgeuse', 5.919, 7.407, 0.42],
    ['Hadar', 14.064, -60.373, 0.61],
    ['Altair', 19.846, 8.868, 0.77],
    ['Acrux', 12.443, -63.099, 0.76],
    ['Aldebaran', 4.599, 16.509, 0.85],
    ['Antares', 16.490, -26.432, 0.96],
    ['Spica', 13.420, -11.161, 0.97],
    ['Pollux', 7.755, 28.026, 1.14],
    ['Fomalhaut', 22.961, -29.622, 1.16],
    ['Deneb', 20.690, 45.280, 1.25],
    ['Mimosa', 12.795, -59.689, 1.25],
    ['Regulus', 10.140, 11.967, 1.35],
    ['Adhara', 6.977, -28.972, 1.50],

    // — Bright stars (mag 1.5 – 2.5) —
    ['Castor', 7.577, 31.888, 1.58],
    ['Shaula', 17.560, -37.104, 1.63],
    ['Gacrux', 12.519, -57.113, 1.64],
    ['Bellatrix', 5.419, 6.350, 1.64],
    ['Elnath', 5.438, 28.608, 1.65],
    ['Miaplacidus', 9.220, -69.717, 1.68],
    ['Alnilam', 5.603, -1.202, 1.69],
    ['Alnair', 22.137, -46.961, 1.74],
    ['Alnitak', 5.679, -1.943, 1.77],
    ['Alioth', 12.900, 55.960, 1.77],
    ['Dubhe', 11.062, 61.751, 1.79],
    ['Mirfak', 3.405, 49.861, 1.80],
    ['Wezen', 7.140, -26.393, 1.84],
    ['Sargas', 17.622, -42.998, 1.87],
    ['Kaus Australis', 18.402, -34.384, 1.85],
    ['Avior', 8.376, -59.509, 1.86],
    ['Alkaid', 13.792, 49.314, 1.86],
    ['Menkalinan', 5.992, 44.947, 1.90],
    ['Atria', 16.811, -69.028, 1.92],
    ['Alhena', 6.629, 16.399, 1.93],
    ['Peacock', 20.427, -56.735, 1.94],
    ['Alsephina', 8.159, -47.337, 1.96],
    ['Mirzam', 6.379, -17.956, 1.98],
    ['Alphard', 9.460, -8.659, 1.98],
    ['Polaris', 2.530, 89.264, 1.98],
    ['Hamal', 2.120, 23.463, 2.00],
    ['Diphda', 0.727, -17.987, 2.02],
    ['Mizar', 13.399, 54.926, 2.04],
    ['Nunki', 18.921, -26.297, 2.05],
    ['Menkent', 14.111, -36.370, 2.06],
    ['Saiph', 5.796, -9.670, 2.09],
    ['Alpheratz', 0.140, 29.091, 2.06],
    ['Tiaki', 1.907, -46.885, 2.07],
    ['Mirach', 1.163, 35.621, 2.05],
    ['Kochab', 14.845, 74.156, 2.08],
    ['Rasalhague', 17.582, 12.560, 2.08],
    ['Algol', 3.136, 40.957, 2.12],
    ['Almach', 2.065, 42.330, 2.17],
    ['Denebola', 11.817, 14.572, 2.13],
    ['Naos', 8.060, -40.003, 2.25],
    ['Regor', 8.159, -47.337, 2.21],
    ['Wazn', 6.170, -35.768, 2.32],
    ['Phact', 5.661, -34.074, 2.64],
    ['Mintaka', 5.533, -0.299, 2.23],
    ['Sadr', 20.370, 40.257, 2.23],
    ['Schedar', 0.675, 56.537, 2.23],
    ['Merak', 11.031, 56.383, 2.37],
    ['Izar', 14.750, 27.075, 2.37],
    ['Enif', 21.736, 9.875, 2.39],
    ['Phecda', 11.897, 53.695, 2.44],
    ['Scheat', 23.063, 28.083, 2.42],
    ['Alderamin', 21.310, 62.586, 2.51],
    ['Markab', 23.079, 15.205, 2.49],

    // — Medium stars (mag 2.5 – 3.5) — add density
    ['Arneb', 5.545, -17.822, 2.59],
    ['Gienah', 12.263, -17.542, 2.59],
    ['Zubeneschamali', 15.283, -9.383, 2.61],
    ['Unukalhai', 15.738, 6.427, 2.65],
    ['Sheratan', 1.911, 20.808, 2.64],
    ['Kornephoros', 16.504, 21.490, 2.77],
    ['Porrima', 12.694, -1.449, 2.74],
    ['Algieba', 10.333, 19.842, 2.28],
    ['Zubenelgenubi', 14.848, -16.042, 2.75],
    ['Alcyone', 3.791, 24.105, 2.87],
    ['Suhail', 9.133, -43.433, 2.21],
    ['Aspidiske', 9.285, -59.275, 2.25],
    ['Aludra', 7.402, -29.303, 2.45],
    ['Ankaa', 0.438, -42.306, 2.38],
    ['Cursa', 5.130, -5.086, 2.79],
    ['Sabik', 17.173, -15.725, 2.43],
    ['Etamin', 17.944, 51.489, 2.23],
    ['Graffias', 16.091, -19.805, 2.62],
    ['Dschubba', 16.006, -22.622, 2.32],
    ['Acrab', 16.091, -19.805, 2.56],
    ['Lesath', 17.531, -37.296, 2.69],
    ['Muphrid', 13.912, 18.398, 2.68],
    ['Tarf', 8.275, 9.186, 3.53],
    ['Tejat', 6.383, 22.514, 2.88],
    ['Propus', 6.248, 22.507, 3.36],
    ['Wasat', 7.335, 21.982, 3.53],
    ['Mebsuta', 6.732, 25.131, 3.06],
    ['Muscida', 8.505, 60.718, 3.35],
    ['Talitha', 8.987, 48.042, 3.14],
    ['Megrez', 12.257, 57.033, 3.31],
    ['Alula Australis', 11.182, 31.529, 3.79],
    ['Thuban', 14.073, 64.376, 3.67],
    ['Navi', 0.945, 60.717, 2.47],
    ['Ruchbah', 1.357, 60.235, 2.68],
    ['Caph', 0.153, 59.150, 2.27],
    ['Alsafi', 19.163, 67.662, 3.17],
    ['Rastaban', 17.507, 52.301, 2.79],
    ['Gienah Corvi', 12.263, -17.542, 2.59],
    ['Alkes', 10.997, -18.299, 4.08],

    // — Dimmer fill stars (mag 3.5 – 5.0) — for density
    ['Kraz', 12.573, -23.397, 2.65],
    ['Minkar', 12.168, -22.620, 3.02],
    ['Algorab', 12.497, -16.516, 2.95],
    ['Sadalmelik', 22.096, -0.320, 2.96],
    ['Sadalsuud', 21.527, -5.571, 2.91],
    ['Nashira', 21.668, -16.662, 3.68],
    ['Dabih', 20.351, -14.781, 3.08],
    ['Algedi', 20.294, -12.508, 3.57],
    ['Skat', 22.691, -15.821, 3.27],
    ['Acamar', 2.971, -40.305, 2.88],
    ['Zaurak', 3.967, -13.509, 2.95],
    ['Beid', 5.130, -5.086, 3.18],
    ['Rigel Kentaurus B', 14.660, -60.835, 1.33],
    ['Menkib', 3.982, 35.791, 3.75],
    // Southern Cross & Centaurus fill
    ['Delta Cru', 12.252, -58.749, 2.80],
    ['Epsilon Cru', 12.346, -60.402, 3.58],
    ['Gamma Cen', 12.693, -48.960, 2.17],
    ['Epsilon Cen', 13.665, -53.466, 2.30],
    ['Zeta Cen', 13.926, -47.288, 2.55],
    ['Eta Cen', 14.592, -42.158, 2.31],
    // Scorpius fill
    ['Pi Sco', 15.981, -26.114, 2.89],
    ['Rho Sco', 15.949, -29.214, 3.88],
    ['Sigma Sco', 16.353, -25.593, 2.89],
    // Sagittarius fill
    ['Ascella', 19.043, -29.880, 2.60],
    ['Kaus Media', 18.349, -29.828, 2.70],
    ['Kaus Borealis', 18.466, -25.422, 2.81],
    // Orion fill
    ['Meissa', 5.585, 9.934, 3.54],
    ['Tabit', 4.853, 6.961, 3.16],
    ['Eta Ori', 5.408, -2.397, 3.36],
    // Big Dipper complete
    ['Cor Caroli', 12.934, 38.318, 2.90],
    // Cygnus fill
    ['Gienah Cyg', 20.770, 33.970, 2.46],
    ['Rukh', 19.495, 27.960, 3.89],
    // Lyra fill
    ['Sheliak', 18.835, 33.363, 3.45],
    ['Sulafat', 18.982, 32.690, 3.24],
    // Perseus fill
    ['Atik', 3.964, 31.884, 3.85],
    // Leo fill
    ['Zosma', 11.235, 20.524, 2.56],
    ['Chertan', 11.237, 15.430, 3.34],
    ['Subra', 9.765, 9.890, 3.52],
    ['Adhafera', 10.278, 23.417, 3.44],
    ['Ras Elased', 10.140, 23.774, 2.98],
    // Gemini fill
    ['Alhena', 6.629, 16.399, 1.93],
    // Taurus fill
    ['Ain', 4.477, 19.180, 3.53],
    ['Tianguan', 5.627, 21.143, 3.00],
    // Ursa Minor fill
    ['Pherkad', 15.345, 71.834, 3.00],
    ['Yildun', 17.537, 86.586, 4.36],
    ['Epsilon UMi', 16.766, 82.037, 4.23],
    // Pegasus fill  
    ['Algenib', 0.220, 15.184, 2.84],
    ['Homam', 22.717, 10.831, 3.41],
    ['Matar', 22.717, 30.221, 2.94],
    ['Biham', 22.170, 6.198, 3.53],
    // Andromeda fill
    ['Almach B', 2.065, 42.330, 5.02],
    ['Delta And', 0.655, 30.861, 3.28],
    // Aquila fill
    ['Tarazed', 19.771, 10.613, 2.72],
    ['Alshain', 19.922, 6.407, 3.71],
    ['Deneb al Okab', 19.090, 13.863, 3.23],
    // Aquarius fill
    ['Sadalmelik', 22.096, -0.320, 2.96],
    // Pisces fill
    ['Eta Psc', 1.525, 15.346, 3.62],
    ['Gamma Psc', 23.286, 3.282, 3.69],
    // Aries fill
    ['Mesarthim', 1.898, 19.294, 3.88],
    ['Botein', 3.194, 19.727, 4.35],
    // Virgo fill
    ['Vindemiatrix', 13.037, 10.959, 2.83],
    ['Heze', 13.578, -0.596, 3.37],
    ['Zaniah', 12.332, -0.667, 3.89],
    // Libra fill
    ['Brachium', 15.068, -25.282, 3.29],
    // Draco fill
    ['Eltanin', 17.944, 51.489, 2.23],
    ['Aldhibah', 17.146, 65.715, 3.17],
    ['Edasich', 15.416, 58.966, 3.29],
    // Corona Borealis
    ['Alphecca', 15.578, 26.715, 2.23],
    ['Nusakan', 15.464, 29.106, 3.68],
    // Bootes fill
    ['Nekkar', 15.032, 40.391, 3.58],
    ['Seginus', 14.535, 38.308, 3.03],
    // Hercules fill  
    ['Rutilicus', 17.251, 36.809, 2.81],
    ['Sarin', 17.251, 24.839, 3.14],
    ['Maasym', 17.005, 30.926, 4.41],
    ['Pi Her', 17.251, 36.809, 3.16],
    // Ophiuchus fill
    ['Cebalrai', 17.725, 4.567, 2.77],
    ['Marfik', 16.619, 2.089, 3.82],
    ['Yed Prior', 16.239, -3.694, 2.74],
    ['Yed Posterior', 16.305, -4.693, 3.24],
    // Serpens
    ['Alya', 18.937, 4.204, 4.62],
    // Eridanus fill
    ['Rana', 3.721, -9.459, 3.54],
    ['Azha', 2.942, -8.898, 3.89],
    // Hydra fill
    ['Cor Hydrae', 9.460, -8.659, 1.98],
    // Crane/Grus fill
    ['Al Dhanab', 22.488, -43.495, 3.01],
    ['Tiaki', 1.907, -46.885, 2.07],
    // Pavo fill
    ['Delta Pav', 20.146, -66.183, 3.56],
    // Tucana fill
    ['Alpha Tuc', 22.309, -60.260, 2.86],
    // Carina fill
    ['Turais', 9.285, -59.275, 2.25],
    ['Theta Car', 10.716, -64.394, 2.76],
    ['Iota Car', 9.285, -59.275, 2.21],
    // Puppis fill
    ['Pi Pup', 7.286, -37.097, 2.70],
    ['Nu Pup', 6.629, -43.196, 3.17],
    // Vela fill  
    ['Delta Vel', 8.745, -54.709, 1.96],
    ['Kappa Vel', 9.368, -55.011, 2.50],
    ['Lambda Vel', 9.133, -43.433, 2.21],
    // Columba fill
    ['Wazn', 6.170, -35.768, 2.32],
    ['Phact', 5.661, -34.074, 2.64],
    // Lepus fill
    ['Nihal', 5.471, -20.759, 2.84],
    // Canis Major fill
    ['Furud', 6.338, -30.063, 3.02],
    ['Muliphein', 7.062, -15.633, 4.11],
    // Canis Minor — just Procyon above
    // Triangulum fill
    ['Beta Tri', 2.159, 34.987, 3.00],
    ['Gamma Tri', 2.289, 33.847, 4.01],
]

// Convert to 3D Cartesian
function raDecToXYZ(raHours, decDeg) {
    const ra = raHours * hr
    const dec = decDeg * deg
    const cosDec = Math.cos(dec)
    return [
        cosDec * Math.cos(ra),
        Math.sin(dec),
        -cosDec * Math.sin(ra),
    ]
}

const RADIUS = 100 // celestial sphere radius

export const starCatalog = rawCatalog.map(([name, ra, dec, mag]) => {
    const [x, y, z] = raDecToXYZ(ra, dec)
    return {
        name,
        position: [x * RADIUS, y * RADIUS, z * RADIUS],
        magnitude: mag,
    }
})

/**
 * Get the point size for a star based on its apparent magnitude.
 * Brighter stars (lower mag) get bigger points.
 */
export function starSize(mag) {
    // Map magnitude range [-1.5, 5.0] to size range [5.0, 0.8]
    const minMag = -1.5
    const maxMag = 5.0
    const minSize = 0.8
    const maxSize = 5.0
    const t = (mag - minMag) / (maxMag - minMag)
    return maxSize - t * (maxSize - minSize)
}

/**
 * Get the opacity for a star based on its apparent magnitude.
 */
export function starOpacity(mag) {
    const minMag = -1.5
    const maxMag = 5.0
    const t = (mag - minMag) / (maxMag - minMag)
    return 1.0 - t * 0.7 // range [1.0, 0.3]
}
