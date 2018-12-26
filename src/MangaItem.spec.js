import React from 'react';
import ReactDOM from 'react-dom';
import MangaItem from './components/MangaItem';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const data = {} 
  const div = document.createElement('div');
  ReactDOM.render(<MangaItem data={data} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('set to true', () => {
    const data = {};
    let manga = renderer.create(<MangaItem data={data} onChange={console.log('yes')} />, );
    const e = new Event("event"); 
    manga.getInstance().showModal(e);
    expect(manga.getInstance().state).toEqual({modal1: true});
});

it('set to false', () => {
    const data = {};
    let manga = renderer.create(<MangaItem data={data} onChange={console.log('yes')} />, ); 
    manga.getInstance().onClose();
    expect(manga.getInstance().state).toEqual({modal1: false});
});