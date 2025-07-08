import { useEffect } from 'react';
import Header from '../../components/recipes/Header';

export default function Create() {

	useEffect(() => {
		document.body.style.backgroundColor = '#f3f4f6';
		return () => {
			document.body.style.backgroundColor = 'white';
		};
	}, []);
	return (
		<>
			<Header />
			<div>oi</div>
		</>
	);
}
