import React from 'react';
import { useSpring, animated } from 'react-spring';

const HomeCategory = () => {
  // Define animations for the vegetable and fruit cards
  const vegetableAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500 });
  const fruitAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 1000 });

  return (
    <section className="py-1 overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex justify-content-between">
              {/* Vegetable Card */}
              <animated.div style={vegetableAnimation}>
                <div className="card">
                  <img
                    src="images/"
                    className="card-img-top"
                    alt="Vegetable"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Vegetables</h5>
                    <p className="card-text">
                      Explore our wide range of fresh vegetables.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Explore Vegetables
                    </a>
                  </div>
                </div>
              </animated.div>

              {/* Fruit Card */}
              <animated.div style={fruitAnimation}>
                <div className="card">
                  <img
                    src="images/"
                    className="card-img-top"
                    alt="Fruit"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Fruits</h5>
                    <p className="card-text">
                      Discover our selection of delicious fruits.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Explore Fruits
                    </a>
                  </div>
                </div>
              </animated.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCategory;
