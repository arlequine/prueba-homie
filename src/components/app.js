import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showHomies } from '../actions';
import CardInfo from './CardInfo'
import GoogleMapReact from 'google-map-react';
import homieLogo from '../assets/homie-rosa-200px.png'
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const center = {center: { lat: 59.95, lng: 30.33}}
const zoom = {zoom: 11}

class App extends Component {

  componentDidMount () {
    this.props.showHomies()
  }

  renderHomiesList () {
    return this.props.homies.map((homie, index) => {
      return (
        <CardInfo key={index} data={homie} ></CardInfo>
      )
    })
  }

  renderMap () {
    return this.props.homies.map((homie, index) => {
      return (
        <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyAbazOK9HPPesmMW3eEKxq0iRaGXBkD6Kg' }}
                  defaultCenter={{center: { lat: 59.95, lng: 30.33}}}
                  defaultZoom={{zoom: 11}}
                  yesIWantToUseGoogleMapApiInternals
                >
                  <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                  />
                </GoogleMapReact>
      )
    })
  }
  render() {
    return (
      <div className="container">
        <div className="nav-bar">
          <div className="header-left">
            <img src={homieLogo} className="img-logo" alt="logo"/>
            <p>Favoritos</p>
          </div>
          <div className="header-right">
            <p className="text-header">¿Cómo funciona?</p>
            <p className="text-header">Soy propietario</p>
            <p className="text-header">Iniciar sesión</p>
          </div>
        </div>
        <div className="content-elements">
          <div className="container-card">
            {this.renderHomiesList()}
          </div>
          <div className="map" style={{ height: '100vh', width: '100%' }}>
            Holi soy el mapa
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAbazOK9HPPesmMW3eEKxq0iRaGXBkD6Kg' }}
              defaultCenter={this.center}
              defaultZoom={this.zoom}
              yesIWantToUseGoogleMapApiInternals
              >
              <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
                />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    homies: state.homie.list
  }
}

export default connect(mapStateToProps, { showHomies })(App)
