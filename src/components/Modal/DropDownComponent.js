import React,{Component} from "react";

class DropDownComponent extends Component {
    constructor(props) {
      super(props);
      this.state={

      };
    }

    handleServide=(e)=>{
        if(e.target.value === "All"){
            if(this.props.currentData === "All"){
                this.props.FunctService('',"Rest1")
            }else{
                const data=[]
                for(var i=0;i<this.props.services.length;i++){
                    data.push(this.props.services[i].servicecode)
                }
                this.props.FunctService(data,"All")
            }
        }else{
            this.props.FunctService(e.target.value,"Rest")
        }
    }
  
      
    render(){
        

      return (
        <div>
            {this.props.currentData !== "Rest1" && this.props.currentData !== "All" &&
            
                <ul className="" style={{height:'200px',listStyle:'none',overflow:'auto',border:'1px solid lightgrey',padding:'10px',width:'300px',marginTop:'-1rem'}}>
              
                    <li><input type="checkbox" name="All" onChange={this.handleServide} value="All"/> &nbsp; Select All</li>
                    {this.props.services !== undefined && this.props.services.map((item)=> (
                        
                    <li><input type="checkbox" checked={item.check}  name={item.servicecode} onChange={this.handleServide} value={item.servicecode}/> &nbsp; {item.service}</li>
                            
                    ))}
                </ul> 
                
            }
            {this.props.currentData === "All" &&
            <ul className="" style={{height:'200px',listStyle:'none',overflow:'auto',border:'1px solid lightgrey',padding:'10px',width:'300px',marginTop:'-1rem'}}>
              
                <li><input type="checkbox" checked={true} name="All" onChange={this.handleServide} value="All"/> &nbsp; Select All</li>
                {this.props.services !== undefined && this.props.services.map((item)=> (
                    
                <li><input type="checkbox" checked={true} name={item.servicecode} onChange={this.handleServide} value={item.servicecode}/> &nbsp; {item.service}</li>
                        
                ))}
            </ul> 
            }

            {this.props.currentData === "Rest1" &&
            <ul className="" style={{height:'200px',listStyle:'none',overflow:'auto',border:'1px solid lightgrey',padding:'10px',width:'300px',marginTop:'-1rem'}}>
              
                <li><input type="checkbox" checked={false} name="All" onChange={this.handleServide} value="All"/> &nbsp; Select All</li>
                {this.props.services !== undefined && this.props.services.map((item)=> (
                    
                <li><input type="checkbox" checked={false} name={item.servicecode} onChange={this.handleServide} value={item.servicecode}/> &nbsp; {item.service}</li>
                        
                ))}
            </ul> 
            }
        </div>
      );
    }
  }

  export default DropDownComponent;