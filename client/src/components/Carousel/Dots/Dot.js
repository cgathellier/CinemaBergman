import * as React from 'react';

const Dot = ({ selected }) => <div className={selected ? 'dot--selected' : 'dot'}></div>;

export default Dot;
