/* eslint-disable no-unused-vars */
import './App.css';
import useWebSocket from 'react-use-websocket';
import { useState, useEffect } from 'react';

function App() {
	const [numero, setNumero] = useState(0);
	const [numeroTwo, setNumeroTwo] = useState(0);
	const [newMessage, setNewMessage] = useState('');

	const { lastJsonMessage, sendMessage, lastMessage } = useWebSocket('wss://lo3dvotb75.execute-api.us-east-1.amazonaws.com/production', {
		onOpen: () => {
			handleConnect();
			console.log(`Connected to App WS`);
		},
		onMessage: () => {
			// console.log(lastMessage);
			// if (lastMessage) {
			// 	setNewMessage(lastMessage.data);
			// }
			// if (lastJsonMessage) {
			// 	setNumero(lastJsonMessage.n);
			// }
		},
		queryParams: {
			token:
				'eyJraWQiOiJqV0c3cUl3eXlYR1Z6dVNkYng1YmJ3bFluQUtcL2tHTnJJZ1VTTGJveVFMWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhNzJiZTRlMC04NGZlLTQxZDMtOTg1OS02Y2QxOGNjNTI0ZjQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJvZmlsZSI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV94WmFUNm1RWk4iLCJjb2duaXRvOnVzZXJuYW1lIjoiM2RjM2YxZDIzY2Q3ODU0MDIyZjAyZTQ0MGZmNjE3N2YiLCJhdWQiOiI2cWdjOXJydXM5M2swcmZmZGZoaWpvZTYzMSIsImV2ZW50X2lkIjoiZGI5MjViNzgtNThhZS00YjYxLWE4MmEtYmMwYzM2M2M0YmYwIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NjgxNzE0MTksIm5hbWUiOiJBbHVubyAyMDIgKFJhcGhhZWwgTGlzYm9hIEFudHVuZXMpIiwicGhvbmVfbnVtYmVyIjoiKzU1MTE5MDEyMzAxMjMiLCJleHAiOjE2NjgyMDc0MTgsImlhdCI6MTY2ODE3MTQxOSwiZW1haWwiOiJhbHVubzIwMkBpbnRlbGkuZWR1LmJyIn0.qVP_GpGK0rLZ8umDlPEWHahYmPLoIzayRjUBrxlKrztL3MM_NDbZNLMJyBDz63Kd7-RUxdQ2obgYu_Yndhq2IFgHQC3PeYig2kFh311rdMrkZMx9txNWg7xtf_VSGGr5ttrJoLGYAJaEPZ4ySPIlh5PW287C2LxnYG55zuw5XeVT8HbSG6YVpkrNSTf_SA3mex7gWSHT7B1S-V-fBtbk0g9c86OGkb_-Lo08WiILmH8vzabJrrW0Xzgl5FhjblXdRl_EjLAv_D7GlWLycyjJR-aObSNVROb9DZ9IFa8chIv1_sLIviYZTG-kc6G3DDwDJnOQIC0qnwVqcCW6Pgxqaw',
		},
		onError: (event) => {
			console.error(event);
		},
		shouldReconnect: (closeEvent) => true,
		reconnectInterval: 3000,
	});

	useEffect(() => {
		if (lastMessage !== null) {
			// setNewMessage((prev) => prev.concat(lastMessage.data));
			setNewMessage(lastMessage.data);
			setNumero(numero + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastMessage, setNewMessage, setNumero]);

	function handleConnect() {
		let data = { action: 'setName', name: 'Bruno' };
		sendMessage(JSON.stringify(data));
	}

	function handleMessage(param) {
		let data;
		if (param === 'public') {
			data = { action: 'sendPublic', message: 'Mensagem pública vinda do Bruno' };
		} else if (param === 'private') {
			data = { action: 'sendPrivate', message: 'Mensagem privada vinda do Bruno', to: 'Gabriel' };
		}
		sendMessage(JSON.stringify(data));
	}

	function somar() {
		let soma = numeroTwo + 1;
		setNumeroTwo(soma);
	}

	function subtrair() {
		let sub = numeroTwo - 1;
		setNumeroTwo(sub);
	}

	return (
		<div className="App">
			{/* <header className="App-header">{numero}</header> */}
			<h1>{numeroTwo}</h1>
			<button onClick={somar}>Mais 1</button>
			<button onClick={subtrair}>Menos 1</button>
			{/* <button style={{ marginTop: '2rem', marginBottom: '2rem' }} className="app-button" onClick={() => handleMessage('public')}>
				Clique aqui para uma mensagem publica
			</button>
			<br />
			<hr />
			<button style={{ marginTop: '2rem', marginBottom: '2rem' }} className="app-button" onClick={() => handleMessage('private')}>
				Clique aqui para uma mensagem privada
			</button>
			<hr />
			{newMessage && <p style={{ marginTop: '2rem', marginBottom: '2rem' }}>{newMessage}</p>} */}
		</div>
	);
}

export default App;
