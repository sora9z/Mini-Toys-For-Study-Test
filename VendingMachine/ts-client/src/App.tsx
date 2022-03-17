import React from 'react';
import './App.css';
import ItemListContainer from './page/ItemLIstContainer'


function App() {  
  return (
    <div className="App">
      <header className="App-header">
      Vending Machine
      </header>
      <div className="wrapper">
        <div className="machine-display">
      <ItemListContainer/>
        </div>
        <div className="bottom">
          <div className="bottom-display">
            잔액 확인
          </div>
          <div className="bottom-input">
           
          </div>
        </div>
        </div>
    </div>
  
      
  );
}

export default App;
