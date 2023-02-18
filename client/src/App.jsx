import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'


const YOU='you';
const AI='ai';

function App() {
  const inputRef=useRef();
  const [qna, setQna]= useState([]);
  const [loading, setLoading]= useState(false);

  const updateQNa =(from, value)=>{
    setQna((qna)=>[...qna,  {from, value}]);
  }

  const handleSend=()=>{
    const question=inputRef.current.value;
    updateQNa(YOU, question);

    setLoading(true);
    axios.post('http://localhost:3000/chat', { question,})
    .then(response=>{
      updateQNa(AI, response.data.answer);
    }).finally(()=>{
      setLoading(false);
    })

  };
  // const clearValue=()=>{
  //  inputRef.current.value = ""
  // }

  const renderContent=(qna)=>{
    const value=qna.value;

    if(Array.isArray(value)){
      return value.map((v)=> <p className='message-text'>{v}</p>)
    }
    return <p className='message-text'>{value}</p>
  }
  return(
    <main class="container">
      <div class="chats">

        {qna.map(qna=>{
            if(qna.from=== YOU){
              return(
                <div class="send chat">
                  <img src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png" alt="" class="avtar"/>

                    <p>{renderContent(qna)}</p>

                </div>
              );
            }
            return(
            <div class="recieve chat">
              <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="" class="avtar"/>
                  
                 <p>{renderContent(qna)}</p>
            </div>
            );
        })}

        {loading && (
           <div class="recieve chat">
              <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" alt="" class="avtar"/>
                  
                 <p>Typing ai.....</p>

            </div>
        )}

      </div>

      <div class="chat-input">
        <input type="text" class="form-control col" placeholder="Type Something" ref={inputRef}/>
        <button disabled={loading} class="btn btn-success" 
           onClick={() => {
          handleSend();
          // clearValue();
        }}>
          Send</button>
      </div>
    </main>
  );

}

export default App
