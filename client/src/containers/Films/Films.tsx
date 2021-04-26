import * as React from 'react';
import FilmsList from '../../components/FilmsList/FilmsList';

const Films = () => {
	// React.useEffect(() => {
	// 	window.scroll(0, 0);
	// }, []);

	return (
		<div>
			<FilmsList path='/films/' />
		</div>
	);
};

export default Films;
