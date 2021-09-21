import React, { Component } from "react";
import './index.css'
import { connect } from "react-redux";
import {add_reminder,remove_reminder,clear_reminder} from './actions/index'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import logo from './remin.jpg'


class App extends Component{
  state ={
    text :'',
    date : new Date()
  }
  
  render(){
    const {reminder} = this.props;
    const TheRemider = reminder.map(item =>{
      return(
          <li className='list-grou-item' key={item.id}>
            <div>{item.text}</div>
            <div>{moment(new Date(item.date)).fromNow()}</div>
            <div className='remove btn-danger ' onClick={() => this.props.remove_reminder(item.id)}>x</div>
          </li>
      )
    })
    
    return(
      <div className='app'>
        <img src={logo} alt='reminder-logo'></img>
        <h2>What Should U Do ?</h2>

        <form className='d-grid gap-2' onSubmit={(e)=>e.preventDefault()}>
          <input 
            onChange ={(e) =>{this.setState({text : e.target.value})}}
            className='form-control'
            type='text'
            placeholder='Enter What U Think .... ?'
            value={this.state.text}
          />
          
          <DatePicker
            className='form-control'
            value={this.state.date}
            selected={this.state.date}
            onChange={(date) =>{this.setState({date})}} 
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="d MMM, yyyy h:mm aa"
            timeCaption="time"
            placeholderText='Enter Date ..'
          />

        <button 
          onClick={()=>{this.props.add_reminder(this.state.text,this.state.date)
            this.setState({text:'',date:''})
          }}
          className="btn btn-outline-primary ">
          ADD
        </button>
        
        <ul className='list-group'>
          {TheRemider}
        </ul>

        <button 
          onClick={()=> this.props.clear_reminder()}
          className="btn btn-outline-danger ">
          CLEAR
        </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    reminder : state
  }
}
export default connect(mapStateToProps,{add_reminder,remove_reminder,clear_reminder}) (App);