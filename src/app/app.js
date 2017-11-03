import React from 'react';
import Navbar from './navbar/navbar';
import Main from './main/main'

class App extends React.Component{
  render(){
    return(
      <div>
      <Navbar />
      <Main />
      </div>
    )
  }
}
export default App
