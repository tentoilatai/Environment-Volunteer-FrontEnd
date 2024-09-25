import React, { useState } from 'react';
import './App.scss';
import Button from './Common/Button/Button.tsx';
import Input from './Common/Input/Input.tsx'; 

function App() {
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState("my");  // Giá trị mặc định là "my"


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button 
          content="open" 
          onClick={() => setShowForm(true)} 
          disabled ={showForm}
        />
          <Button 
          content="close" 
          onClick={() => setShowForm(false)} 
          disabled ={!showForm}
        />

        {showForm && (
          <Input 
            value={inputValue}  // Truyền giá trị input
            onChange={handleInputChange}  // Truyền hàm xử lý onChange
          />
        )}
      </header>
    </div>
  );
}

export default App;
