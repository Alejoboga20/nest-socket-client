import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input id="jwtToken" placeholder="JSON Web Token"/>
    <button id="connect-button">Connect</button>
    
    <br />
    <span id="server-status"></span>
    <ul id="clients-list"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>
  </div>
`;

const inputJwt = document.querySelector<HTMLInputElement>('#jwtToken')!;
const connectButton = document.querySelector<HTMLButtonElement>('#connect-button')!;

connectButton.addEventListener('click', () => {
	const token = inputJwt.value.trim();
	if (token.length <= 0) return alert('Please enter a valid JSON Web Token');

	connectToServer(token);
});
