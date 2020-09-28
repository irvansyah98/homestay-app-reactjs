import React, {Component} from 'react';
import "./homestay.css";

class Homestay extends Component{
    handleClick = () => {
        this.props.selectHomestay(this.props.homestay);
    }
    render(){
        const judul = `${this.props.homestay.nama} - Rp. ${this.props.homestay.harga} rb`
        const style = `${this.props.homestay.fotoUrl}`

        return(
            <div className="homestay" onClick={this.handleClick}>
                <img src={style} width="300"/>
                <div className="homestay-judul">{judul}</div>
            </div>
        );
    }
}

export default Homestay;