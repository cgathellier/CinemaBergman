import * as React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Post = ({ post, isAdmin, name: userName, onClick }) => (
	<div className='post__container'>
		<div className='post__title'>{post.title}</div>
		<div className='post__text'>{post.text}</div>
		<div className='post__header'>
			<div>{post.name}</div>
			<div>
				<Moment format='DD/MM/YYYY'>{post.date}</Moment> à{' '}
				<Moment format='HH:mm'>{post.date}</Moment>
			</div>
		</div>
		{isAdmin || userName === post.name ? (
			<div className='post__delete' onClick={() => onClick(post._id)}>
				Supprimer
			</div>
		) : (
			''
		)}
	</div>
);

Post.propTypes = {
	name: PropTypes.string,
	isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	name: state.auth.name,
	isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(Post);
