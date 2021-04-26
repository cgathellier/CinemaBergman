import * as React from 'react';
import { connect } from 'react-redux';
import Arrows from './Arrows/Arrows';
import Slider from './Slider/Slider';
import Slide from './Slide/Slide';
import Dot from './Dots/Dot';
import { IFilm, IReduxState } from '../../utils/Interfaces';

interface StateType {
	activeSlide: number;
	transition: number;
	translate: number;
	width: number;
	slides: IFilm[];
	initialOffset: number;
	offset: number;
	swipping: boolean;
}

type ActionType =
	| {
			type: 'INIT_SLIDES';
			payload: { slides: IFilm[]; translate: number; width: number };
	  }
	| {
			type: 'MOVE_START' | 'KEEP_SLIDE' | 'PREVIOUS_SLIDE';
			payload: number;
	  }
	| {
			type: 'NEXT_SLIDE';
			payload: { translate: number; activeSlide: number };
	  }
	| {
			type: 'SETUP_SLIDES';
			payload: { slides: IFilm[]; translate: number };
	  }
	| {
			type: 'RESIZE';
			payload: { width: number; translate: number };
	  }
	| {
			type: 'RESET_TRANSITION';
	  };

const initialState: StateType = {
	activeSlide: 0,
	transition: 0.5,
	translate: 0,
	width: 0,
	slides: [],
	initialOffset: 0,
	offset: 0,
	swipping: false,
};

const reducer = (state: StateType, action: ActionType) => {
	switch (action.type) {
		case 'INIT_SLIDES': {
			return {
				...state,
				slides: action.payload.slides,
				translate: action.payload.translate,
				width: action.payload.width,
				transition: 0,
			};
		}
		case 'MOVE_START': {
			return { ...state, swipping: true, initialOffset: action.payload };
		}
		case 'NEXT_SLIDE': {
			return {
				...state,
				offset: 0,
				initialOffset: 0,
				swipping: false,
				translate: action.payload.translate,
				activeSlide: action.payload.activeSlide,
			};
		}
		case 'KEEP_SLIDE': {
			return {
				...state,
				initialOffset: 0,
				offset: 0,
				swipping: false,
				translate: action.payload,
			};
		}
		case 'PREVIOUS_SLIDE': {
			return {
				...state,
				translate: 0,
				offset: 0,
				initialOffset: 0,
				swipping: false,
				activeSlide: action.payload,
			};
		}
		case 'SETUP_SLIDES': {
			return {
				...state,
				transition: 0,
				slides: action.payload.slides,
				translate: action.payload.translate,
			};
		}
		case 'RESIZE': {
			return {
				...state,
				transition: 0,
				width: action.payload.width,
				translate: action.payload.translate,
			};
		}
		case 'RESET_TRANSITION': {
			return { ...state, transition: 0.5 };
		}
		default:
			return state;
	}
};

const Carousel = ({ films }: { films: IFilm[] }) => {
	const news = films.filter((_, index) => index < 4);
	const lastSlide = news[news.length - 1];
	const firstSlide = news[0];
	const secondSlide = news[1];

	// const nextSlideRef = React.useRef();
	// const transitionRef = React.useRef();
	// const resizeRef = React.useRef();
	const widthRef = React.useRef<HTMLDivElement>(null);

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

	const handleResize = () => {
		if (!widthRef || !widthRef.current) return;
		dispatch({
			type: 'RESIZE',
			payload: {
				width: widthRef.current.offsetWidth,
				translate: widthRef.current.offsetWidth,
			},
		});
	};

	const setupSlides = React.useCallback(() => {
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
			if (!widthRef || !widthRef.current) return;
			dispatch({
				type: 'SETUP_SLIDES',
				payload: { slides: slidesArr, translate: widthRef.current.offsetWidth },
			});
		}
	}, [activeSlide, news, swipping]);

	const nextSlide = React.useCallback(() => {
		dispatch({
			type: 'NEXT_SLIDE',
			payload: {
				activeSlide: activeSlide === news.length - 1 ? 0 : activeSlide + 1,
				translate: translate + width,
			},
		});
	}, [activeSlide, news.length, translate, width]);

	const previousSlide = () => {
		dispatch({
			type: 'PREVIOUS_SLIDE',
			payload: activeSlide === 0 ? news.length - 1 : activeSlide - 1,
		});
	};

	React.useEffect(() => {
		if (!widthRef || !widthRef.current) return;
		dispatch({
			type: 'INIT_SLIDES',
			payload: {
				slides: [lastSlide, firstSlide, secondSlide],
				translate: widthRef.current.offsetWidth,
				width: widthRef.current.offsetWidth,
			},
		});
	}, [lastSlide, firstSlide, secondSlide]);

	// React.useEffect(() => {
	// 	if (
	// 		!nextSlideRef ||
	// 		!nextSlideRef.current ||
	// 		!transitionRef ||
	// 		!transitionRef.current ||
	// 		!resizeRef ||
	// 		!resizeRef.current
	// 	)
	// 		return;

	// 	nextSlideRef.current = nextSlide;
	// 	transitionRef.current = setupSlides;
	// 	resizeRef.current = handleResize;
	// });

	React.useEffect(() => {
		const play = () => {
			// nextSlideRef.current();
			nextSlide();
		};

		const transitionEvent = (e: Event) => {
			if (!e.target) return;
			if ((e.target as Element).className.includes('slider')) {
				// transitionRef.current();
				setupSlides();
			}
		};

		const resize = () => {
			// resizeRef.current();
			handleResize();
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
	}, [swipping, nextSlide, setupSlides]);

	React.useEffect(() => {
		if (transition === 0) {
			dispatch({ type: 'RESET_TRANSITION' });
		}
	}, [transition]);

	const handleTouchStart = (e: React.TouchEvent) => {
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

	const handleTouchEnd = (e: React.TouchEvent) => {
		const calc = e.changedTouches[0].clientX - initialOffset;
		const pourcentage = (width / 100) * 25;
		if (calc < 0 && Math.abs(calc) > pourcentage) {
			if (!widthRef || !widthRef.current) return;
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
			if (!widthRef || !widthRef.current) return;
			dispatch({ type: 'KEEP_SLIDE', payload: widthRef.current.offsetWidth });
		}
	};

	const handleMouseDown = (e: React.MouseEvent) => {
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

	const handleMouseUp = (e: React.MouseEvent) => {
		e.preventDefault();
		const calc = e.clientX - initialOffset;
		const pourcentage = (width / 100) * 25;
		if (calc < 0 && Math.abs(calc) > pourcentage) {
			if (!widthRef || !widthRef.current) return;
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
			if (!widthRef || !widthRef.current) return;
			dispatch({ type: 'KEEP_SLIDE', payload: widthRef.current.offsetWidth });
		}
	};

	const handleMouseLeave = (e: React.MouseEvent) => {
		if (swipping) {
			handleMouseUp(e);
		}
	};
	return (
		<div className='carousel__container' ref={widthRef}>
			<Slider width={width * 3} translate={translate} transition={transition}>
				{slides.map((slide: IFilm, index: number) => (
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
						<Dot
							key={index}
							// index={index}
							selected={activeSlide === index}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: IReduxState) => ({
	films: state.films,
});

export default connect(mapStateToProps)(Carousel);
