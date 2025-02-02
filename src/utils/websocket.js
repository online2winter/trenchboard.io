class WebSocketService {
  constructor() {
    this.ws = null;
    this.subscribers = new Map();
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
    this.disabled = false; // Enable websocket connections
    console.log('WebSocketService initialized');
  }

  connect() {
    if (this.disabled) {
      console.log('WebSocket connections are temporarily disabled');
      return;
    }
    try {
      console.log('Connecting to pumpportal.fun WebSocket...');
      this.ws = new WebSocket('wss://pumpportal.fun/api/data');
      
      this.ws.onopen = () => {
        console.log('WebSocket Connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Subscribe to new token events by default
        const payload = {
          method: "subscribeNewToken"
        };
        this.ws.send(JSON.stringify(payload));

        // Notify all subscribers of connection status
        this.subscribers.forEach((callback, id) => {
          callback({ type: 'connection', status: 'connected' });
        });

        console.log('Subscribed to new token events');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Raw WebSocket message:', data);

          // Handle subscription confirmation
          if (data.message && data.message.includes('Successfully subscribed')) {
            console.log('Subscription confirmed:', data.message);
            return;
          }

          // Transform create token events into our expected format
          if (data.txType === 'create') {
            const transformedData = {
              type: 'newToken',
              data: {
                name: data.name || 'Unknown',
                address: data.mint,
                timestamp: new Date().toISOString(),
                initialPrice: data.initialBuy / Math.pow(10, 6), // Convert to SOL
                initialLiquidity: data.solAmount
              }
            };

            console.log('Transformed token data:', transformedData);

            // Notify all subscribers
            this.subscribers.forEach((callback, id) => {
              console.log(`Notifying subscriber ${id}`);
              callback(transformedData);
            });
          }
        } catch (error) {
          console.error('Error processing WebSocket message:', error);
          console.error('Raw message:', event.data);
        }
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        console.log('WebSocket Disconnected');
        
        // Notify all subscribers of connection status
        this.subscribers.forEach((callback, id) => {
          callback({ type: 'connection', status: 'disconnected' });
        });
        
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        // Notify all subscribers of connection error
        this.subscribers.forEach((callback, id) => {
          callback({ type: 'connection', status: 'error', error });
        });
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.attemptReconnect();
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.reconnectTimeout = setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 5000 * this.reconnectAttempts); // Exponential backoff
    }
  }

  subscribeToAccountTrades(accounts) {
    if (this.isConnected && Array.isArray(accounts) && accounts.length > 0) {
      const payload = {
        method: "subscribeAccountTrade",
        keys: accounts
      };
      this.ws.send(JSON.stringify(payload));
      console.log('Subscribed to account trades:', accounts);
    }
  }

  subscribeToTokenTrades(tokens) {
    if (this.isConnected && Array.isArray(tokens) && tokens.length > 0) {
      const payload = {
        method: "subscribeTokenTrade",
        keys: tokens
      };
      this.ws.send(JSON.stringify(payload));
      console.log('Subscribed to token trades:', tokens);
    }
  }

  // Method to check connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      subscriberCount: this.subscribers.size
    };
  }

  subscribe(id, callback) {
    console.log(`New subscriber registered: ${id}`);
    this.subscribers.set(id, callback);
    
    // If this is the first subscriber, establish connection
    if (this.subscribers.size === 1) {
      console.log('First subscriber connected, establishing WebSocket connection');
      this.connect();
    } else if (this.isConnected) {
      // If already connected, notify the new subscriber of current status
      callback({ type: 'connection', status: 'connected' });
    }

    console.log('Current subscribers:', Array.from(this.subscribers.keys()));
    return () => this.unsubscribe(id);
  }

  unsubscribe(id) {
    console.log(`Unsubscribing: ${id}`);
    this.subscribers.delete(id);
    
    // If there are no more subscribers, close the connection
    if (this.subscribers.size === 0) {
      console.log('No more subscribers, closing WebSocket connection');
      this.disconnect();
    }

    console.log('Remaining subscribers:', Array.from(this.subscribers.keys()));
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.isConnected = false;
  }
}

// Create a singleton instance
const websocketService = new WebSocketService();
export default websocketService;