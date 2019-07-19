import { shallow } from 'enzyme';
import Row from '../../components/MusicLibrary/MusicLibraryRow';
import React from 'react';

const mockData = {
  data: {},
};
const mockColumns = {
  columns: [
    { name: 'Title', width: 2, spotifyRef: 'title' },
    { name: 'Artist', width: 2, spotifyRef: 'artists' },
    { name: 'Date Added', width: 1, spotifyRef: 'added_at' },
  ],
};

describe('row', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Row data={mockData} columns={mockColumns} />);
    expect(wrapper.exists()).toBe(true);
  });
});
