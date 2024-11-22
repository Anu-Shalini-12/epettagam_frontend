import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import {BiBlock} from 'react-icons/bi';
import {MdGroups} from 'react-icons/md';
import {getAllUsers, getAllBlockedUsers, getTotalNumberUsers, blockUser,getRevokedUsers} from '../store/certificates/action'; 
import { BsFillCircleFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import 'react-responsive-pagination/themes/classic.css';
import loader from "../../Assets/Loading_2.gif"
import "../../style/pagination.css"
import ReactPaginate from 'react-paginate';


class UserManagement extends Component{

    constructor(props){
        super(props);
        this.state={
            isAllUsersActive:true,
            all_user_table:[],
            blocked_users_table:[],
            total_users:0,
            blocked_users:0,
            revokcount:0,
            currentPage:1,
            itemPerPage:5,
            userLoader: true
        }
    }

    componentDidMount(){
        this.props.getAllUsers(this.state.currentPage,this.state.itemPerPage);
        this.props.getTotalNumberUsers();
        this.props.getRevokedUsers();
    }
    componentDidUpdate(prev){
        if(prev.all_users !== this.props.all_users){
            this.setState({...this.state, 
                all_user_table:this.props.all_users.users,
                dataUser: this.props.all_users,
                userLoader: false
            })
        }
        if(prev.blocked_users !== this.props.blocked_users){
            this.setState({...this.state,
                blocked_users_table:this.props.blocked_users.data.blockedUsersList,
                blockpage: this.props.blocked_users.data.pages
            })
        }
        if(prev.total_user_count !==  this.props.total_user_count){
            this.setState({...this.state, total_users:this.props.total_user_count.total_users, blocked_users:this.props.total_user_count.blocked_users,active_users: this.props.total_user_count.active_users})
        }
        if(prev.block_user !== this.props.block_user){
            if(this.props.block_user.status === true){
                this.props.getAllUsers(this.state.currentPage,this.state.itemPerPage);
                this.props.getAllBlockedUsers(this.state.currentPage,this.state.itemPerPage);
                this.props.getTotalNumberUsers();

                Swal.fire({
                    icon: "success",
                    title: this.props.block_user.message,
                    text: '',
                    confirmButtonText: "OK",
                    confirmButtonColor: "#154272",
                  
                })
            }
        }
        if(prev.errblock !== this.props.errblock){
            this.setState({
                blocked_users_table:[]
            })
        }
        if(prev.revok !== this.props.revok){
            this.setState({
                revokcount:this.props.revok?.revokeCount?.count
            })
        }
    }

    handleTab=(isActive)=>{
        this.setState({...this.state, isAllUsersActive:isActive,itemPerPage:5})
        this.props.getTotalNumberUsers();
    }

    getAllBlockedUsers=()=>{
        this.props.getAllBlockedUsers(this.state.currentPage,this.state.itemPerPage);
    }

    setCurrentPage=(e)=>{
        this.setState({
            currentPage:e.selected+1
        })
        this.props.getAllUsers(e.selected+1,this.state.itemPerPage);
    }

    itemhandle=(e)=>{
        this.setState({
            itemPerPage:e.target.value,
            currentPage: 1

        })
        this.props.getAllUsers(1,e.target.value);
        this.props.getAllBlockedUsers(1,e.target.value);
    }

    setCurrentPageBlock=(e)=>{
        this.setState({
            currentPage:e.selected+1
        })
        this.props.getAllBlockedUsers(e.selected+1,this.state.itemPerPage);
    }

   
    render(){

        const Totaluser = this.state.active_users + this.state.revokcount
        return  <React.Fragment>
                    <div className='row'>
                       
                        
                        <div className='mt-4 col-md-12 d-flex justify-content-center'>
                            <div style={{width:'95%'}}>
                                <div className='bg-white card-body' style={{boxShadow: '0px 3px 10px #DDE8F245',
                                    border: '1px solid lightgray', padding:0,
                                    borderRadius:'10px'}}>
                                    <div style={{borderBottom:'1px solid lightgray',fontSize:'1.2rem',fontWeight:'bold',height:'2.5rem', display:'flex'}}>
                                        <span className='mt-2 ml-2' style={{marginLeft:'1rem'}}>User Management</span>
                                    </div>
                                    <div style={{width:'100%'}}>
                                        <div className='row' style={{margin:'3rem 0',padding:0}}>
                                            <div className='col-md-12 d-flex justify-content-center align-items-center'>
                                                <div className="row" style={{width:'100%',display:'flex'}}>
                                                    <div className='mt-2 col-lg-3 col-sm-6'>
                                                        <div style={{borderRadius:'10px', border:'1px solid lightgray',
                                                            height:'6rem',
                                                            boxShadow: '0px 3px 10px #DDE8F245'}}>
                                                            <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',borderBottom:'1px solid rgba(211, 211, 211, 0.44)',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                            Total Number of Users
                                                            </div>
                                                            
                                                            <div style={{float:'left',height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                            &nbsp;&nbsp;<MdGroups></MdGroups>
                                                            </div>
                                                            <div style={{float:'right',height:'5.2rem', display:'flex',alignItems:'center',paddingRight:'1rem', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                            &nbsp;  <span>{Totaluser}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-2 col-lg-3 col-sm-6'>
                                                        <div  style={{borderRadius:'10px', border:'1px solid lightgray',
                                                            height:'6rem',
                                                            boxShadow: '0px 3px 10px #DDE8F245'}}>
                                                            <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',borderBottom:'1px solid rgba(211, 211, 211, 0.44)',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                            Active Users
                                                            </div>
                                                            
                                                            <div style={{float:'left',height:'5.2rem', display:'flex',alignItems:'center', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                            &nbsp;&nbsp;<MdGroups></MdGroups>
                                                            </div>
                                                            <div style={{float:'right',height:'5.2rem', display:'flex',alignItems:'center',paddingRight:'1rem', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                            &nbsp;  <span>{this.state.active_users}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-2 col-lg-3 col-sm-6'>
                                                        <div style={{borderRadius:'10px',border:'1px solid lightgray',
                                                            height:'6rem',
                                                            boxShadow: '0px 3px 10px #DDE8F245'}}>
                                                            <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',borderBottom:'1px solid rgba(211, 211, 211, 0.44)',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                            Blocked Users
                                                            </div>
                                                            
                                                        <div style={{float:'left',height:'5.2rem', display:'flex',alignItems:'center',paddingRight:'1rem', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                                &nbsp; &nbsp; &nbsp;   <BiBlock></BiBlock>
                                                            </div>   
                                                            <div style={{float:'right',height:'5.2rem', display:'flex',alignItems:'center',paddingRight:'1rem', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                            &nbsp;  <span>{this.state.blocked_users}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-2 col-lg-3 col-sm-6'>
                                                        <div style={{borderRadius:'10px',border:'1px solid lightgray',
                                                            height:'6rem',
                                                            boxShadow: '0px 3px 10px #DDE8F245'}}>
                                                            <div style={{fontSize:'0.8rem',height:'1.8rem',width:'100%',borderBottom:'1px solid rgba(211, 211, 211, 0.44)',paddingLeft:'1rem',paddingTop:'0.5rem'}}>
                                                            Revoked Users
                                                            </div>
                                                            
                                                        <div style={{float:'left',height:'5.2rem', display:'flex',alignItems:'center',paddingRight:'1rem', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                                &nbsp; &nbsp; &nbsp;   <BiBlock></BiBlock>
                                                            </div>   
                                                            <div style={{float:'right',height:'5.2rem', display:'flex',alignItems:'center',paddingRight:'1rem', fontSize:'1.5rem',fontWeight:'bold'}}>
                                                            &nbsp;  <span>{this.state.revokcount}</span>
                                                            </div>
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
                                    borderRadius:'10px'}}>
                                    <div style={{borderBottom:'1px solid lightgray',height:'2.5rem', display:'flex'}}>
                                        <div  onClick={()=>{this.handleTab(true);this.props.getAllUsers()}}
                                        style={{marginLeft:'2rem',height:'100%',cursor:'pointer',borderBottom:this.state.isAllUsersActive && '2px solid #03596E', transition:'border-bottom 0.3s ease-in-out',padding:'10px'}}>
                                            <span style={{fontSize:'1.1rem',fontWeight:'bold',color:!this.state.isAllUsersActive && '#00000099'}}>All Users</span>
                                        </div>
                                        <div onClick={()=>{this.handleTab(false);this.props.getAllBlockedUsers(this.state.currentPage,this.state.itemPerPage)}}
                                        style={{marginLeft:'4rem', borderBottom: !this.state.isAllUsersActive && '2px solid #03596E',padding:'10px'}}>
                                            <span style={{fontSize:'1.1rem',cursor:'pointer',color:this.state.isAllUsersActive && '#00000099',fontWeight:'bold'}}>Blocked Users</span>
                                        </div>
                                    </div>
                                    {this.state.userLoader !== true ?
                                        <div style={{width:'98%',marginLeft:'1%',marginTop:'2rem'}}>
                                            {this.state.isAllUsersActive?<table style={{width:'100%'}}>
                                                <tr style={{fontWeight:'bold', height:'3rem', background:'#D9E1E3'}}>
                                                    <td className='p-2 col'> <span style={{marginLeft:'4rem'}}>User Name</span></td>
                                                    <td className='col'>Signed In On</td>
                                                    <td className='col'>Status</td>
                                                    <td className='text-center col'>Action</td>
                                                </tr>
                                                {this.state.all_user_table.length!==0 && this.state.all_user_table.map((val,i)=>{
                                                    return <tr key={i+'alluserrow'} style={{fontSize:'0.9rem',height:'3rem'}}>
                                                        <td className='col' style={{width:'30%'}}><span style={{marginLeft:'1rem',borderRadius:'50px',fontSize:'0.8rem',padding:'0.4rem 0.6rem'}}>{val.username}</span></td>
                                                        <td className='col'>{moment(val.createdAt).format("DD-MMM-YYYY")}</td>
                                                        <td className='col'> 
                                                            <div className='row' style={{display:'flex'}}>
                                                                <div className='col-md-1' style={{marginTop:'8px'}}>
                                                                    {val.status==='ACTIVE'? <BsFillCircleFill size={8} color={'#009933'}></BsFillCircleFill>: <BsFillCircleFill size={8} color={'#990033'}></BsFillCircleFill>} 
                                                                </div>
                                                                <div className='col-md-9'>
                                                                    <span style={{color:'#03596E',marginTop:'0rem',marginLeft:'10px'}}>{val.status}</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='text-center col'>
                                                            {val.status==='ACTIVE'?<span className='hoverBtnChange' onClick={()=>this.props.blockUser(val._id,'block')}>Block</span>
                                                            :<span className='hoverBtnChange'  onClick={()=>this.props.blockUser(val._id,'approve')}>Unblock</span>}
                                                        </td>
                                                    </tr>
                                                })}
                                            </table>:<table style={{width:'100%'}}>
                                                <tr style={{fontWeight:'bold', height:'3rem', background:'#D9E1E3'}}>
                                                    <td className='p-2 col'> User Name</td>
                                                    <td className='col'>Signed In On</td>
                                                    <td className='col'>Status</td>
                                                    <td className='text-center col'>Action</td>
                                                </tr>
                                                {this.state.blocked_users_table.length!==0 && this.state.blocked_users_table.map((val,i)=>{
                                                return <tr style={{fontSize:'0.9rem',height:'3rem'}}>
                                                    <td className='col' style={{width:'30%'}}><span style={{marginLeft:'1rem',borderRadius:'50px',fontSize:'0.8rem',padding:'0.4rem 0.6rem'}}>{val.username}</span></td>
                                                    <td className='col'>{moment(val.createdAt).format("DD-MMM-YYYY")}</td>
                                                    <td className='col' style={{display:'flex',marginTop:'12px'}}> <BsFillCircleFill style={{width:'10px',marginTop:'5px'}} color={'#990033'}></BsFillCircleFill> &nbsp;&nbsp;<span style={{color:'#03596E',marginTop:'0rem'}}>{val.status}</span></td>
                                                    <td className='text-center col'>
                                                            <span className='hoverBtnChange'  onClick={()=>this.props.blockUser(val._id,'approve')}>Unblock</span>
                                                        </td>
                                                </tr>})}
                                            </table>}
                                        </div>
                                    :
                                        <center><img src={loader} alt="" style={{width:'80px'}}/></center>
                                    }
                                    
                                </div>
                                <div style={{marginTop:'20px'}}>
                                    <input value={this.state.itemPerPage} onChange={this.itemhandle} style={{border:'1px solid lightgray',width:'50px',padding:'3px 7px'}}/> &nbsp; Items per page
                                </div>

                                
                                <div style={{marginTop:'20px',width:'400px',marginLeft:'35%'}}>
                                    {this.state.isAllUsersActive === true &&
                                       
                                        <ReactPaginate
                                            nextLabel=">"
                                            onPageChange={this.setCurrentPage}
                                            pageRangeDisplayed={3}
                                            marginPagesDisplayed={2}
                                            pageCount={this.state.dataUser?.pages}
                                            previousLabel="<"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakLabel="..."
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            containerClassName="pagination"
                                            activeClassName="active"
                                            renderOnZeroPageCount={null}
                                        />
                                    }
                                    {this.state.isAllUsersActive === false &&
                                    <ReactPaginate
                                        nextLabel=">"
                                        onPageChange={this.setCurrentPageBlock}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        pageCount={this.state.blockpage}
                                        previousLabel="<"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        renderOnZeroPageCount={null}
                                    />
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </React.Fragment>
    }
}

const mapStateToProps=(state)=>{
    return {
        all_users:state.certificate.all_users,
        blocked_users:state.certificate.blocked_users,
        total_user_count:state.certificate.total_user_count,
        block_user: state.certificate.block_user,
        errblock: state.certificate.blockuserErr,
        revok: state.certificate.revUser
    }
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({
        getAllUsers,
        getAllBlockedUsers,
        getTotalNumberUsers,
        blockUser,
        getRevokedUsers
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UserManagement);