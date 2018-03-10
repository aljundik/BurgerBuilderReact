import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const ingredients = {
    ingredients: {salad: 0}
}


configure({adapter: new Adapter()});
let wrapper;
beforeEach(()=>{
     wrapper = shallow(<BurgerBuilder onFetchIngredients={()=>{}} />);
});

describe('Test <BurgerBuilder />',()=>{
    it('should render  <BuildControls /> when recive ings', ()=> {   
        wrapper.setProps(ingredients);
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });


});
