import React, { Component, Fragment } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class DetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = { address: [], lat: '', lng: '' };
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    const data = this.props.info.original;
    const location = this.props.latlng;
    return (
      <Fragment>
        <Card>
          {location && (
            <div style={{ height: '250px', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: '<Your Map Key Here>' }}
                center={location}
                defaultZoom={this.props.zoom}
              >
                <AnyReactComponent lat={location && location.lat} lng={location && location.lng} text='X' />
              </GoogleMapReact>
            </div>
          )}
          <CardBody>
            <CardTitle>
              <h2>
                {data.B} {data.C}
              </h2>
            </CardTitle>
            <CardSubtitle>
              <h3>Carrier: {data.A}</h3>
            </CardSubtitle>
            <CardText>
              Approx distance from Perth is {data.D} km and is zoned as {data.E} <br/>
              Coordinates: lat: {location.lat}, long: {location.lng}
            </CardText>
          </CardBody>
        </Card>
      </Fragment>
    );
  }
}
