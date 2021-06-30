import React from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInput,
  MDBBtn,
  MDBCard, 
  MDBCardBody
} from 'mdb-react-ui-kit';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      titre:"",
      body:"",
      posts:[
        {
          titre:'sanon',
          body:'steeve'
        },
        {
          titre:'sanon',
          body:'steeve'
        }
      ]
    }
  }



  componentDidMount=()=>{
    this.getData();
    
  }



  handleChange=({target})=>{
    const {name,value}=target;

    this.setState({
      [name]:value
    })  
  }


  displayBlogPost=(posts)=>{

    if(!posts.length)  return null;

    return this.state.posts.map((value,index)=>{
      return(
      <MDBCard key={index} className="mb-4">
        <MDBCardBody>
          <h3 className="Warning">{value.title}</h3>
          <p>{value.body}</p>
        </MDBCardBody>
      </MDBCard>
      )
    }) 

  }


  getData=()=>{
    axios.get('/api')
    .then((response)=>{
      const data=response.data;
      this.setState({
        posts:data
      })
      console.log("data has been received");
    })
  }


  resetInput=()=>{
    this.setState({
      titre:'',
      body:''
    })
  }


  submit=(e)=>{
    e.preventDefault();
    if(this.state.title==='' || this.state.body===''){
       alert("Veuillez remplir correctement les champs");
    }else{
      const data={
        title:this.state.titre,
        body:this.state.body
      }

      axios({
        url:'/save',
        method:'POST',
        data:data
      })
      .then(()=>{
        console.log("donnee envoye vers le server");
        this.resetInput();
        this.getData();
      })
      .catch(()=>{
        console.log("Internal server error");
      })
    }
  }


  render(){

    console.log("Titre : ",this.state);

    return (
      <>
  
        <MDBNavbar light bgColor='light'>
          <MDBContainer fluid>
            <MDBNavbarBrand tag="span" className='mb-0 h1'>MERN APP</MDBNavbarBrand>
          </MDBContainer>
        </MDBNavbar>

        <MDBContainer className="mt-4 mb-4">
          <form onSubmit={this.submit} >
           <MDBInput value={this.state.titre} onChange={this.handleChange} className="mb-4" label='Titre' id='titre' name="titre" type='text' />
           <MDBInput value={this.state.body} onChange={this.handleChange} className="mb-4" label='Body' id='message' name="body" type='text' />
           <MDBBtn type="submit" className='text-dark' color='light'>
            Ajouter
          </MDBBtn>
          </form>
        </MDBContainer>

        <MDBContainer>
          {
           this.displayBlogPost(this.state.posts)
          }
        </MDBContainer>


      </>
    );
  }
}
export default App;