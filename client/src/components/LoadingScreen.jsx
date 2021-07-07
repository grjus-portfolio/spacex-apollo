import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLE = {
	position: "fixed",
	top: "50%",
	left: "50%",
	marginTop: "-50px",
	marginLeft: "-100px",
	zIndex: 1000,
	fontSize: "24px"

};

const OVERLAY = {
	position: "fixed",
	top: "30%",
	bottom: "30%",
	left: "0%",
	right: "0%",
	background: "rgba(0, 0, 0, 0.5)",
	zIndex: 1000,
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
