import React from 'react';
import { render } from 'enzyme';

import AppNavbar from '../src/components/layout/AppNavbar';
import AppFooter from '../src/components/layout/AppFooter';

describe('<AppNavbar />', () => {
    const Wrapper = render(<AppNavbar />);
    it('should have this atrribute', () => {
        expect(Wrapper.find('a').attr('href')).toEqual('/')
    });
});


describe('<Footer />', () => {
    const Wrapper = render(<AppNavbar />);
    it('should have this atrribute', () => {
        expect(Wrapper.find('a').attr('href')).toEqual('/')
    });
});
