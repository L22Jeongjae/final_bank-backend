import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';
import React, { Component } from 'react';
import Apiservice from '../../ApiService';
import {Delete , Create} from '@mui/icons-material';


class ListMemberComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            members: [],
            message: null
        }
    }

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

    componentDidMount() {
        this.reloadMemberList();
    }

    reloadMemberList = () => {
        Apiservice.fetchMembers()
            .then(res => {
                this.setState({
                    members : res.data
                })
            })
            .catch(err => {
                console.log('reloadUserList() Error', err );
            })
    }
    // insert
    addMember = () => {
        window.localStorage.removeItem("memberID");
        this.props.history.push('/add-member');
    }
    
    // update
    editMember = (ID) => {
      window.localStorage.setItem('memberID',ID);
      this.props.history.push('edit-member');
    }

     // delete
     deleteMember = (memberID) => {
        Apiservice.deleteMember(memberID)
            .then(res => {
                this.setState({
                    message: 'User Deleted Successfully.'
                });
                this.setState({
                    members: this.state.members.filter( member =>
                        member.id !== memberID)
                });
            })
            .catch(err => {
                console.log('deleteUser() Error', err);
            })
    }


    render() {
        return(
            <div>
                <Typography variant='h4' style={style}>Member List</Typography>
                <Button variant='contained' color='primary' onClick={this.addMember}> Add Member </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>password</TableCell>
                            <TableCell>name</TableCell>
                            <TableCell>birthday</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell>hp</TableCell>
                            <TableCell>regDate</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.members.map(member => 
                            <TableRow key={member.id}>
                                <TableCell component='th' scope='member'> {member.id} </TableCell>
                                <TableCell > {member.password} </TableCell>
                                <TableCell > {member.name} </TableCell>
                                <TableCell > {member.birthday} </TableCell>
                                <TableCell > {member.address} </TableCell>
                                <TableCell > {member.email} </TableCell>
                                <TableCell > {member.hp} </TableCell>
                                <TableCell > {member.regDate} </TableCell>
                                <TableCell onClick={ () => this.editMember(member.id)}>
                                     <Create />
                                </TableCell>
                                <TableCell >
                                     <Delete onClick={ () => this.deleteMember(member.id)}/>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

const style =  {
    display: 'flex',
    justifyContent: 'center'
}

export default ListMemberComponent;
 
