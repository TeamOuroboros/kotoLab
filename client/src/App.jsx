import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	const [count, setCount] = useState(0);
	async function userData() {
		const data = await fetch('/api').then((res) => res.json());
		console.log('🍓 ~ userData ~ data:', data);
	}
	userData();

	return <></>;
}

export default App;
