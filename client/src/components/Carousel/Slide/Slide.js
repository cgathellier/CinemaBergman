import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Slide = ({
	onTouchStart,
	onTouchEnd,
	onMouseDown,
	onMouseUp,
	onMouseLeave,
	width,
	color,
	filmData,
}) => (
	<div
		className='slide'
		style={{
			width: `${width}px`,
			backgroundColor: `${color}`,
		}}
		onTouchStart={onTouchStart}
		// onTouchMove={onTouchMove}
		onTouchEnd={onTouchEnd}
		onMouseDown={onMouseDown}
		// onMouseMove={onMouseMove}
		onMouseUp={onMouseUp}
		onMouseLeave={onMouseLeave}
	>
		{filmData ? (
			<>
				<img src={filmData.snap} alt={filmData.title} className='slide__image' />
				<div className='slide__grad'>
					<div className='slide__presentation'>
						<h2>Nouveauté</h2>
						<p className='slide__title'>
							{filmData.title}
							<NavLink to={`/films/${filmData._id}`}>
								<span className='slide__link'>Découvrir</span>
								<i className='fas fa-angle-right'></i>
							</NavLink>
						</p>
					</div>
				</div>
			</>
		) : null}
	</div>
);

export default Slide;
