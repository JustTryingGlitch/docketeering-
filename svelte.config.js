import adapter from '@sveltejs/adapter-auto';

import { Server } from 'socket.io'; // <-- Import the Socket.IO server

const config = {
    // ...

    kit: {
        adapter: adapter(),
        vite: {
            plugins: [{
                name: 'sveltekit-socket-io',
                configureServer(server) {
                    const io = new Server(server.httpServer);

                    // Socket.IO stuff goes here           
                    io.on('connection', (socket) => {
                        let username = `User ${Math.round(Math.random() * 345)}`
                        socket.emit('username', username)

                        socket.on('message', (message) => {
                            io.emit('message', {
                                from: username,
                                message: message,
                            });
                        });
                    });

                    console.log('SocketIO injected');
                }
            }]
        }
    },

    // ...
};

export default config;