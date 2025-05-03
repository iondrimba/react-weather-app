import icons,  { data } from "../../src/helpers/icons";

describe('Icons list', () => {
  it('finds all icons', () => {
    const result = Object.keys(data).filter((elemt, index) => icons(Number(elemt)) !== undefined);

    expect(result.length).toEqual( Object.keys(data).length);
  });

  it('throws error for invalid icon key', () => {
    expect(icons('xpto')).toBe(119);
  });
});
