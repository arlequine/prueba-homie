import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

export default function CarouselSlide(props) {
  let images = props.photos.map((photo, index) => {
    return (
      <Carousel.Item key={index}>
        <img
          src={photo}
          alt=""
          />
      </Carousel.Item>
    )
  });
  // console.log('pokemon image', images)
  return (
    <div>
      <Carousel>
        {images}
      </Carousel>
    </div>
  );
}

// <Card className={classes.card}>
//     <h1>{title}</h1>
// </Card>
