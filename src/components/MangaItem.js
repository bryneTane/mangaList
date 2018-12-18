import React, { Component } from 'react';
import { Checkbox } from 'antd-mobile';
import '../css/MangaItem.css';

export default class MangaItem extends Component{

   
    render(){

        const CheckboxItem = Checkbox.CheckboxItem;

        return (
            <div className="manga">
                <CheckboxItem className="mangaCheck" >
                    {this.props.data.name}
                    <img src={this.props.data.img} alt={this.props.data.name} className="image" />
                </CheckboxItem>
            </div>
        );
    }
}