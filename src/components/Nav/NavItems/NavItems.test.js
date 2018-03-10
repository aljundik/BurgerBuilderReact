import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems';
import NavItem from './NavItem/NavItem';


configure({adapter: new Adapter()});
let wrapper;
beforeEach(()=>{
     wrapper = shallow(<NavItems />);
});

describe('Test <NavItems />',()=>{
    it('should render two <NavItems /> if not authenticated', ()=> {   
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render Three <NavItems /> if authenticated', ()=> {
         wrapper.setProps({
             isAuth: true
         })
          expect(wrapper.find(NavItem)).toHaveLength(3);
      });

      it('should render Three <NavItems /> if authenticated', ()=> {
        wrapper.setProps({
            isAuth: true
        })
         expect(wrapper.contains(<NavItem link='/logout'>Logout </NavItem>)).toEqual(true);
     });


});
