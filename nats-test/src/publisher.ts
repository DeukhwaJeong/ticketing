import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');
    
    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    });

    //first argument is the name of the channel
    //second argument is the data we want to send
    //third argument is a callback function that will be called when the data is successfully sent
    stan.publish('ticket:created', data, () => {
        console.log('Event published');
    });
})