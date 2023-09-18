import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket - Client</h1>
    <span id="server-status"></span>

    <ul id="clients-list"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="messages-list"></ul>
  </div>
`;

connectToServer();
