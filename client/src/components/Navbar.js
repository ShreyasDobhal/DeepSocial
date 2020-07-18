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
            <Nav>
                <NavItem className='mx-2'>
                    <Button onClick={props.deleteTokenId}>Log out</Button>
                </NavItem>
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
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">DeepSocial</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    {loginBtn}
                    
                </Collapse>
            </Navbar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tokenId: state.tokenId,
        isSignedIn: state.isSignedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      deleteTokenId: (tokenId) => dispatch({type:'DELETE_TOKEN'})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(NavigationBar));