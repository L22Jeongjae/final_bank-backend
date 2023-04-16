import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';  // npm install react-router@5 react-router-dom@5
import ListMemberComponent from '../member/ListMemberComponent';
import AddMemberComponent from '../member/AddMemberComponent';
import EditMemberComponent from '../member/EditMemberComponent';

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Route path="/" exact={true} component={ListMemberComponent} />
                    <Route path="/members" component={ListMemberComponent} />
                    <Route path="/add-member" component={AddMemberComponent} />
                    <Route path="/edit-member" component={EditMemberComponent} />
                </div>
            </BrowserRouter>
        </div>
    )    
}

const style =  {
    color: 'blue',
    margin: '10px',
}

export default AppRouter;