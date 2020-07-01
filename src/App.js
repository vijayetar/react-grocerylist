import React from 'react';
import './App.css';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      groceryList : [
        {
          id: 1,
          name:"apples",
          type:"fruits",
          quantity:13,
        },
        {
          id:2,
          name:"grapes",
          type:"fruits",
          quantity:5,
        }
      ]
    }
    this.itemCreateHandler = this.itemCreateHandler.bind(this);
  }
  itemCreateHandler(fruity){
    const updatedGroceryList = this.state.groceryList;
    updatedGroceryList.push({id:(this.state.groceryList.length)+1, name:fruity.itemname, type:fruity.itemtype, quantity:fruity.itemquantity})
    this.setState({
      groceryList: updatedGroceryList
    })
  }
  render(){
    return (
      <div className="App" >
        <header  className="App-header">
          <Header lengthGroceryList = {this.state.groceryList}/>
        </header>
        <main>
          <RenderGroceryList groceries={this.state.groceryList} />
          <AddGroceryForm onItemCreate={this.itemCreateHandler} />
        </main>
        <Footer text="whatever"/>
      </div>
    )
  }

}
function Header(props){
  return <h2>You have to purchase {props.lengthGroceryList.length} items today!</h2>
}

function Footer(props){
  return <h3>Yeah, {props.text}</h3>
}

function RenderGroceryList(props){
  return (
    <>
      <h2>Grocery List </h2>
      <ul>
        {props.groceries.map(item =><ListTheGroceryItem what={item} key={item.id}/>)}
      </ul>
    </>
  )
}

function ListTheGroceryItem(props){
  return <li>{props.what.id}.  Please buy {props.what.quantity} {props.what.type}: {props.what.name}</li>
}

class AddGroceryForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id:456,
      itemname : '',
      itemtype : 'type',
      itemquantity : 456,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    if (event.target.name === "itemname"){
      const newGroceryName = event.target.value;
      this.setState({
        itemname: newGroceryName
      })
    } 
    else if (event.target.name === "itemtype"){
      const newGroceryType = event.target.value;
      this.setState({
        itemtype: newGroceryType
      })
    }
    else {
      const newGroceryQuantity = event.target.value;
      this.setState({
        itemquantity: newGroceryQuantity
      })
    }
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.onItemCreate(this.state);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
          name = "itemname" type = "text" value={this.state.itemname} onChange={this.handleChange}>
          </input>
        </label>
        <label>
          Type:
          <input
          name= "itemtype" type = "text" value={this.state.itemtype} onChange={this.handleChange}>
          </input>
        </label>
        <label>
          How many?
          <input
          name="itemquantity" type = "text" value={this.state.itemquantity} onChange={this.handleChange}>
          </input>
        </label>
        <button>Ok</button>
      </form>
    )
  }
}

export default App;
