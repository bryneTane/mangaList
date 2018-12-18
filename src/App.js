import React, { Component } from 'react';
import './App.css';
import { Tabs, Button } from 'antd-mobile';
import { SyncLoader as Loader } from 'halogenium'
import 'antd-mobile/dist/antd-mobile.css';
import MangaItem from './components/MangaItem';

const tabs = [
  { title: 'All Mangas', sub: '1' },
  { title: 'Should Watch', sub: '2' },
];

const TabElts = (props) => (
  <div>
    <Tabs tabs={tabs}
      initialPage={0}
      tabBarPosition="top"
      renderTab={tab => <span className="title">{tab.title}</span>}
    >
      <div className="tabContent">
        {props.mangaElts}
        <Button className="arbutton" onClick={props.onClickA}> Add </Button>
      </div>
      <div className = "tabContent">
        {props.selectedMangaElts}
        <Button className="arbutton" onClick={props.onClickB}> Remove </Button>
      </div>
    </Tabs>
 
  </div>
);



class App extends Component {

  state = {
    isLoading: true,
    mangas : [],
    selectedMangas: [],
  }

  temp = [];
  tempSelect = [];

  componentWillMount(){
    this.remote();
  }
  
  remote = async() => {
    const api_call = await fetch("https://gist.githubusercontent.com/aws1994/f583d54e5af8e56173492d3f60dd5ebf/raw/c7796ba51d5a0d37fc756cf0fd14e54434c547bc/anime.json");
    const data = await api_call.json();
    data.forEach(element => {
      element.checked = false;
    });
    this.setState({mangas: data});
    console.log(data);
    this.temp = this.state.mangas;
    this.tempSelect = [];
    console.log(this.temp, this.tempSelect);
    await this.setState({isLoading: false});
    return data;
  }

  changeStatus(i, tab){
    tab[i].checked = !tab[i].checked;
  }

  organize(tab1, tab2, good){
    tab1.forEach(item => {
      if(item.checked){
        item.checked = false;
        tab2.push(item);
      }
    });
    tab2.forEach(item => {
      if(tab1.indexOf(item) !== -1){
        tab1.splice(tab1.indexOf(item), 1);
      }
    });
    good ? this.setState({mangas: tab1, selectedMangas: tab2}) : this.setState({mangas: tab2, selectedMangas: tab1});
  }

  render() {

    if(this.state.isLoading){
      return (
          <div>
            <div className='header'>
              My Manga List
            </div>
            <div className="content">
              <Loader className="load" color="blue"/>
            </div>
            <div className='footer'>
              Copyrigths &#169; Friedrich TANE 
            </div>
          </div>
        );
    }

    const mangaElts = this.state.mangas.map( (item, index) => {
        return <MangaItem data={item} key={index} onChange={() => {this.changeStatus(index, this.temp)}} />;
    });

    const selectedMangaElts = this.state.selectedMangas.map( (item, index) => {
        return <MangaItem data={item} key={index} onChange={() => {this.changeStatus(index, this.tempSelect)}} />;
    });

    return (
      <div>
        <div className='header'>
          My Manga List
        </div>
        <div className="content">
          <TabElts mangaElts={mangaElts} selectedMangaElts={selectedMangaElts} onClickA={() => this.organize(this.temp, this.tempSelect, true)} onClickB={() => this.organize(this.tempSelect, this.temp, false)} />
        </div>
        <div className='footer'>
          Copyrigths &#169; Friedrich TANE 
        </div>
      </div>
    );
  }
}

export default App;
