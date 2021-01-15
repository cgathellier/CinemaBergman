import axios from 'axios';
import * as React from 'react';
import Post from '../Post/Post';
import Nav from '../Showtime/Nav';
import Showtime from '../Showtime/Showtime';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthModal from '../AuthModal/AuthModal';
import { configJson, configToken } from '../../utils/axiosConfigs';

const JOURS = {
	0: 'DIM.',
	1: 'LUN.',
	2: 'MAR.',
	3: 'MER.',
	4: 'JEU.',
	5: 'VEN.',
	6: 'SAM.',
};

const MOIS = {
	0: 'JAN.',
	1: 'FEV.',
	2: 'MARS',
	3: 'AVR.',
	4: 'MAI',
	5: 'JUIN',
	6: 'JUI.',
	7: 'AOUT',
	8: 'SEP.',
	9: 'OCT.',
	10: 'NOV.',
	11: 'DEC.',
};

const MOIS_FULL = {
	0: 'janvier',
	1: 'février',
	2: 'mars',
	3: 'avril',
	4: 'mai',
	5: 'juin',
	6: 'juillet',
	7: 'août',
	8: 'septembre',
	9: 'octobre',
	10: 'novembre',
	11: 'décembre',
};

export const FilmDetails = ({ name }) => {
	const [filmData, setFilmData] = React.useState([]);
	const [posts, setPosts] = React.useState([]);
	const [showtimes, setShowtimes] = React.useState([]);
	const [nav, setNav] = React.useState([]);
	const [selectedNav, setSelectedNav] = React.useState(0);
	const [stDisplayed, setStDisplayed] = React.useState([]);

	const postTitleRef = React.useRef(null);
	const postTextRef = React.useRef(null);
	const postsContainer = React.useRef(null);

	const filmUrl = window.location.href;
	const filmId = filmUrl.split('/films/')[1];

	const getData = React.useCallback(async () => {
		try {
			await Promise.all([
				axios.get(`/api/films/${filmId}`),
				axios.get(`/api/posts/${filmId}`),
				axios.get(`/api/showtimes/${filmId}`),
			]).then(obj => {
				setFilmData(obj[0].data);
				setPosts(obj[1].data);
				setShowtimes(obj[2].data);
			});
		} catch (error) {
			console.log(error);
		}
		for (let i = 0; i < 7; i++) {
			const currentDate = new Date();
			const nextDate = currentDate.getDate() + i;
			currentDate.setDate(nextDate);
			setNav(nav => [...nav, currentDate]);
		}
	}, [filmId]);

	React.useEffect(() => {
		window.scroll(0, 0);
		getData();
	}, [getData]);

	React.useEffect(() => {
		if (!nav.length > 0) {
			return;
		}
		const dateSelected = nav[selectedNav];
		const navDate = new Date(dateSelected).getDate();
		const navMonth = new Date(dateSelected).getMonth();

		const filteredST = showtimes
			.filter(
				st =>
					new Date(st.day).getDate() === navDate &&
					new Date(st.day).getMonth() === navMonth
			)
			.sort(
				(a, b) =>
					new Date(a.day + 'T' + a.hour + ':00').getTime() -
					new Date(b.day + 'T' + b.hour + ':00').getTime()
			)
			.map((st, index) => (
				<Showtime key={index} id={st._id}>
					{st.hour}
				</Showtime>
			));

		setStDisplayed(filteredST);
	}, [nav, selectedNav, showtimes]);

	const handleClick = async postId => {
		await axios.delete(`/api/posts/${postId}`, configToken);
		const req = await axios.get(`/api/posts/${filmId}`);
		setPosts(req.data);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const newPost = {
				title: postTitleRef.current.value,
				text: postTextRef.current.value,
			};

			const res = await axios.post(`/api/posts/${filmId}`, newPost, configJson);
			postTitleRef.current.value = '';
			postTextRef.current.value = '';
			if (res.status === 201) {
				const req = await axios.get(`/api/posts/${filmId}`);
				setPosts(req.data);
				window.scrollTo({
					behavior: 'smooth',
					top: postsContainer.current.offsetTop - 140,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='details__container'>
				<img src={filmData.snap} alt={filmData.title} className='details__snap' />
				<div className='details__grad'>
					<div>
						<p className='details__title'>{filmData.title}</p>
						<p className='details__genreDuration'>
							{filmData.genre} ({filmData.duration})
							<span className='details__public'>
								{filmData.classification}
							</span>
						</p>
						<a className='details__seancesBtn' href='#showtimes'>
							<i className='far fa-clock'></i> Séances
						</a>
					</div>
					<div>
						<div className='details__presentation'>
							<div className='details__imgContainer'>
								<img src={filmData.poster} alt={filmData.title} />
							</div>
							<div className='details__infos'>
								<p>
									Sortie :
									<span>
										{
											<>
												{' '}
												<Moment format='DD'>
													{filmData.release}
												</Moment>{' '}
												{
													MOIS_FULL[
														new Date(
															filmData.release
														).getMonth()
													]
												}{' '}
												<Moment format='YYYY'>
													{filmData.release}
												</Moment>
											</>
										}
									</span>
								</p>
								<p>
									Réalisé par <span>{filmData.director}</span>
								</p>
								<p>Avec {filmData.actors}</p>
							</div>
						</div>
						<div className='details__synopsis'>{filmData.synopsis}</div>
					</div>
				</div>
			</div>
			<div className='details__stPostsCtn'>
				<div className='details__showtimesCtn' id='showtimes'>
					<div className='details__showtimes'>Séances</div>
					<div className='details__showtimesNavCtn'>
						{nav.map((navDate, index) => {
							const day = navDate.getDay();
							const date = navDate.getDate();
							const month = navDate.getMonth();
							return (
								<Nav
									day={JOURS[day]}
									date={date < 10 ? '0' + date : date}
									month={MOIS[month]}
									index={index}
									selected={index === selectedNav ? 'true' : 'false'}
									handleClick={index => setSelectedNav(index)}
									key={navDate}
								/>
							);
						})}
					</div>
					<div className='details__showtimesEltCtn'>{stDisplayed}</div>
				</div>
				<div className='details__postsContainer' ref={postsContainer}>
					{posts.length > 0 ? (
						<div className='details__postsElt'>
							{posts
								.sort((a, b) => a.date - b.date)
								.map((post, index) => {
									return (
										<Post
											key={index}
											post={post}
											onClick={handleClick}
										/>
									);
								})}
						</div>
					) : (
						''
					)}
					<div className='details__formContainer'>
						{name ? (
							<form
								className='details__form'
								onSubmit={e => handleSubmit(e)}
							>
								<input
									type='text'
									className='details__postTitle'
									placeholder='Titre du commentaire'
									name='title'
									maxLength={40}
									ref={postTitleRef}
								/>
								<textarea
									type='textarea'
									className='details__textarea'
									placeholder='Commentaire'
									name='text'
									ref={postTextRef}
								></textarea>
								<input
									type='submit'
									className='details__submit'
									value='Ajouter un commentaire'
								/>
							</form>
						) : (
							<AuthModal text='Veuillez vous connecter pour poster un commentaire' />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

FilmDetails.propTypes = {
	name: PropTypes.string,
};

const mapStateToProps = state => ({
	name: state.auth.name,
});

export default connect(mapStateToProps)(FilmDetails);
