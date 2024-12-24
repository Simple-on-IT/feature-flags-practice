import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { store } from '@/app/provider/store';
import { GiftList } from '@/entities/GiftList/ui/GiftList';

const App: React.FC = () => (
  <Provider store={store}>
    <div className="app-container">
      <h1>Gift Shop</h1>
      <GiftList />
    </div>
  </Provider>
);

export default App;