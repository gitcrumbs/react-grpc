import  {useState} from 'react'
import './App.css';
import { GreetServiceClient } from './greet.client';
import { Greeting, GreetRequest } from './greet';
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';

export default  function App() {

 const [resp,setResp] = useState("");

  const grpcCall = () => {

    // create our greeting object
    let greeting :  Greeting = {
      firstName: "Ashwani",
      lastName: 'Singh'
    };

    

     // prepare the greet request
    
     let request :  GreetRequest= {
      greeting
     };
     
     
     let transport = new GrpcWebFetchTransport({
      baseUrl: "http://localhost:8080"
  });

  let client = new GreetServiceClient(transport);


  let {response} =  client.greet(request, {});

   response.then(resp=>{
    setResp(resp.result);
  }
  
   ).catch(err=>{
    console.log(err);
    
   })

}

return (
      <div>
        <button onClick={grpcCall}>Click</button>
        <p>{resp}</p>
      </div>
 );
}



