# 1. 플젝생성
        1) 오픈폴더 => 플젝경로 선택 (리액트가 해당 플젝안에 프론트단에 위치해야하므로)
        D:\Dev126\workspace_spring\springboot_react_oracle>

        2) 플젝생성 new Terminal > command prompt로 바꾸고 
        - npx create-react-app front-react // 플젝생성, 플젝명은 소문자 
        - cd front-react					// 경로 이동
        - npm start							// 실행 : localhost:3000
            
# 2. front-react > src > component > member > ListMemberComponent.js

// npm install @mui/material @emotion/react @emotion/styled

import React, { Component } from 'react';

class ListMemberComponent extends Component {
    render() {
        return(
            <div>
                <h1>MemberListM</h1>
            </div>
        )
    }
}
export default ListMemberComponent;
 


# 3. front-react > src > component > route > RouterComponent.js

다운그레이드 후에 component 소문자 <Route path="/" exact={true} component={ListMemberComponent} />

import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';  // npm install react-router@5 react-router-dom@5
import ListMemberComponent from '../member/ListMemberComponent';

const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <div style={style}>
                    <Route path="/" exact={true} component={ListMemberComponent} />
                    <Route path="/members" component={ListMemberComponent} />
                    <Route path="/add-member" component={""} />
                    <Route path="/edit-member" component={""} />
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

# 다운그레이드 

 import {BrowserRouter, Route} from 'react-router-dom';  
 // npm install react-router@5 react-router-dom@5

    "react-router": "^5.3.4",
    "react-router-dom": "^5.3.4",



# 다운그레이드 => npm install react@^17.0.2 react-dom@^17.0.2

npm install react@^17.0.2 react-dom@^17.0.2

    "react": "^17.0.2",
    "react-dom": "^17.0.2",

# 4-1. App.js - RouterComponent 호출
   - App.css, index.css, logo.svg 삭제, import 삭제

   import AppRouter from './component/route/RouterComponent';

    function App() {
    return (
        <div>
            <AppRouter />
        </div>
    );
    }

    export default App;

# 4-2. index.js - 
 
    import './index.css'; 삭제
    
    import React from 'react';
    import ReactDOM from 'react-dom'; // client 삭제
    import App from './App';
    import { BrowserRouter } from 'react-router-dom';

    ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
    );

# 5. 실행 : npm start > localhost:3000

# ---------------------------------------------------------

# 6-1. front-react > src > component > route > NavBar.js

    import {AppBar, Toolbar, IconButton, Typography , Button , Menu} from '@mui/material';

const Navbar = () => {
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" style={style}>
                        React User Application
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const style = {
    flexGrow: 1
}

export default Navbar;

# 6-2. App.js - <NavBar /> 추가, import 추가

    import Navbar from './component/route/Navbar';
    import AppRouter from './component/route/RouterComponent';

    function App() {
    return (
        <div>
            <Navbar />
            <AppRouter />
        </div>
    );
    }

    export default App;

# ---------------------------------------------------------------------------------

# 7. ListMemberComponent.js 수정

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

    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정

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
    // // insert
    // addMember = () => {

    // }

    // // update
    // editMember = (ID) => {
 
    // }

    // // delete
    // deleteMember = (memberID) => {

    // }


    render() {
        return(
            <div>
                <Typography variant='h4' style={style}>Member List</Typography>
                <Button variant='contained' color='primary' > Add Member </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.members.map(member => 
                            <TableRow key={member.id}>
                                <TableCell component='th' scope='member'> {member.id} </TableCell>
                                <TableCell > {member.username} </TableCell>
                                <TableCell > {member.age} </TableCell>
                                <TableCell > {member.email} </TableCell>
                                <TableCell > {member.address} </TableCell>
                                <TableCell > {member.salary} </TableCell>
                                <TableCell >
                                     <Create />
                                </TableCell>
                                <TableCell >
                                     <Delete />
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
 
# 8. src > ApiService.js
import axios from 'axios';

// - ApiService는 스프링 부트 서버(보통 'http://localhost:8081/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴 이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 Ajax 역할을 한다고 생각하면 된다.
// - npm install axios

const MEMBER_API_BASE_URL = "http://localhost:8081/members";

class ApiService {
    fetchMembers() {
        return axios.get(MEMBER_API_BASE_URL);
    }
    
    // addUser(member) {
    //     return axios.post(MEMBER_API_BASE_URL, member);
    // }

    // editMember(member) {
    //     return axios.
    // }
  
}

export default new ApiService;

# 9. 실행 0 리스트 타이틀만 실행 #CORS Axios 에러
    Access to XMLHttpRequest at 'http://localhost:8081/members' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.


    # 스프링부트에 소스 추가
        filter 패키지 > CorsFilter.java 추가

        ReactController.java의 class 위에 @CrossOrigin(origins="**", maxAge=3600) 추가

        @CrossOrigin(origins="**", maxAge=3600)
        @RestController
        @RequestMapping(value="/members")
        public class ReactController 

# 10. t실행 - 멤버리스트 출력

# --------------------------------------[추가]------------------------------

# 11-1. ListMemberComponent.js

    // insert
    addMember = () => {
        window.localStorage.removeItem("memberID");
        this.props.history.push('/add-member');
    }

    <Button variant='contained' color='primary' onClick={this.addMember}> Add Member </Button>

# 11-2. RouterComponent.js
    RouterComponent.js에 추가 => <Route path="/add-member" component={AddMemberComponent} />


# 11-2. front-react > src > component > member > AddMemberComponent.js  생성 및 작성
import React, { Component } from 'react';
import {Typography} from '@mui/material';
import ApiService from '../../ApiService';


class AddMemberComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            username: '',
            age: '',
            email: '',
            address: '',
            salary: '' , 
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
            password: this.state.password,
            username: this.state.username,
            age: this.state.age,
            email: this.state.email,
            address: this.state.address,
            salary: this.state.salary
        }

        ApiService.addMember(member)
            .then(res => {
                this.setState({
                    message: member.username + "님이 성곡적으로 등록되었습니다."
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
                <Typography variant='h4' style={style}>Add Member</Typography> 
                <form>
                    <div>
                    <label>password: </label>
                    <input type='password' name='password' value={this.state.password} placeholder='input your password' 
                            onChange={this.onChange} />
                    </div>

                    <div>
                    <label>username: </label>
                    <input type='text' name='username' value={this.state.username} placeholder='input your username' 
                            onChange={this.onChange} />
                    </div>
                    
                    <div>
                    <label>age: </label>
                    <input type='text' name='age' value={this.state.age} placeholder='input your age' 
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
                    <label>salary: </label>
                    <input type='number' name='salary' value={this.state.salary} placeholder='input your salary' 
                            onChange={this.onChange} />
                    </div>

                    <button onClick={this.saveMember}>Save</button>
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

# 11-3. ReactController.java 에 추가

    @PostMapping
	public void insertMember(@RequestBody MemberDTO dto)
			throws ServletException, IOException {
				logger.info("<<< url - memberInsert() >>>");
				
				service.insertMember(dto);
			}

# 11-4. ApiService.js 추가
    
    addMember(member) {
         return axios.post(MEMBER_API_BASE_URL, member);
    }

# --------------------------------------[수정]------------------------------

# 12-1. ListMemberComponent.js 

     <TableCell onClick={ () => this.editMember(member.id)}>

    // update
    editMember = (ID) => {
      window.localStorage.setItem('memberID',ID);
      this.props.history.push('edit-member');
    }
# 12-2. RouterComponents.js

    <Route path="/edit-member" component={EditMemberComponent} />

# 12-3. front-react > src > component > member > EditMemberComponent.js 추가 및 작성

    import { Component } from "react";
import {Typography} from '@mui/material';
import ApiService from '../../ApiService';

class EditMemberComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            password: '',
            username: '',
            age: '',
            email: '',
            address: '',
            salary: '' , 
            message: null
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    editMember = (e) => {
        e.preventDefault();

        let member = {
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
                    <label>password: </label>
                    <input type='password' name='password' value={this.state.password} placeholder='Edit your password' 
                            onChange={this.onChange} />
                    </div>

                    <div>
                    <label>username: </label>
                    <input type='text' name='username' readOnly='true' defaultvalue={this.state.username} 
                             />
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

# 12-3. ReactController.java 에 추가

    //Update
	@PutMapping("/{id}")
	public void updateMember(@PathVariable int id,@RequestBody MemberDTO dto)
			throws ServletException, IOException {
				logger.info("<<< url - memberUpdate() >>>");
				
				service.selectMember(id);
				service.updateMember(dto);
	}
	
# 12-4. ApiService.js 추가
    
    editMember(member) {
      return axios.get(MEMBER_API_BASE_URL + '/' + member.id, member);
    }


# - localStorage : 브라우저에 key-value 값을 storage에 저장할 수 있다.
                    데이터를 브라우저에 반영구적으로 저장하며, 브라우저를 종료후 재시작해도 데이터가 남아있다.
                    쿠키와 유사하나 쿠키는 4kg까지만 저장가능하나, 웹 스토리지는 약 5kg 정도의 저장공간을 가진다.
                    데이터 구조가 key-value로 이루어져있으며, 데이터는 문자열로만 저장, 변환된다.
                    javascript에서는 API를 이용해 web storage에 접근할 수 있다.
                    저장한 데이터는 세션간에 공유된다.
                    세션이 바뀌어도 저장한 데이터가 유지된다.

                    Origin - url체계(http, https) / 호스트(xxx.com) 등의 도메인/ 포트번호(80, 8080 ... )

        - setItem() - key, value 추가  => roqkfwkehrn > Application 탭 > Local Storage에서 데이터 확인 가능
        - getItem() - key로 value 읽어오기
        - removeItem() - item 삭제
        - clear() - 도메인 내의 localStorage 값 삭제
        - length - 전체 item 갯수
        - key() - index로 key값 찾기

