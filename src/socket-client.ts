import { Manager, Socket } from 'socket.io-client';

export const connectToServer = () => {
	const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
	const socket = manager.socket('/');

	addListener(socket);
};

const addListener = (socket: Socket) => {
	const serverStatusLabel = document.querySelector('#server-status')!;
	const clientsList = document.querySelector('#clients-list')!;

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

	messageForm.addEventListener('submit', (event) => {
		event.preventDefault();
		if (messageInput.value.trim().length <= 0) return;

		socket.emit('message-from-client', { id: 'test', message: messageInput.value.trim() });
		messageInput.value = '';
	});
};
