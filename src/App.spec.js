import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('reverses', () => {
  const value = {checked: true};
  const app = new App;
  app.changeStatus(value);
  expect(value.checked).toBe(false);
});

it('organizes', () => {
  
  let tab1 = [
    {props: {data: {checked: true}}},
    {props: {data: {checked: false}}},
    {props: {data: {checked: false}}},
    {props: {data: {checked: true}}},
    {props: {data: {checked: true}}},
    {props: {data: {checked: false}}},
    {props: {data: {checked: true}}},
  ];
  let tab2 = [];
  let app = renderer.create(<App />, ); 
  app.getInstance().organize(tab1, tab2, true);

  expect(tab1).toEqual([
    {props: {data: {checked: false}}},
    {props: {data: {checked: false}}},
    {props: {data: {checked: false}}}
  ]);
  expect(tab2).toEqual([
    {props: {data: {checked: false}}},
    {props: {data: {checked: false}}},
    {props: {data: {checked: false}}},
    {props: {data: {checked: false}}}
  ]);
  expect(app.getInstance().state).toEqual({isLoading: true, mangaElts: tab1, selectedMangaElts: tab2});
});

it('collect data', () => {
  const app = new App;
  const value = app.remote();
  expect(value).not.toBe(undefined);
});