import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const enzymeConfig = () => { Enzyme.configure({ adapter: new Adapter() }); };

export { shallow, mount, enzymeConfig };
