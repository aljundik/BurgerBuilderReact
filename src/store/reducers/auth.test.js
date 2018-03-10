import reducer from './auth';
import * as actions from '../actions/actions';


describe('auth reducer', ()=> {
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null,
            id: null,
            loading: false,
            error: null,
            authRedirectPath: '/'
        });
    })
})