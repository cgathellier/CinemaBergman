export interface IReduxState {
	auth: { token: string; name: string | null; isAdmin: boolean; _id: string | null };
	alert: IAlert[];
	films: IFilm[];
	modal: { displayModal: boolean };
}

export interface IFilm {
	_id?: string;
	title: string;
	director: string;
	actors: string;
	duration: string;
	genre: string;
	classification: string;
	release: string;
	synopsis: string;
	poster: string | undefined;
	snap: string | undefined;
	showtimes?: IShowtimes[];
}

export interface IFilmForm {
	_id?: string;
	title: string;
	director: string;
	actors: string;
	duration: string;
	genre: string;
	classification: string;
	release: string;
	synopsis: string;
	poster: string | File;
	snap: string | File;
	showtimes?: IShowtimes[];
}

export interface IShowtimes {
	_id?: string;
	Day: string;
	Hour: string;
}

export interface IAdminActionsPayload {
	title?: string;
	director?: string;
	actors?: string;
	duration?: string;
	genre?: string;
	classification?: string;
	release?: string;
	synopsis?: string;
	poster?: string;
	snap?: string;
}

export interface IAlert {
	message: string;
	alertType: string;
	id: string;
}

export interface IPost {
	_id: string;
	film: string;
	user: string;
	name: string;
	text: string;
	title: string;
	date: Date;
}

export interface IShowtime {
	_id: string;
	day: string;
	hour: string;
	film: string;
}

export interface IBookings {
	_id: string;
	selectedSeats: string[];
	showtimeID: string;
	userID: string;
	filmID: string;
}
