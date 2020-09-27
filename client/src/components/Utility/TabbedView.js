import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const TabbedView = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    let NavItems = null;
    let TabPanes = null;

    if (!props.pageComponents || !props.pageNames)
        return null;

    
    NavItems = props.pageNames.map((name, index) => {
        return (
            <NavItem className='fragmentTab'>
                <NavLink className={classnames({active: activeTab === String(index+1)})} 
                         onClick={() => { toggle(String(index+1)); }}>
                    {name}
                </NavLink>
            </NavItem>
        )
    });

    TabPanes = props.pageComponents.map((component, index) => {
        return (
            <TabPane tabId={String(index+1)}>
                {component}
            </TabPane>
        )
    })

    return (
        <div>
            <Nav tabs>
                {NavItems}
            </Nav>
            <TabContent activeTab={activeTab}>
                {TabPanes}
            </TabContent>
        </div>
    );
}

export default TabbedView;
