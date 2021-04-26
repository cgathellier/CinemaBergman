export const mockFilm = {
	_id: 'randomID',
	title: 'amadeus',
	director: 'director',
	actors: 'actors',
	duration: 'duration',
	genre: 'genre',
	classification: 'classification',
	release: 'release',
	synopsis: 'synopsis',
	poster: 'poster',
	snap: 'snap',
	showtimes: [{ _id: 'someID', Day: 'lundi', Hour: '12h' }],
};

export const mockShowtime = {
	_id: 'randomID',
	day: '2021-10-10',
	hour: '16:30',
	film: 'randomID',
};

export const mockBookings = {
	_id: 'randomID',
	selectedSeats: ['E4', 'B6'],
	showtimeID: 'randomID',
	userID: 'randomID',
	filmID: 'randomID',
};

export const mockAlert = {
	message: 'random alert message',
	alertType: 'danger',
	id: 'randomID',
};

export const mockPost = {
	_id: 'randomID',
	film: 'filmID',
	user: 'userID',
	name: 'username',
	text: 'text',
	title: 'title',
	date: new Date('2021-01-28T16:11:58.598+00:00'),
};

export const mockFilm2 = {
	_id: 'randomID',
	title: 'blade runner',
	director: 'director',
	actors: 'actors',
	duration: 'duration',
	genre: 'genre',
	classification: 'classification',
	release: 'release',
	synopsis: 'synopsis',
	poster: 'poster',
	snap: 'snap',
};

export const mockFilm3 = {
	_id: 'randomID',
	title: 'fargo',
	director: 'director',
	actors: 'actors',
	duration: 'duration',
	genre: 'genre',
	classification: 'classification',
	release: 'release',
	synopsis: 'synopsis',
	poster: 'poster',
	snap: 'snap',
};

export const mockFilm4 = {
	_id: 'randomID',
	title: 'lost in translation',
	director: 'director',
	actors: 'actors',
	duration: 'duration',
	genre: 'genre',
	classification: 'classification',
	release: 'release',
	synopsis: 'synopsis',
	poster: 'poster',
	snap: 'snap',
};
