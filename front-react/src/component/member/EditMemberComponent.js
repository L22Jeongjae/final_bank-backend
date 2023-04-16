import { Component } from "react";
import {Typography} from '@mui/material';
import ApiService from '../../ApiService';

class EditMemberComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            password: '',
            username: '',
            age: '',
            email: '',
            address: '',
            salary: '' , 
            message: null
        }
    }

    componentDidMount() {
        this.loadMember();
    }

    loadMember = () => {
        ApiService.fetchMemberByID(window.localStorage.getItem('memberID'))
            .then( res => {
                let member = res.data;
                this.setState({
                    id: member.id,
                    password: member.password,
                    username: member.username,
                    age: member.age,
                    email: member.email,
                    address: member.address,
                    salary: member.salary
                })
            })
            .catch(err => {
                console.log('loadMember() 에러', err);
            });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    editMember = (e) => {
        e.preventDefault();

        let member = {
            id: this.state.id,
            password: this.state.password,
            username: this.state.username,
            age: this.state.age,
            email: this.state.email,
            address: this.state.address,
            salary: this.state.salary
        }

        ApiService.editMember(member)
            .then(res => {
                this.setState({
                    message: member.username + "님이 성공적으로 수정되었습니다."
                })
                console.log(this.state.message);
                this.props.history.push('/members');
            })
            .catch(err => {
                console.log('editMember() Error', err);
            });
    }

    render(){
        return(
            <div>
            <Typography variant='h4' style={style}>Edit Member</Typography> 
                 <form>
                    <div>
                    <label>ID: </label>
                    <input type='text' name='memberID' readOnly value={this.state.id} /> 
                    </div>

                    <div>
                    <label>password: </label>
                    <input type='password' name='password' value={this.state.password} placeholder='Edit your password' 
                            onChange={this.onChange} />
                    </div>

                    <div>
                    <label>username: </label>
                    <input type='text' name='username' value={this.state.username} placeholder="Edit your username"
                            onChange={this.onChange} />
                    </div>
                    
                    <div>
                    <label>age: </label>
                    <input type='text' name='age' value={this.state.age} placeholder='Edit your age' 
                            onChange={this.onChange} />
                    </div>

                    <div>
                    <label>email: </label>
                    <input type='text' name='email' value={this.state.email} placeholder='Edit your email' 
                            onChange={this.onChange} />
                    </div>

                    <div>
                    <label>address: </label>
                    <input type='text' name='address' value={this.state.address} placeholder='Edit your address' 
                            onChange={this.onChange} />
                    </div>

                    <div>
                    <label>salary: </label>
                    <input type='text' name='salary' value={this.state.salary} placeholder='Edit your salary' 
                            onChange={this.onChange} />
                    </div>

                    <button onClick={this.editMember}>Save</button>
                </form>
            </div>
        )
    }
}

const style =  {
    display: 'flex',
    justifyContent: 'center'
}

export default EditMemberComponent;