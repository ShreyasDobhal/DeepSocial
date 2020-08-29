import * as Actions from '../../actions/actions'
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap';

import {connect} from 'react-redux';

const NavigationBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    let loginBtn = null;

    if (props.isSignedIn) {
        loginBtn = (
            <Nav >
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className='nav-bar-userButton'>
                        {props.userName}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <NavLink className='nav-plain-link' href={'/profile/'+props.tokenId}><i className="fa fa-user drop-menu-icon" aria-hidden="true"></i> My Profile</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink className='nav-plain-link' href='/friends'><i className="fa fa-users drop-menu-icon" aria-hidden="true"></i> Friends</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink className='nav-plain-link' href='/messages'><i className="fa fa-comments drop-menu-icon" aria-hidden="true"></i> Messages</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink className='nav-plain-link' href='/profile'><i className="fa fa-cogs drop-menu-icon" aria-hidden="true"></i> Settings</NavLink>
                            {/* <i className="fa fa-cogs" aria-hidden="true"></i> */}
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={props.deleteTokenId}>
                            <i className="fa fa-sign-out drop-menu-icon" aria-hidden="true"></i> Log out
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        )
    } else {
        loginBtn = (
            <Nav>
                <NavItem className='mx-2 '>
                    <Button>Sign in</Button>
                </NavItem>
                <NavItem className='mx-2'>
                    <Button>Sign up</Button>
                </NavItem>
            </Nav>
        );
    }
    

    return (
        <div>
            <Navbar color="dark" dark expand="md" fixed='top'>
                <NavbarBrand href="/">DeepSocial</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/search"><i className="fa fa-search" aria-hidden="true"></i></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/friends">Friends</NavLink>
                        </NavItem>
                        
                        
                    </Nav>
                    {loginBtn}
                    
                </Collapse>
            </Navbar>
            <div className='nav-spacer'></div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tokenId: state.tokenId,
        isSignedIn: state.isSignedIn,
        userName: state.currentUser.fname
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTokenId: (tokenId) => dispatch(Actions.deleteToken())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(NavigationBar));