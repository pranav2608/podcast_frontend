import React, {useState,useEffect} from "react"
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import axios from "axios"
import Header from "./Components/Header"
import Login from "./Components/Login"
import PodcastRow from "./Components/PodcastRow"
import Episode from "./Components/Episode"
import About from "./Components/About"
import Nocontent from "./Components/Nocontent"
import Footer from "./Components/Footer"
import fire from "./fire"
import './App.css';


function App() {
  const [searchTerm,setSearchTerm] = useState(" ")  
  const [podcasts,setPodcasts] = useState([])
  const [genre,setGenre] = useState("")
  const [episodes,setEpisodes] = useState([])   
  const [selectedPodcast,setSelectedPodcast]=useState(null)

  const [user,setUser] = useState(null)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [emailError,setEmailError] = useState("")
  const [passwordError,setPasswordError] = useState("")
  let [hasAccount,setHasAccount] = useState(false)

  
  //test data
  /*const podcasts = [
    {id:0,name:"podcast 1",image:"images/person_1.jpg",categories:["news","politics"]},
    {id:1,name:"podcast 2",image:"images/person_2.jpg",categories:["sports","media"]},
    {id:2,name:"podcast 3",image:"images/person_3.jpg",categories:["world","travel"]},
    {id:3,name:"podcast 4",image:"images/person_4.jpg",categories:["economy","business"]},
  ]*/

  /*const episodes =[
    {id:0,title:"title 1",image:"images/img_1.jpg",trackURL:"http://hwcdn.libsyn.com/p/e/2/d/e2d49676d65218ec/p1541a.mp3?c_id=84308228&cs_id=84308228&expiration=1601254668&hwt=ccab3206052417d0e901722ab00c9c88"},
    {id:1,title:"title 2",image:"images/img_2.jpg",trackURL:"http://www.largesound.com/ashborytour/sound/AshboryBYU.mp3"},
    {id:2,title:"title 3",image:"images/img_3.jpg",trackURL:"http://www.largesound.com/ashborytour/sound/AshboryBYU.mp3"},
    {id:3,title:"title 4",image:"images/img_4.jpg",trackURL:"http://www.largesound.com/ashborytour/sound/AshboryBYU.mp3"},
    {id:4,title:"title 5",image:"images/img_5.jpg",trackURL:"http://www.largesound.com/ashborytour/sound/AshboryBYU.mp3"},
  ]*/
  //logic code for login
  const clearInputs = ()=>{
    setEmail("")
    setPassword("")
  }
  const clearErrors = ()=>{
      setEmailError("")
      setPasswordError("")
  }

  const handleLogin = ()=>{
      clearErrors()
      fire
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(err=>{
            switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message);
                    break;
                // no default
            }
        })
  }
  const handleSignup = () =>{
      clearErrors()
      fire
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch(err=>{
            switch(err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
                    setPasswordError(err.message);
                    break;
                // no default
            }
        })
  }

  const handleLogout = ()=>{
      fire.auth().signOut();
  }

  const authListener = ()=>{
      fire.auth().onAuthStateChanged(user=>{
        if(user){
          clearInputs()
          setUser(user)
        }
        else{
          setUser("")
        }
      })
  }

  useEffect(()=>{
      authListener()
  })
    


  
  //logic code for homepage
  const onInput = (event)=>{
   let val = event.target.value
   setSearchTerm(val)
  }

  const onButtonClick = async ()=>{
    console.log(searchTerm)
    setGenre(searchTerm)
    const article = { title: searchTerm };
    const response = await axios.post('http://localhost:9000/search', article);
    console.log(response.data.podcasts)
    setPodcasts(response.data.podcasts)

  }

  const selectPodcast = (podcast,event)=>{
    event.preventDefault()
    console.log("selectedPodcast: "+ JSON.stringify(podcast))
    setSelectedPodcast(podcast)

  }

  useEffect(()=>{
    console.log("SELECTED PODCAST:" + JSON.stringify(selectedPodcast))
    if(!selectedPodcast){
      return
    }
    axios.get(`http://localhost:9000/feed?url=${selectedPodcast.rss}`)
    .then(response => {
      const data = response.data
      const {item} = data
      const tracks = item.map((t,index)=>{
        return{
          id:index,
          title:t.title[0],
          image:selectedPodcast.icon,
          trackURL:t.enclosure[0]["$"].url,
          name:selectedPodcast.name
        }
      })
      setEpisodes(tracks)
    });

  },[selectedPodcast])

  let routes
  if(user){
    routes=(
      <Switch>
        <Route path="/" exact>
         
          <div className="site-section">
            <div className="container">
              
              <div className="row">
                <div className="col-lg-3">
                  <div className="featured-user  mb-5 mb-lg-0">
                    <h3 className="mb-2">Search Podcasts</h3>
                    <div style={{display: "flex"}}>
                      <input type="text" style={{height: "32px"}} className="form-control mb-4" onChange={onInput}/>
                      <button onClick={onButtonClick} className="btn btn-info p-1 ml-2" style={{height: "32px"}}>GO!</button>
                    </div>
                    <ul className="list-unstyled">
                      {podcasts.map(podcast=>{
                        return <PodcastRow 
                                  key={podcast.id}
                                  name={podcast.name}
                                  image={podcast.icon}
                                  categories={genre}
                                  onSelect={(e)=>selectPodcast(podcast,e)}

                                />  
                      })}
                    </ul>
                  </div>
                </div>
                {episodes.length!==0?<div className="col-lg-9">
                  {episodes.map(episode=>{
                    return(
                      <Episode
                        key={episode.id}
                        title={episode.title}
                        image={episode.image}
                        trackURL={episode.trackURL} 
                        name ={episode.name}
                      />
                    )
                  })}
                </div>:<Nocontent/>}
                
              </div>
            </div>
          </div>

        </Route>

        <Route path="/about" exact>
          <About />
        </Route>

      </Switch>
    )
  }else{
    routes=(
      <Switch>
        <Route path="/" exact>
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
           />
        </Route>

      </Switch>
    )
  }
  
  return (
    <Router>
      <div className="site-wrap">
          <Header 
            handleLogout={handleLogout}
          />
      </div>
      <main>{routes}</main>
         
      <Footer />
    </Router>  
  );
}

export default App;
