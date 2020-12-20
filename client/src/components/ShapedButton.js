import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import './styles.css';
/**
 * @todo image hiding some time
 * @body on hover sometimes background gone , try to find case when that happens
 */
const ShapedButton = ({
	shape: {src, columns, count},
	width: _width,
	height: _height
}) => {
	const rows = Math.ceil(count / columns);
	const [{x, y}, setCurrentShape] = useState({x: 0, y: 0});
	const handleHover = useCallback(() => {
		const newX = getRandomInt(-rows / 2, rows / 2);
		const maxY =
			columns / 2 -
			((newX * 2 + 1) * columns > count ? count % columns : 0);
		const newY = getRandomInt(-columns / 2, maxY);
		setCurrentShape({x: newX, y: newY});
	}, [columns, rows, count]);
	return (
		<span
			onMouseOver={handleHover}
			className={'emojiButton'}
			style={{
				backgroundImage: `url(${src})`,
				width: _width,
				height: _height,
				display: 'block',
				backgroundPosition: `${x * _width}px ${y * _height}px`,
				backgroundSize: `${_width * columns}px ${_height * rows}px`
			}}
		/>
	);
};

ShapedButton.propTypes = {
	shape: PropTypes.shape({
		src: PropTypes.string.isRequired,
		columns: PropTypes.number.isRequired,
		count: PropTypes.number.isRequired
	}),
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
};

export default ShapedButton;

const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
