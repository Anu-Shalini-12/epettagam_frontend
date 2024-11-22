import React, { Component } from 'react';
import Select from 'react-select';


class SelectMulti extends Component {

  state = {
    selectedOption: null,
    options: this.props.services
  };

  componentDidMount(){
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.handlechangeSelecData(selectedOption)
  };

  render() {
    const { selectedOption } = this.state;
    const option=[]
    if(this.state.options !== undefined){
        for(var i=0;i<this.state.options.length;i++){
            const data={
                value: this.state.options[i].servicecode,
                label: this.state.options[i].service
            }
            option.push(data)
        }
    }

    return (
      <div className="App" >
        <Select
            isMulti={true}
            value={selectedOption}
            onChange={this.handleChange}
            options={option}
        />
      </div>
    );
  }

}

export default SelectMulti;