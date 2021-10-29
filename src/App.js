import React,{Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import {tsParticles} from "tsparticles";

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: ''
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component {
    constructor(){
      super();
      this.state = {
      input:'',
      imageUrl: ''     }
    }

    onInputChange = (event) => {
      this.setState({
        input: event.target.value
      })

    }

    onButtonSubmit=()=>{
      this.setState({
        imageUrl: this.state.input
      })
      console.log("click")
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err){

      }

      )
    }


    render(){
      return(
        <div className="App">
       <Particles className="particles"
          params={particlesOptions}
        />
      
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
       </div>

        
    )
    }
      
}

export default App;
