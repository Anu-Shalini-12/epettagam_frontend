import React, { Component } from 'react';
import HorizontalBar from './HorizontalBar';
import { Outlet } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setRoutingName } from '../../components/store/certificates/action';
import { RiDashboardFill } from 'react-icons/ri';
import { MdGroups } from 'react-icons/md';
import {HiDocument} from 'react-icons/hi';
import NambiLogoImg from '../../Assets/MicrosoftTeams-image (7).png';
import tnegaLogo from "../../Assets/TNeGA_logo.png"





class AdminLayout extends Component{

    componentDidMount(){
        if(sessionStorage.getItem("authToken") === null){
            window.location.href = "/admin"
        }
    }

    
    componentDidUpdate=(prev)=>{
        if(prev.route_title!==this.props.route_title)
        {
            if(this.props.route_title!==""){
                this.handleRoutingTitleRoot(this.props.route_title);
            }
        }
    }

    highlightedIconColor="invert(61%) sepia(68%) saturate(6219%) hue-rotate(192deg) brightness(96%) contrast(81%)";
    unhighlightedIcon="none";

    switchDrawerOn=(e)=>{
        e.preventDefault();
        document.querySelector('verticalBarID').classList.remove='verticalBar';
        document.querySelector('verticalBarID').classList.className ='activeVerticalBar';
    }

    switchDrawerOff=(e)=>{
        e.preventDefault();
        document.querySelector('verticalBarID').classList.remove='activeVerticalBar';
        document.querySelector('verticalBarID').classList.className ='verticalBar';
    }

    constructor(props){
        super(props);
        this.state = {
            menu: [
                { title: 'Dashboard', id: 'dash', showHighlight: false, routingName: 'DASHBOARD', colorClass: 'colorhover', highIconClass: this.highlightedIconColor, submenu: [], routeLink: '/dashboard/', icon:  <RiDashboardFill size={18}></RiDashboardFill> },
                { title: 'User Management', id: 'termst', showHighlight: false, routingName: 'TERMSHEETS', colorClass: 'colorhover', highIconClass: this.highlightedIconColor, submenu: [], routeLink: 'user-management', icon: <MdGroups size={18}></MdGroups>},
                { title: 'All Departments', id: 'termst', showHighlight: false, routingName: 'TERMSHEETS', colorClass: 'colorhover', highIconClass: this.highlightedIconColor, submenu: [], routeLink: 'all_department', icon: <HiDocument size={18}></HiDocument>},
    ],
    routeTitle:'Dashboard',
    currentRoute:[0],
    id:'',
    }
    }


    handleRoutingTitleRoot(name){
        this.setState({...this.state,routeTitle:name});
    }

    navigator1=(url,title,i1,id)=>{
        sessionStorage.setItem('urlData',url)
        var temp=this.state
        temp.routeAdd= url
        this.setState(temp)
        window.location.href=(url);
    }

    navigator2=(url,title,i1,i2,id)=>{
        if(url==null)
            return;
            if(url==="")
                return;

        var temp = this.state;
        if(temp.currentRoute.length===1)
        {    temp.menu[temp.currentRoute[0]].showHighlight=false;
    }
        if(temp.currentRoute.length===2)
         {   temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].showHighlight=false;
}
        if(temp.currentRoute.length===3)
         {   temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].submenu2[temp.currentRoute[2]].showHighlight=false;
}
        temp.menu[i1].submenu[i2].showHighlight=true;
        temp.routeTitle=title;
        this.props.setRoutingName(title);
        temp.currentRoute=[i1,i2];
        this.setState(temp)
        this.props.history.push(url);  
    }

    navigator3=(url,title,i1,i2,i3,id)=>{
        if(url==null)
            return;
            if(url==="")
                return;

        var temp = this.state;

        if(temp.currentRoute.length===1)
        {  temp.menu[temp.currentRoute[0]].showHighlight=false;
        }
        if(temp.currentRoute.length===2)
        {   temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].showHighlight=false;
        }
        if(temp.currentRoute.length===3)
        {   temp.menu[temp.currentRoute[0]].submenu[temp.currentRoute[1]].submenu2[temp.currentRoute[2]].showHighlight=false;
        }
        temp.menu[i1].submenu[i2].submenu2[i3].showHighlight=true;
        temp.routeTitle=title;
        this.props.setRoutingName(title);
        temp.currentRoute=[i1,i2,i3];
        this.setState(temp)
        this.props.history.push(url);
    }

   render() {
       return <div className="rootAdmin">
                <div className="bodyArea">
                    <div id="verticalBarID" className="verticalBar">
                        <div className='TnegaLogo'>
                            <div className='NabiLogo'>
                                <img alt='' src={NambiLogoImg} style={{width:'5rem',marginTop:'15px',marginLeft:'20px'}} />
                            </div>
                            <div className='NabiTitle'>
                                <div className='mainTitle'>TNeGA</div>
                                <div className='subtitle'>Nambikkai Inaiyam</div>
                            </div>
                        </div>
                        <div className='barBox'>
                            {this.state.menu.map((val,i)=><div key={i} className={(val.showHighlight?'vertMenuItemSelected':'vertMenuItem') + ' mt-2'} onClick={()=>this.navigator1(val.routeLink,val.routingName,i,val.id)}>
                                <div className={val.showHighlight?'menuItemSelected':'menuItem'}  style={{backgroundColor:sessionStorage.getItem('urlData') === val.routeLink ? 'white':'',color:sessionStorage.getItem('urlData') === val.routeLink ? '#03596e':'white',padding:'10px',width:'100%'}}>
                                   {val.icon} &nbsp;&nbsp;&nbsp;<div>{val.title}</div></div>
                            </div>)}
                        </div>
                        <div className='barBox'>
                            <img src={tnegaLogo} alt="" style={{marginLeft:'20%'}}/>
                        </div>
                    </div>
                    <div className="mainBody">
                        <HorizontalBar switchDrawerOn={this.switchDrawerOn} switchDrawerOff={this.switchDrawerOff} />
                        
                        <div className="p-1 childrenRoutes" style={{marginTop:'70px'}}>
                            <Outlet/>
                        </div>

                    </div>
                </div>
            </div>
   }
}

const mapStateToProps = (state) =>{
    return {
        route_title:state.certificate.route_title
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        setRoutingName
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminLayout);
