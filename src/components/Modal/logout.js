import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { navigate } from '@reach/router'


function Header(props) {
    
  const [open, setOpen] = useState(true);
    return (
        <Modal open={open}  center>
          <div style={{height:'40%',width:'60%'}}>
            <p style={{width:'100%',marginRight:'150px', fontWeight:'bold',color:'#144272',marginLeft: '160px',marginTop: '50px',fontSize:'20px'}}>Login is necessary for furthur process</p>
            <button onClick={() => navigate('/')}style={{marginBottom: '50px',paddingTop:'10px',paddingBottom:'10px',width:'92%',marginRight:'150px', fontWeight:'bold',color:'white',backgroundColor:'#144272',marginLeft: '160px',marginTop: '50px',fontSize:'20px',borderRadius:'5px',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'}}  id="button">Go To The Login Page</button>
          </div>
        </Modal>
    )
}
export default Header