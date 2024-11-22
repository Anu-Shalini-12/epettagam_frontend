import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import tnegaIcon from '../../Assets/smallLogo.png';
import {TiArrowForward} from 'react-icons/ti'
import {SlMagnifier} from 'react-icons/sl';
import {AiFillSafetyCertificate} from 'react-icons/ai';
import {getCountCertificate,getCountAll,getVerifiedCount,getstackholderDetail} from '../store/admin/action'


class AllDepartment extends Component{

    constructor(props){
        super(props);
        this.state={
            all_dept_table:[
                {
                    typeOfCert:'Income Certificate',
                    transactionId:'asdddddweewvfsdada...',
                    status:'Added'
                },
                {
                    typeOfCert:'Nativity Certificate',
                    transactionId:'dserdaddweewvfsdada...',
                    status:'Verified'
                },
                {
                    typeOfCert:'First Graduate Certificate',
                    transactionId:'asdddddweewvfsdada...',
                    status:'Verified'
                },
                {
                    typeOfCert:'OBC Certificate',
                    transactionId:'dserdaddweewvfsdada...',
                    status:'Added'
                },
                {
                    typeOfCert:'Community Certificate',
                    transactionId:'asdddddweewvfsdada...',
                    status:'Verified'
                },
                {
                    typeOfCert:'Nativity Certificate',
                    transactionId:'dserdaddweewvfsdada...',
                    status:'Verified'
                },
                {
                    typeOfCert:'First Graduate',
                    transactionId:'asdddddweewvfsdada...',
                    status:'Verified'
                },
                {
                    typeOfCert:'Income Certificate',
                    transactionId:'dserdaddweewvfsdada...',
                    status:'Verified'
                }
            ],
            dataCount:'',
            alllist:''
        }
    }

    componentDidMount(){
        this.props.getCountAll()
        this.props.getCountCertificate()
        this.props.getVerifiedCount()
        this.props.getstackholderDetail()
    }

    componentDidUpdate(prev){
        if(prev.dataCount !== this.props.dataCount){
            this.setState({
                alllist:this.props.dataCount?.data
            })
        }
        if(prev.countData !== this.props.countData){
            this.setState({
                dataCount:this.props.countData?.data
            })
        }


        
        if(prev.verifieddata !== this.props.verifieddata){
            this.setState({
                VerfiedCount:this.props.verifieddata.data
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

    render(){
        return  <React.Fragment>
                    <div className='row'>
                        <div className='col-md-12'>
                            <span style={{paddingLeft:'1rem',fontSize:'1.5rem',fontWeight:'bold'}}></span>
                        </div>
                        <div className='col-md-12 d-flex justify-content-center'>
                            <div style={{width:'95%'}}>
                                <div className='row' style={{display:'flex',width:'95%',marginLeft:'5%'}}>
                                    
                                    <div className='col-md-12 d-flex justify-content-center' style={{width:'100%'}}>
                                        <div style={{width:'100%', display:'flex',justifyContent:'center'}}>
                                            <div className='row' style={{width:'100%',display:'flex',marginTop:'3rem'}}>
                                                <div className='mt-2 col-lg-4 col-sm-6 d-flex justify-content-center align-items-center' >
                                                    <div style={{borderRadius:'10px', border:'1px solid lightgray',
                                                        width:'100%',height:'3.5rem', display:'flex',
                                                        boxShadow: '0px 3px 10px #DDE8F245'}}>
                                                        <div style={{fontSize:'0.8rem',height:'1.8rem',paddingLeft:'1rem',paddingTop:'1rem',width:'50%'}}>
                                                            Fetched Certificates 
                                                        </div>

                                                        <div style={{ textAlign:'end',width:'50%',fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <p style={{marginRight:'1rem',marginTop:'7px'}}>{this.state.dataCount.fetchedCount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-2 col-lg-4 col-sm-6 d-flex justify-content-center align-items-center'>
                                                    <div style={{borderRadius:'10px', border:'1px solid lightgray',
                                                        width:'98%',marginLeft:'2%',height:'3.5rem', display:'flex',
                                                        boxShadow: '0px 3px 10px #DDE8F245'}}>
                                                        <div style={{fontSize:'0.8rem',height:'1.8rem',paddingLeft:'1rem',paddingTop:'1rem',width:'50%'}}>
                                                        Shared Certificates
                                                        </div>
                                                        <div style={{ textAlign:'end',width:'50%',fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <p style={{marginRight:'1rem',marginTop:'7px'}}>{this.state.dataCount.sharedCount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-2 col-lg-4 col-sm-6 d-flex justify-content-center align-items-center'>
                                                    <div style={{borderRadius:'10px', border:'1px solid lightgray',
                                                        width:'98%',marginLeft:'2%',height:'3.5rem', display:'flex',
                                                        boxShadow: '0px 3px 10px #DDE8F245'}}>
                                                        <div style={{fontSize:'0.8rem',height:'1.8rem',paddingLeft:'1rem',paddingTop:'1rem',width:'50%'}}>
                                                        Verified Certificates
                                                        </div>
                                                        <div style={{ textAlign:'end',width:'50%',fontSize:'1.5rem',fontWeight:'bold'}}>
                                                        <p style={{marginRight:'1rem',marginTop:'7px'}}>{this.state.VerfiedCount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4 col-md-12 d-flex justify-content-center'>
                            <div style={{width:'95%'}}>
                                <div className='bg-white card-body' style={{boxShadow: '0px 3px 10px #DDE8F245',
                                    border: '1px solid lightgray',
                                    borderRadius:'10px',marginLeft:'5%'}}>
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
                                            {this.state.stackList !== undefined && this.state.stackList.map((item,indx)=>(
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
                    </div>
                </React.Fragment>
    }
}

const mapStateToProps=(state)=>{
    return {
        countData: state.admin.countValueData,
        dataCount: state.admin.countData,
        verifieddata: state.admin.VerCount,
        dataStak: state.admin.stackData
    }
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        getCountCertificate,
        getCountAll,
        getVerifiedCount,
        getstackholderDetail
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AllDepartment);