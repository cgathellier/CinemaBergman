import * as React from 'react';
import { connect } from 'react-redux';
import Arrows from './Arrows/Arrows';
import Slider from './Slider/Slider';
import Slide from './Slide/Slide';
import Dot from './Dots/Dot';

const initialState = {
	activeSlide: 0,
	transition: 0.5,
	translate: 0,
	width: 0,
	slides: [],
	initialOffset: 0,
	offset: null,
	swipping: false,
};

const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'INIT_SLIDES': {
			return {
				...state,
				slides: payload.slides,
				translate: payload.translate,
				width: payload.width,
				transition: 0,
			};
		}
		case 'MOVE_START': {
			return { ...state, swipping: true, initialOffset: payload };
		}
		case 'NEXT_SLIDE': {
			return {
				...state,
				offset: 0,
				initialOffset: 0,
				swipping: false,
				translate: payload.translate,
				activeSlide: payload.activeSlide,
			};
		}
		case 'KEEP_SLIDE': {
			return {
				...state,
				initialOffset: 0,
				offset: 0,
				swipping: false,
				translate: payload,
			};
		}
		case 'PREVIOUS_SLIDE': {
			return {
				...state,
				translate: 0,
				offset: 0,
				initialOffset: 0,
				swipping: false,
				activeSlide: payload,
			};
		}
		case 'SETUP_SLIDES': {
			return {
				...state,
				transition: 0,
				slides: payload.slides,
				translate: payload.translate,
			};
		}
		case 'RESIZE': {
			return {
				...state,
				transition: 0,
				width: payload.width,
				translate: payload.translate,
			};
		}
		case 'RESET_TRANSITION': {
			return { ...state, transition: 0.5 };
		}
		default:
			return state;
	}
};

const Carousel = ({ films }) => {
	const news = films.filter((_, index) => index < 4);
	const lastSlide = news[news.length - 1];
	const firstSlide = news[0];
	const secondSlide = news[1];

	const nextSlideRef = React.useRef();
	const transitionRef = React.useRef();
	const resizeRef = React.useRef();
	const widthRef = React.useRef();

	const [state, dispatch] = React.useReducer(reducer, initialState);

	const {
		activeSlide,
		transition,
		translate,
		width,
		slides,
		initialOffset,
		offset,
		swipping,
	} = state;

	React.useEffect(() => {
		dispatch({
			type: 'INIT_SLIDES',
			payload: {
				slides: [lastSlide, firstSlide, secondSlide],
				translate: widthRef.current.offsetWidth,
				width: widthRef.current.offsetWidth,
			},
		});
	}, [lastSlide, firstSlide, secondSlide]);

	React.useEffect(() => {
		nextSlideRef.current = nextSlide;
		transitionRef.current = setupSlides;
		resizeRef.current = handleResize;
	});

	React.useEffect(() => {
		const play = () => {
			nextSlideRef.current();
		};

		const transitionEvent = e => {
			if (e.target.className.includes('slider')) {
				transitionRef.current();
			}
		};

		const resize = () => {
			resizeRef.current();
		};

		if (!swipping) {
			const interval = setInterval(play, 6000);
			window.addEventListener('transitionend', transitionEvent);
			window.addEventListener('resize', resize);
			return () => {
				clearInterval(interval);
				window.removeEventListener('transitionend', transitionEvent);
				window.removeEventListener('resize', resize);
			};
		} else {
			window.addEventListener('transitionend', transitionEvent);
			window.addEventListener('resize', resize);
			return () => {
				window.removeEventListener('transitionend', transitionEvent);
				window.removeEventListener('resize', resize);
			};
		}
	}, [swipping]);

	React.useEffect(() => {
		if (transition === 0) {
			dispatch({ type: 'RESET_TRANSITION' });
		}
	}, [transition]);

	const handleResize = () => {
		dispatch({
			type: 'RESIZE',
			payload: {
				width: widthRef.current.offsetWidth,
				translate: widthRef.current.offsetWidth,
			},
		});
	};

	const setupSlides = () => {
		let slidesArr = [];
		if (activeSlide === news.length - 1) {
			// le film affiché est le dernier de la liste
			slidesArr = [news[news.length - 2], news[news.length - 1], news[0]];
		} else if (activeSlide === 0) {
			// le film affiché est le premier de la liste
			slidesArr = [news[news.length - 1], news[0], news[1]];
		} else {
			// le film affiché est entre le premier et le dernier de la liste
			slidesArr = news.slice(activeSlide - 1, activeSlide + 2);
		}

		if (!swipping) {
			dispatch({
				type: 'SETUP_SLIDES',
				payload: { slides: slidesArr, translate: widthRef.current.offsetWidth },
			});
		}
	};

	const nextSlide = () => {
		dispatch({
			type: 'NEXT_SLIDE',
			payload: {
				activeSlide: activeSlide === news.length - 1 ? 0 : activeSlide + 1,
				translate: translate + width,
			},
		});
	};
	const previousSlide = () => {
		dispatch({
			type: 'PREVIOUS_SLIDE',
			payload: activeSlide === 0 ? news.length - 1 : activeSlide - 1,
		});
	};

	const handleTouchStart = e => {
		dispatch({ type: 'MOVE_START', payload: offset + e.targetTouches[0].clientX });
	};

	// const handleTouchMove = e => {
	//     if (swipping) {
	//         const deltaX =
	//             initialOffset - e.targetTouches[0].clientX + widthRef.current.offsetWidth;
	//         setState({
	//             ...state,
	//             offset: e.targetTouches[0].clientX,
	//             translate: deltaX,
	//         });
	//     }
	// };

	const handleTouchEnd = e => {
		const calc = e.changedTouches[0].clientX - initialOffset;
		const pourcentage = (width / 100) * 25;
		if (calc < 0 && Math.abs(calc) > pourcentage) {
			dispatch({
				type: 'NEXT_SLIDE',
				payload: {
					translate: 2 * widthRef.current.offsetWidth,
					activeSlide: activeSlide === news.length - 1 ? 0 : activeSlide + 1,
				},
			});
		} else if (calc > 0 && calc > pourcentage) {
			dispatch({
				type: 'PREVIOUS_SLIDE',
				payload: activeSlide === 0 ? news.length - 1 : activeSlide - 1,
			});
		} else {
			dispatch({ type: 'KEEP_SLIDE', payload: widthRef.current.offsetWidth });
		}
	};

	const handleMouseDown = e => {
		e.preventDefault();
		dispatch({ type: 'MOVE_START', payload: offset + e.clientX });
	};

	// const handleMouseMove = e => {
	// if (swipping) {
	//     const deltaX = initialOffset - e.clientX + widthRef.current.offsetWidth;
	//     setState({
	//         ...state,
	//         offset: e.clientX,
	//         translate: deltaX,
	//     });
	// }
	// };

	const handleMouseUp = e => {
		e.preventDefault();
		const calc = e.clientX - initialOffset;
		const pourcentage = (width / 100) * 25;
		if (calc < 0 && Math.abs(calc) > pourcentage) {
			dispatch({
				type: 'NEXT_SLIDE',
				payload: {
					translate: 2 * widthRef.current.offsetWidth,
					activeSlide: activeSlide === news.length - 1 ? 0 : activeSlide + 1,
				},
			});
		} else if (calc > 0 && calc > pourcentage) {
			dispatch({
				type: 'PREVIOUS_SLIDE',
				payload: activeSlide === 0 ? news.length - 1 : activeSlide - 1,
			});
		} else {
			dispatch({ type: 'KEEP_SLIDE', payload: widthRef.current.offsetWidth });
		}
	};

	const handleMouseLeave = e => {
		if (swipping) {
			handleMouseUp(e);
		}
	};
	return (
		<div className='carousel__container' ref={widthRef}>
			<Slider width={width * 3} translate={translate} transition={transition}>
				{slides.map((slide, index) => (
					<Slide
						filmData={slide}
						key={index}
						width={width}
						onTouchStart={handleTouchStart}
						// onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						onMouseDown={handleMouseDown}
						// onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseLeave}
					/>
				))}
			</Slider>
			<Arrows
				direction='left'
				handleClick={() => previousSlide()}
				display={swipping || window.innerWidth < 1200 ? 'none' : 'flex'}
			/>
			<Arrows
				direction='right'
				handleClick={() => nextSlide()}
				display={swipping || window.innerWidth < 1200 ? 'none' : 'flex'}
			/>
			<div className='carousel__dotsCtn'>
				<div className='carousel__dots'>
					{news.map((film, index) => (
						<Dot key={index} index={index} selected={activeSlide === index} />
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	films: state.films,
});

export default connect(mapStateToProps)(Carousel);
