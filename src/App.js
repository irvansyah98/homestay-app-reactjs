import React, {Component} from 'react';
import Marker from "./components/marker";
import './App.css';
import Homestay from './components/homestay';
import GoogleMapReact from 'google-map-react';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      homestay: [],
      selectedHomestay: null,
      allHomestays:[],
      search:""
    };
  }

  componentDidMount(){
    fetch("https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json")
    .then(response => response.json())
    .then((data) => {
      this.setState({
        homestay: data,
        allHomestays:data
      });
    });
  }

  selectHomestay = (homestay) => {
    this.setState({
      selectedHomestay: homestay
    })
    console.log(homestay);
  }

  handleSearch = (event) =>{
    this.setState({
      search: event.target.value,
      homestay: this.state.allHomestays.filter((homestays) =>
        new RegExp(event.target.value, "i").exec(homestays.nama))
    })
  }

  render(){
    let center = {
      lat: -7.795424,
      lng: 110.371754
    }
    if(this.state.selectedHomestay){
      center= {
        lat: this.state.selectedHomestay.lat,
        lng: this.state.selectedHomestay.lng
      }
    }
    return(
      <div className="app">
        <div className="main">
          <div className="search">
            <input type="text"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch}/>
          </div>
          <div className="homestay">
            {this.state.homestay.map((homestay) => {
              return <Homestay
                        key={homestay.id}
                        homestay={homestay}
                        selectHomestay={this.selectHomestay}/>
            })}
          </div>
        </div>
        <div className="peta">
            <GoogleMapReact
              center={center}
              zoom={15}>
                {this.state.homestay.map((homestay) => {
                  return <Marker
                            key={homestay.id}
                            lat={homestay.lat}
                            lng={homestay.lng}
                            text={homestay.harga}
                            selected={homestay === this.state.selectedHomestay}/>
                })}
            </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
