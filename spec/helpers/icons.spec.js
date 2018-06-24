import icons from '../../src/helpers/icons';

const iconKeys = ['clear-day',
  'clear-night',
  'partly-cloudy-day',
  'partly-cloudy-night',
  'cloudy',
  'rain',
  'sleet',
  'snow',
  'wind',
  'fog'];

describe('Icons list', () => {
  it('finds all icons', () => {
    const result = iconKeys.filter((key) => icons(key).id !== undefined);

    expect(result.length).toEqual(iconKeys.length);
  });

  it('throws error for invalid icon key', () => {
    expect(() => {
      icons('xpto');
    }).toThrowError('No icon registered with the key: xpto');
  });
});
