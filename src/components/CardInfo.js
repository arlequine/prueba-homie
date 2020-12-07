import React from 'react';
import CarouselSlide from './CarouselSlide';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { makeStyles } from '@material-ui/core/styles';
import bed from '../assets/bed.svg';
import shower from '../assets/shower.svg';
import pet from '../assets/pet.svg';
import parking from '../assets/park.svg';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});
export default function CardInfo(props) {

  const classes = useStyles();
  const data = props.data;
  console.log('pokemon', props);
  return (
    <Card style={{ width: '15rem' }} className="col-md-6">
      <Card.Header>
        <CarouselSlide variant="top" photos={data.photos} ></CarouselSlide>
      </Card.Header>
      <Card.Body className="containter-info">
        <Card.Text>
          {data.abbr_address}
        </Card.Text>
        <div className="contain-info-icons">
          <div>
            <p>{data.bedrooms}</p>
            <Image className="icn-card" src={bed} />
          </div>
          <div className="border-content">
            <p>{data.bathrooms}</p>
            <Image className="icn-card" src={shower} />
          </div>
          <div>
            <p>{data.parkings}</p>
            <Image className="icn-card" src={parking} />
          </div>
          <div className="border-content">
            <p>{data.pet_friendly ? 'Si' : 'No'}</p>
            <Image className="icn-card" src={pet} />
          </div>
          <div>
            <p>{data.sqare_mts}m<sup>2</sup></p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
