import React from 'react';
import { Link } from 'react-router-dom';  // Import the Link component
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  const footerStyle = {
    backgroundColor: 'black',
    color: 'white',
  };

  return (
    <MDBFooter style={footerStyle} className='text-center text-lg-start'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span></span>
        </div>

        <div>
          <a href='https://facebook.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='https://twitter.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='https://google.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='https://instagram.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='https://linkedin.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='https://github.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                EAMMS
              </h6>
              <p>
              Stay connected with us on social media for the latest updates and offers
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Vegitables
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Fruits
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Plants
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Seeds
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
              <Link to='/policy' className='text-reset'> 
                  Policies
                </Link>
              </p>
              <p>
              <Link to='/about' className='text-reset'> 
                  About Us
                </Link>
              </p>
              <p>
              <Link to='/contact' className='text-reset'> 
                  Contacts
                </Link>
              </p>
              <p>
              <Link to='/about' className='text-reset'> 
                  About Us
                </Link>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                no 10,Colombo,Sri Lanka
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                eamms@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 94 222 222 222
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 94 222 222 222
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          GAP.com
        </a>
      </div>
    </MDBFooter>
  );
}
