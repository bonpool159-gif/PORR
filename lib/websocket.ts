'use client';

import { io, Socket } from 'socket.io-client';

class WebSocketManager {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(token?: string): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001', {
      auth: {
        token
      },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => {
          this.socket?.connect();
        }, 1000 * this.reconnectAttempts);
      }
    });

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  // Subscribe to store updates
  subscribeToStore(storeId: string): void {
    if (this.socket) {
      this.socket.emit('join-store', storeId);
    }
  }

  // Subscribe to order updates
  subscribeToOrder(orderId: string): void {
    if (this.socket) {
      this.socket.emit('join-order', orderId);
    }
  }

  // Subscribe to courier updates
  subscribeToCourier(courierId: string): void {
    if (this.socket) {
      this.socket.emit('join-courier', courierId);
    }
  }
}

export const wsManager = new WebSocketManager();