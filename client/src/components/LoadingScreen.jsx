import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLE = {
	position: "fixed",
	width: "100%",
	top: "50%",
	left: "45%",
	// transform: "translate(-50 %, 0)",
	// padding: "50px",
	zIndex: 1000,
	fontSize: "24px"

};

const OVERLAY = {
	position: "fixed",
	top: "30%",
	bottom: "30%",
	left: "30%",
	right: "30%",
	background: "rgba(0, 0, 0, 0.5)",
	zIndex: 1000
};

function LoadingScreen() {
	return ReactDom.createPortal(<div style={OVERLAY}>
		<div style={MODAL_STYLE}>
			<div class="d-inline-flex p-4">
				<div style={{ marginRight: "10px" }}>Fetching data</div>
				<div class="spinner-border" role="status" />
			</div>
		</div>
	</div>, document.getElementById('portal')
	);
}

export default LoadingScreen;
