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


class App extends Component {

  state = {
    isLoading: true,
    mangaElts: [],
    selectedMangaElts: [],
  }

  componentWillMount(){
    this.remote();
  }

  forceUpdate(){
    this.setState({});
  }
  
  remote = async() => {
    const api_call = await fetch("https://gist.githubusercontent.com/aws1994/f583d54e5af8e56173492d3f60dd5ebf/raw/c7796ba51d5a0d37fc756cf0fd14e54434c547bc/anime.json");
    const data = await api_call.json();
    data.forEach(element => {
      element.checked = false;
    });
    const mangaElts = data.map( (item, index) => {
        return <MangaItem data={item} key={index} onChange={() => {this.changeStatus(index, this.state.mangaElts)}} />;
    });

    const selectedMangaElts = [];
    this.setState({mangaElts: mangaElts, selectedMangaElts: selectedMangaElts});
    console.log(this.state.mangaElts, this.state.selectedMangaElts);
    await this.setState({isLoading: false});
    return data;
  }

  changeStatus(i, tab){
    tab[i].props.data.checked = !tab[i].props.data.checked;
  }
  
  organize(tab1, tab2, good){
    tab1.forEach(item => {
      if(item.props.data.checked){
        item.props.data.checked = false;
        tab2.push(item);
      }
    });
    tab2.forEach(item => {
      if(tab1.indexOf(item) !== -1){
        tab1.splice(tab1.indexOf(item), 1);
      }
    });
    good ? this.setState({mangaElts: tab1, selectedMangaElts: tab2}) : this.setState({mangaElts: tab2, selectedMangaElts: tab1});
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

    console.log(this.state.mangaElts);
    console.log(this.state.selectedMangaElts);

    return (
      <div>
        <div className='header'>
          My Manga List
        </div>
        <div className="content">
          <div>
            <Tabs tabs={tabs}
              initialPage={0}
              tabBarPosition="top"
              renderTab={tab => <span className="title">{tab.title}</span>}
            >
              <div className="tabContent">
                {this.state.mangaElts.map(item => {return item})}
                <Button className="arbutton" onClick={() => this.organize(this.state.mangaElts, this.state.selectedMangaElts, true)}> Add </Button>
              </div>
              <div className = "tabContent">
                {this.state.selectedMangaElts.map(item => {return item})}
                <Button className="arbutton" onClick={() => this.organize(this.selectedMangaElts, this.state.mangaElts, false)}> Remove </Button>
              </div>
            </Tabs>
        
          </div>
        </div>
        <div className='footer'>
          Copyrigths &#169; Friedrich TANE 
        </div>
      </div>
    );
  }
}

export default App;
