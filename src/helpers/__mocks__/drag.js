const mock = jest.fn().mockImplementation(() => ({ onDragStart: jest.fn(), setup: jest.fn() }));

export default mock;
