
var clientSocket;
console.log('client socket is ', clientSocket);
var appClient;
/**
 * Initializeing socket for when recived first req from client.
 */
exports.initClientSocket = function () {
    if(clientSocket === undefined)
    {
        clientSocket = global.io 
      
        clientSocket.on('connection', client => 
            {
                console.log('CLient connected');
                appClient = client;
                client.on('event', data => { 
                    console.log('client event')
                });
                // client.on('disconnect', () => { 
                //     console.log('client disconnected')
                // });            
                client.emit('news', { hello: 'world' });
                
            });
    }    
}


exports.emitEvent= function (eventName, objectToSend)
{
    if(appClient)
    {
       client.emit(eventName, objectToSend);
    }
    else{
        console.log('EventManager.js' , 'RegisterEvents Function' , 'appClient was not found, either client is not connected or some error is there')
    }
}