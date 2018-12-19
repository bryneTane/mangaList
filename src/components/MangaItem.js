import React, { Component } from 'react';
import { Checkbox, Modal } from 'antd-mobile';
import '../css/MangaItem.css';


const CheckboxItem = Checkbox.CheckboxItem;

export default class MangaItem extends Component{

    state = {modal1: false}

    showModal = (e) => {
        e.preventDefault(); 
        this.setState({
          modal1: true,
        });
      }
    
    onClose = () => {
        this.setState({
          modal1: false,
        });
      }
      
    render(){

        const modal = <Modal
                            visible={this.state.modal1}
                            transparent
                            maskClosable={false}
                            onClose={this.onClose}
                            title={this.props.data.name}
                            footer={[{ text: 'Ok', onPress:  this.onClose  }]}
                        >

                            <div>
                                <h2>{this.props.data.name}</h2>
                                <div className="img"><img src={this.props.data.img} alt={this.props.data.name} className="bimage" /></div>
                                <div className="modal">
                                    <p><b>Description : </b> {this.props.data.description} </p>
                                    <p><b>Rating : </b> {this.props.data.Rating} </p>
                                    <p><b>Episodes : </b> {this.props.data.episode} </p>
                                    <p><b>Category : </b> {this.props.data.categorie} </p>
                                    <p><b>Studio : </b> {this.props.data.studio} </p>
                                </div>
                            </div>    
                        </Modal>

        return (
            <div className="manga">
                {modal}
                <CheckboxItem className="mangaCheck" onChange={this.props.onChange}>
                    <span onClick={this.showModal}>
                        {this.props.data.name}
                    </span>
                    <img src={this.props.data.img} alt={this.props.data.name} className="image" />
                </CheckboxItem>
            </div>
        );
    }
}