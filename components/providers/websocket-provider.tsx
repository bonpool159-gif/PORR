'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { wsManager } from '@/lib/websocket';
import { useAuth } from './auth-provider';

interface WebSocketContextType {
  socket: any;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('auth-token');
      const socket = wsManager.connect(token || undefined);
      
      // Subscribe to store updates if user has a store
      if (user.storeId) {
        wsManager.subscribeToStore(user.storeId);
      }

      return () => {
        wsManager.disconnect();
      };
    }
  }, [user]);

  return (
    <WebSocketContext.Provider value={{ socket: wsManager.getSocket() }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}