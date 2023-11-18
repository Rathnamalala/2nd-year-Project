import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 500px;
  margin: 20px auto; /* Increased margin for spacing */
  padding: 30px; /* Increased padding for spacing */
  background-color: #ffffff; /* Change the background color */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h4`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 2px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #0056b3;
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 2px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #0056b3;
  }
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

// Add more styling as needed
