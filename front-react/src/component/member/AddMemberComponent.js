import React, { Component } from 'react';
import { Button, Typography} from '@mui/material';
import ApiService from '../../ApiService';


class AddMemberComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            password: '',
            name: '',
            birthday: '',
            email: '',
            address: '',
            hp: '' , 
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    saveMember = (e) => {
        e.preventDefault();

        let member = {
            id: this.state.id,
            password: this.state.password,
            username: this.state.username,
            age: this.state.age,
            email: this.state.email,
            address: this.state.address,
            hp: this.state.hp
        }

        ApiService.addMember(member)
            .then(res => {
                this.setState({
                    message: member.username + "님이 성공적으로 등록되었습니다."
                })
                console.log(this.state.message);
                this.props.history.push('/members');
            })
            .catch(err => {
                console.log('addMember() Error', err);
            })
    }
    

    render() {
        return(
            <div>
                <form>
                <Typography variant='h4' style={style}>Add Member</Typography> 
                    <div>
                    <label>id: </label>
                    <input type='id' name='id' value={this.state.id} placeholder='input your id' 
                            onChange={this.onChange} />
                    </div>
                    <div>
                    <label>password: </label>
                    <input type='password' name='password' value={this.state.password} placeholder='input your password' 
                            onChange={this.onChange} />
                    </div>
                    <div>
                    <label>name: </label>
                    <input type='text' name='name' value={this.state.name} placeholder='input your name' 
                            onChange={this.onChange} />
                    </div>
                    <div>
                    <label>birthday: </label>
                    <input type='text' name='birthday' value={this.state.birthday} placeholder='input your birthday' 
                            onChange={this.onChange} />
                    </div>
                    <div>
                    <label>email: </label>
                    <input type='text' name='email' value={this.state.email} placeholder='input your email' 
                            onChange={this.onChange} />
                    </div>
                    <div>
                    <label>address: </label>
                    <input type='text' name='address' value={this.state.address} placeholder='input your address' 
                            onChange={this.onChange} />
                    </div>
                    <div>
                    <label>hp: </label>
                    <input type='text' name='hp' value={this.state.hp} placeholder='input your hp' 
                            onChange={this.onChange} />
                    </div>
                    <Button onClick={this.saveMember}>Save</Button>
                </form>
            </div>
        )
    }
}

const style =  {
    display: 'flex',
    justifyContent: 'center'
}

export default AddMemberComponent;