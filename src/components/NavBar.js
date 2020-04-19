import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Carrier Finder</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Carrier Contacts
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Carrier 1</DropdownItem>
                  <DropdownItem>Carrier 2</DropdownItem>
                  <DropdownItem>Carrier 3</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Carrier 4 nor west</DropdownItem>
                  <DropdownItem>Carrier 5 nor west</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  How To For Carriers
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Carrier 1</DropdownItem>
                  <DropdownItem>Carrier 2</DropdownItem>
                  <DropdownItem>Carrier 3</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Carrier 4 nor west</DropdownItem>
                  <DropdownItem>Carrier 5 nor west</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
