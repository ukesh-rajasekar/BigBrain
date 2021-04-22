import React from 'react'
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import ShowTimeCounter from '../components/ShowTimeCounter'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('Render showTimer', () => {
  it('render with minimal props', () => {  
    const TimerComponent = renderer.create(<ShowTimeCounter />).toJSON();
    expect(TimerComponent).toMatchSnapshot();
  });

  it('uses startTime,timeLimit to calculate timeout', () => {  
    const startTime = "2021-04-22T03:24:31.196Z"
    const timeLimit = "60"
    const TimerComponent = renderer.create(<ShowTimeCounter startTime = {startTime} timeLimit={timeLimit}/>).toJSON();
    expect(TimerComponent).toMatchSnapshot();
  });

  
  });
