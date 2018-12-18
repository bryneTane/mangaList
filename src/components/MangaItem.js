import React, { Component } from 'react';
import { Checkbox, Modal } from 'antd-mobile';
import '../css/MangaItem.css';

export default class MangaItem extends Component{

    state = {modal1: false}

    onClose = () => {
        this.setState({
          modal1: false,
        });
      }

      showModal = (e) => {
        e.preventDefault(); 
        this.setState({
          modal1: true,
        });
        console.log("Bouh");
      }
   
    render(){

        const CheckboxItem = Checkbox.CheckboxItem;
        const modal =   <Modal
                            visible={this.state.modal1}
                            transparent
                            maskClosable={false}
                            onClose={() => this.onClose()}
                            title={this.props.data.name}
                            footer={[{ text: 'Ok', onPress: () => { this.onClose(); } }]}
                        >
                            
                            <div className="modalContent">
                                <div><img src={this.props.data.img} alt={this.props.data.name} className="image" /></div>
                                <p><b>Description : </b> {this.props.data.description} </p>
                                <p><b>Rating : </b> {this.props.data.Rating} </p>
                                <p><b>Episodes : </b> {this.props.data.episode} </p>
                                <p><b>Category : </b> {this.props.data.categorie} </p>
                                <p><b>Studio : </b> {this.props.data.studio} </p>
                            </div>

                        </Modal>

        return (
            <div className="manga" onClick={this.showModal}>
                {modal}
                <CheckboxItem className="mangaCheck" onChange={this.props.onChange} defaultChecked={false} >
                    {this.props.data.name}
                    <img src={this.props.data.img} alt={this.props.data.name} className="image" />
                </CheckboxItem>
            </div>
        );
    }
}