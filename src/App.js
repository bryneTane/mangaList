import React, { Component } from 'react';
import './App.css';
import { Tabs } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import MangaItem from './components/MangaItem';

const tabs = [
  { title: 'Votre Météo', sub: '1' },
  { title: 'Recherche', sub: '2' },
];

const TabExample = (props) => (
  <div>
    <Tabs tabs={tabs}
      initialPage={1}
      tabBarPosition="top"
      renderTab={tab => <span className="title">{tab.title}</span>}
    >
      <div className = "tabContent">
        
      </div>
      <div className = "tabContent">
        
      </div>
    </Tabs>
 
  </div>
);



class App extends Component {

  state = {
    isLoading: true,
    mangas : [],
  }

  componentWillMount(){
    this.remote();
    this.setState({isLoading: false});
  }
  
  remote = async() => {
    const api_call = await fetch("https://gist.githubusercontent.com/aws1994/f583d54e5af8e56173492d3f60dd5ebf/raw/c7796ba51d5a0d37fc756cf0fd14e54434c547bc/anime.json");
    const data = await api_call.json();
    this.setState({mangas: data});
    console.log(data);
    return data;
  }

  render() {

    const mangaElts = this.state.mangas.map( item => {
        return <MangaItem data={item} />;
    });

    return (
      <div>
        <div className='header'>
          My Manga List
        </div>
        <div className="content">
          {mangaElts}
        </div>
        <div className='footer'>
          Copyrigths &#169; Friedrich TANE 
        </div>
      </div>
    );
  }
}

export default App;
