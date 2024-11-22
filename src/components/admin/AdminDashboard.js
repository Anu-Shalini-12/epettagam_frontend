import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import tnegaIcon from '../../Assets/tnega-logo.png';
import logoImg2 from '../../Assets/Bimg.svg';
import {Barchart} from '../component/Barchart';
import SecondGraph from '../component/SecondGraph';
import annaIcon from '../../Assets/anna-university.png';
import digilockerLogo from '../../Assets/digilocker.png';
import ModalData from "../Modal/Modal"
import {getAllUserAdmin,getCountAll,getGraphData,getFirstGraphData,getCountCertificate,getstackholderDetail} from "../store/admin/action"
import DoughnutChart from "../component/DoughnutChart"
import { BiSolidRectangle } from "react-icons/bi"; 
import logo from "../../Assets/Nambikkai iniyam logo1.png"
import axios from "axios";
import XLSX from 'xlsx';
import ExcelSheetDisplay from "./ExcelSheetDisplay"
import loader from "../../Assets/Loading_2.gif"
import Swal from "sweetalert2";


class AdminDashboard extends Component{

    constructor(props){
        super(props);
        this.state={

            
            alllist:'',
            DataGraph:'',
            GraphDatarecent:'',
            firstGraph: '',
            yearsList:[],
            month:'',
            value:'',
            dataCountvalue:'',
            popUp: false,
            base64Code:'',
            exportLoader:false,
            stackList:[]
        }
    }

    componentDidMount(){
        this.props.getAllUserAdmin()
        this.props.getCountAll()
        this.props.getGraphData()
        this.props.getFirstGraphData()
        this.props.getCountCertificate()
        this.props.getstackholderDetail()
       
    }

    componentDidUpdate(prev){

        
        if(prev.firstData !== this.props.firstData){
            
            let graphData=''
            if(this.props.firstData !== null){
                graphData = Object.entries(this.props?.firstData?.data)


                let month = []
                let value = []
                for(let i=0;i<graphData.length;i++){
                    month.push(graphData[i][0])
                    value.push(graphData[i][1])
                }
                this.setState({
                    month:month,
                    value:value
                })
            }
            
        }

        if(prev.GData !== this.props.GData){
            this.setState({
                GraphDatarecent:this.props.GData?.data
            })
        }

        if(prev.dataCount !== this.props.dataCount){
            this.setState({
                alllist:this.props.dataCount?.data
            })
        }

        if(prev.valueData !== this.props.valueData){
            this.setState({
                dataCountvalue:this.props.valueData.data
            })
        }

        if(prev.dataStak !== this.props.dataStak){
            const data=this.props.dataStak?.data
            for(var i=0;i<data.length;i++){
                data[i].date = this.props.dataStak?.data[i]?.onboarded?.split('T')
            }
            
            this.setState({
                stackList: data
            })
        }
    }

    handleChange=(e)=>{
        const name=e.target.name
        this.setState({
            [name]:e.target.value
        })
        
    }

    handleView=()=>{
        this.props.getGraphData(this.state.s,this.state.e)
    }

    handleExport=()=>{
        this.setState({
            popUp: !this.state.popUp
        })
    }

    handleSheetExport=()=>{
        this.setState({
            exportLoader: true
        }) 
        axios.get("https://www.epettagam.tn.gov.in/wallet/ad/dash/xl?startDate="+this.state.startdate+"&endDate="+this.state.enddate,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("authToken"),
            },
          }).then((res) => {
            this.setState({
                exportLoader:false,
                base64Code:res.data.filedata 
            })
          }).catch((err)=>{
            Swal.fire({
                icon: "error",
                title:"",
                text:err?.response?.data?.message,
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              });
          })

    }

    render(){
        
        return  <React.Fragment>
                    <div className='row'>
                        <div className='col-md-12 d-flex justify-content-center'>
                            <div style={{width:'97%'}}>
                                <div className='m-0 row'>
                                    <div className='col-md-12 d-flex' style={{display:'flex',marginLeft:'5%',width:'95%'}}>
                                        <div className="row" style={{width:'100%'}}>
                                            <div className="col-lg-3 col-sm-6" >
                                                <div style={{borderRadius:'10px',
                                                    height:'6rem',marginLeft:'2%',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
                                                    <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',fontWeight:'bold',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                        E-Sevai Certificates
                                                    </div>
                                                                
                                                    <div style={{height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <span style={{width: '80%',marginLeft: '8%'}}>{this.state.alllist?.esewaiCount !== undefined  ? this.state.alllist.esewaiCount : "0"}</span><img alt='' src={tnegaIcon} style={{width:'2.5rem'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div style={{borderRadius:'10px',
                                                    height:'6rem',marginLeft:'2%',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
                                                    <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',fontWeight:'bold',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                    State Board X
                                                    </div>
                                                                
                                                    <div style={{height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <span style={{width: '80%',marginLeft: '8%'}}>{this.state.alllist?.stateBoardSscCount !== undefined  ? this.state.alllist.stateBoardSscCount : "0"}</span><img alt='' src={logoImg2} style={{width:'2.5rem'}}/> &nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div style={{borderRadius:'10px', 
                                                    height:'6rem',marginLeft:'2%',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
                                                    <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',fontWeight:'bold',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                        State Board XI
                                                    </div>
                                                                
                                                    <div style={{height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <span style={{width: '80%',marginLeft: '8%'}}>{this.state.alllist?.stateBoardHscXICount !== undefined  ? this.state.alllist.stateBoardHscXICount : "0"}</span><img alt='' src={logoImg2} style={{width:'2.5rem'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div style={{borderRadius:'10px', 
                                                    height:'6rem',marginLeft:'2%',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
                                                    <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',fontWeight:'bold',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                        State Board XII
                                                    </div>
                                                                
                                                    <div style={{height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <span style={{width: '80%',marginLeft: '8%'}}>{this.state.alllist?.stateBoardHscXIICount !== undefined  ? this.state.alllist.stateBoardHscXIICount : "0"}</span><img alt='' src={logoImg2} style={{width:'2.5rem'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-4 col-md-12 d-flex' style={{display:'flex',marginLeft:'5%',width:'95%'}}>

                                        <div className="row" style={{display:'flex',width:'100%'}}>
                                            <div className="col-lg-3 col-sm-6">
                                                <div style={{borderRadius:'10px',
                                                height:'6rem',marginLeft:'2%',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
                                                    <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',fontWeight:'bold',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                    DME Nursing Certificates
                                                    </div>
                                                                
                                                    <div style={{height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <span style={{width: '80%',marginLeft: '8%'}}>{this.state.alllist?.dmeNursingCount !== undefined  ? this.state.alllist.dmeNursingCount : "0"}</span><img alt='' src={logoImg2} style={{width:'2.5rem'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div style={{borderRadius:'10px',
                                                    height:'6rem',marginLeft:'2%',                                     
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
                                                    <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',fontWeight:'bold',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                        DME Pharmacy Certificates
                                                    </div>
                                                                
                                                    <div style={{height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <span style={{width: '80%',marginLeft: '8%'}}>{this.state.alllist?.dmePharmacyCount !== undefined  ? this.state.alllist.dmePharmacyCount : "0"}</span><img alt='' src={logoImg2} style={{width:'2.5rem'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div style={{borderRadius:'10px',
                                                    height:'6rem',marginLeft:'2%',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}>
                                                    <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',fontWeight:'bold',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                    Digi Locker Sync
                                                    </div>
                                                                
                                                    <div style={{height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <span style={{width: '80%',marginLeft: '8%'}}>{this.state.alllist?.digiCount !== undefined  ? this.state.alllist.digiCount : "0"}</span><img alt='' src={logoImg2} style={{width:'2.5rem'}}/>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className='mt-4 col-md-12 d-flex justify-content-center' style={{height:'430px'}}>
                            <div style={{width:'100%',height:'100%'}}>
                                <div className='m-0 row' style={{display:'flex',marginLeft:'5%',height:'100%'}}>
                                    <div className='col-md-6' style={{width:'60%',height:'100%'}}>
                                        <div className='bg-white card-body' style={{height:'100%',
                                            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',                                          border: '1px solid lightgray',
                                            borderRadius:'10px',marginLeft:'4rem',padding:'10px',width:'90%'}}>
                                            <div className='p-2 m-0 row' >
                                                <div className='col-md-12'>
                                                    <span style={{color:'black',fontWeight:'bold'}}>Sharing rate of certificates per month</span>
                                                </div>
                                                {this.state.month !== '' &&
                                                    <div className='col-md-12' style={{height:'100%',marginTop:'1rem',padding:'1rem'}}>
                                                        <Barchart  month={this.state.month} value={this.state.value}/>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-6' style={{width:'40%',height:'100%'}}>
                                        <div className='bg-white card-body' style={{
                                            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',                                          border: '1px solid lightgray',
                                            borderRadius:'10px',marginLeft:'-1rem',padding:'10px',width:'99%',height:'100%'}}>
                                            <div className='m-0 row'>
                                                <div className='col-md-12'>
                                                    <span style={{color:'black',fontWeight:'bold'}}>Certificates Fetched & Shared</span>
                                                </div>
                                                
                                                {this.state.dataCountvalue !== undefined && this.state.dataCountvalue !== "" &&
                                                    <div className='col-md-12'style={{width:'100%',height:'100%',padding:'1rem',display:'block'}}> 
                                                        <DoughnutChart dataCount={this.state.dataCountvalue} />
                                                        
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4 col-md-12 d-flex justify-content-center'>
                            <div style={{width:'95%'}}>
                                <div className='bg-white card-body' style={{
                                            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                                    borderRadius:'10px',marginLeft:'3%'}}>
                                    <div style={{width:'98%',marginLeft:'1%'}}>
                                        <table style={{width:'100%'}}>
                                            <tr style={{fontWeight:'bold', height:'3rem', borderBottom:'1px solid lightgray'}}>
                                                <td className='p-2 col'>SI NO</td>
                                                <td className='col'>Certificate Type</td>
                                                <td className='col'>Stake Holder</td>
                                                <td className='col'>Onboarded</td>
                                                <td className='col'><center>Count</center></td>
                                                <td className='text-center col'>Status</td>
                                            </tr>
                                            {this.state.stackList.length !== 0 && this.state.stackList.map((item,indx)=>(
                                                <tr style={{fontSize:'0.9rem',height:'3rem'}}>
                                                    <td className='col'><span style={{marginLeft:'1rem'}}>{indx+1}</span></td>
                                                    <td className='col'>{item.department}</td>
                                                    <td className='col'>{item.stakeholder}</td>
                                                    <td className='col'>{item.date[0]}</td>
                                                    {item.department === "E-sevai Certificates" &&
                                                            <td className='col'><center>{this.state.alllist?.esewaiCount}</center></td>
                                                    }
                                                    {item.department === "DME-Diploma in Pharmacy" &&
                                                            <td className='col'><center>{this.state.alllist?.dmePharmacyCount}</center></td>
                                                    }
                                                    {item.department === "DME-Nursing & midwifery" &&
                                                            <td className='col'><center>{this.state.alllist?.dmeNursingCount}</center></td>
                                                    }
                                                    {item.department === "State Board X" &&
                                                            <td className='col'><center>{this.state.alllist?.stateBoardSscCount}</center></td>
                                                    }
                                                    {item.department === "State Board XI" &&
                                                            <td className='col'><center>{this.state.alllist?.stateBoardHscXICount}</center></td>
                                                    }
                                                    {item.department === "State Board XII" &&
                                                            <td className='col'><center>{this.state.alllist?.stateBoardHscXIICount}</center></td>
                                                    }
                                                    {item.department === "Digilocker Synchronisation" &&
                                                            <td className='col'><center>{this.state.alllist?.digiCount}</center></td>
                                                    }
                                                    <td className='text-center col'><span style={{borderRadius:'50px',padding:'0.4rem 1rem',background:'#C5F6CC',color:'#29B63E'}}>{this.state.alllist.esewaiCount !== undefined  ? "Active" : "Inactive"}</span></td>
                                                </tr>
                                            ))}
                                        </table> 
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className='p-8 w-100 text-end'><button onClick={this.handleExport} className='p-2 border rounded' style={{background:'#154272',color:'white',fontWeight:'bold'}}>Export Excel Sheet</button></div>
                        <ModalData open={this.state.popUp} onClick={() => this.handleExport()} center>
                            <div style={{ height: "100%", overflowX: "hidden",overflowY:"scroll" }}>
                                <div style={{ display: "flex" }}>
                                <a
                                    href
                                    onClick={this.handleExport}
                                    style={{
                                    color: "black",
                                    fontWeight: "bold",
                                    marginLeft: "93%",
                                    marginTop: "1%",
                                    fontSize: "30px",
                                    cursor: "pointer",
                                    }}
                                >
                                    X
                                </a>
                                </div>
                                <img alt='' src={logo} style={{marginTop:'0%',width:'50%',marginLeft:'25%'}}/>
                                {this.state.base64Code == "" ?
                                    <div className='ml-4 row d-flex' style={{marginTop:'-62%'}}>
                                        <center>
                                            <label className='fw-bold' style={{fontSize:'20px',textDecoration:'underline'}}>Export Excel Sheet </label>
                                        </center>
                                            <div className='mt-8 d-grid' style={{width:'95%'}}>
                                                <label style={{marginLeft:'28%'}}>Start Date</label>
                                                <input type="date" style={{marginLeft:'28%',border:'2px solid black'}} className='p-2 mt-1 rounded w-80' value={this.state.startdate} name="startdate" onChange={this.handleChange}/>
                                            </div>
                                            <div className='m-5 d-grid'>
                                                <label style={{marginLeft:'20%'}}>End Date</label>
                                                <input style={{marginLeft:'20%',border:'2px solid black'}} type="date" className='p-2 mt-1 rounded w-80' value={this.state.enddate} name="enddate" onChange={this.handleChange}/>
                                            </div>
                                            <center>{this.state.exportLoader == false ? <button className='p-2 border rounded' style={{background:'#154272',color:'white',fontWeight:'bold'}} onClick={this.handleSheetExport}> Export </button> : <img src={loader} style={{width:'60px'}}/>}</center>
                                            
                                    </div>
                                :
                                <div style={{overflow:'auto',marginTop:'-62%'}}>
                                    <ExcelSheetDisplay  base64={this.state.base64Code} />
                                </div>
                                }
                            </div>
                        </ModalData>
                    </div>
                </React.Fragment>
    }
}

const mapStateToProps=(state)=>{
    return {
        UserList: state.admin.allUser,
        dataCount: state.admin.countData,
        GData: state.admin.graphData,
        firstData: state.admin.firstGraphData,
        valueData: state.admin.countValueData,
        dataStak: state.admin.stackData,
        redirect: state.admin.dataRed
    }
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        getAllUserAdmin,
        getCountAll,
        getGraphData,
        getFirstGraphData,
        getCountCertificate,
        getstackholderDetail
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);