import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PosterSlider = () => {
  // Sample poster data (you can replace this with your data)
  const posters = [
    { id: 1, imageUrl: 'https://as1.ftcdn.net/v2/jpg/06/61/03/60/1000_F_661036032_L6zZRw1SqZHtoSI1NOkoTfjM1dzbzFIt.jpg' },
    { id: 2, imageUrl: 'https://as1.ftcdn.net/v2/jpg/06/61/03/60/1000_F_661036032_L6zZRw1SqZHtoSI1NOkoTfjM1dzbzFIt.jpg' },
    { id: 3, imageUrl: 'poster3.jpg' },
    // Add more posters as needed
  ];

  // Slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
   autoplaySpeed: 3000,
   

  };

  return (
    <div>
      {/* Other content on your web page */}
      
      <Slider {...settings}>
        {posters.map((poster) => (
          <div key={poster.id}>
            <img src={poster.imageUrl} alt={`Poster ${poster.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PosterSlider;
