import React from 'react';
// import './Layout.scss';

const Layout = ({ children }) => {
	return (
		<>
			<div className="w-100 h-100 layout" style={{ overflowX: 'hidden' }}>
				{children}
			</div>
		</>
	);
};

export default Layout;
