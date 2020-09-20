import React from 'react';
import { render } from '@testing-library/react';
import Button from '../button';

it("render button blog correctly", () => {
    const { getByTestId } = render(<Button label="tester"/>);
   //console.log(getByTestId('button'));
})