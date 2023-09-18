import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = (token: string) => {
	const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
		extraHeaders: {
			authentication: token,
		},
	});
	socket?.removeAllListeners();
	socket = manager.socket('/');

	addListener();
};

const addListener = () => {
	const serverStatusLabel = document.querySelector('#server-status')!;
	const clientsList = document.querySelector('#clients-list')!;
	const messagesList = document.querySelector<HTMLUListElement>('#messages-list')!;

	const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
	const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

	socket.on('connect', () => {
		serverStatusLabel.innerHTML = 'online';
	});

	socket.on('disconnect', () => {
		serverStatusLabel.innerHTML = 'offline';
	});

	socket.on('clients-updated', (clients: string[]) => {
		let clientsListHTML = '';

		clients.forEach((clientId) => {
			clientsListHTML += `<li>${clientId}</li>`;
		});

		clientsList.innerHTML = clientsListHTML;
	});

	socket.on('message-from-server', (payload: { fullName: string; message: string }) => {
		const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>: <span>${payload.message}</span>
      </li>
      `;

		const li = document.createElement('li');
		li.innerHTML = newMessage;
		messagesList.appendChild(li);
	});

	messageForm.addEventListener('submit', (event) => {
		event.preventDefault();
		if (messageInput.value.trim().length <= 0) return;

		socket.emit('message-from-client', { id: 'test', message: messageInput.value.trim() });
		messageInput.value = '';
	});
};
