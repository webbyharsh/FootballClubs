
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Picker,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';

const apiurl="https://hyclubs.herokuapp.com/api/"


var real_likes=[];
var real_liked=[];

class App extends React.Component {
  state={
    sv:"",
    clubs:[],
    isLoading:false,
    info:true
  }

  


  handleLike=(which,id)=>{
    //console.log(which+this.state.state);
    real_likes[id]+=1;
    real_liked[id]=true;
    this.setState({
      live_likes:real_likes
    })
    fetch(apiurl+'like/'+this.state.state+'/'+which)
    .then((response)=>response.json())
    .then((json)=>{console.log(json)
      //real_likes[id]=json.likes;
    })
    .catch((err)=>console.log(err));
    
    
  }
  handleMore=(v)=>{
  }
  changeHandler=(v)=>{
    real_likes=[],
    real_liked=[],
    //console.log("FROM FUNCTION "+v);
    this.setState({
      isLoading:true,
      clubs_data:[],
      live_likes:[],
      live_liked:[],
      total_clubs:0,
      no_of_clubs_loaded:false,
      load_more:false,
      loaded_how_many_times:0,
      info:false
    });
    fetch(apiurl+"getclubs/"+v+"/0")
    .then((response)=>response.json())
    .then((json)=>{
      var arr=[];
      for(var k in json){
        var nobj={};
        arr.push({
          club:k,
          id:json[k].id,
          likes:json[k].likes,
          city:json[k].city
        })
        real_likes[json[k].id]=json[k].likes;
        real_liked[json[k].id]=false;
      }
      var arr2=arr;
      arr2.pop();
      console.log(arr2);
      
      this.setState({
        state:v,
        clubs_data:arr2,
        isLoading:false,
        live_likes:real_likes,
        live_liked:real_liked
      });
      //console.log(this.state.clubs_data)

    })
    .catch((err)=>console.log(err));
    var temp=0;
    fetch(apiurl+'totalclubs/'+v)
    .then((response)=>response.json())
    .then((json)=>{ temp=json.total_clubs;this.setState({total_clubs:json.total_clubs,no_of_clubs_loaded:true});if(temp>10){
      this.setState({load_more:true});
    }})
    .catch((err)=>console.log(err));
    
  }
  footer= () => {
    if(this.state.load_more){
      return(<Button onPress={this.load_more_clubs} title="Load More" />);
    }else{
      return(<Text></Text>)
    }
  }
  load_more_clubs=()=>{
   
    fetch(apiurl+'getclubs/'+this.state.state+'/'+((this.state.loaded_how_many_times*10)+10).toString())
    .then((response)=>response.json())
    .then((json)=>{
      var arr=[];
      for(var k in json){
        var nobj={};
        arr.push({
          club:k,
          id:json[k].id,
          likes:json[k].likes,
          city:json[k].city
        })
        real_likes[json[k].id]=json[k].likes;
        real_liked[json[k].id]=false;
      }
      var arr2=arr;
      arr2.pop();
      console.log(arr2);
      var arr3=this.state.clubs_data;
      var arr4=arr3.concat(arr2);
      var t=this.state.loaded_how_many_times;
      t=t+1;
      this.setState({
        clubs_data:arr4,
        isLoading:false,
        live_likes:real_likes,
        live_liked:real_liked,
        loaded_how_many_times:t
      });
     this.checkifLoadmore();
    })
      }

  checkifLoadmore=()=>{
    fetch(apiurl+'totalclubs/'+this.state.state)
    .then((response)=>response.json())
    .then((json)=>{
      var a=this.state.clubs_data.length;
      if(a<json.total_clubs){
        this.setState({
          load_more:true
        })
      }
      else{
        this.setState({load_more:false});
      }
    })
    .catch((err)=>console.log(err));
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Football Clubs </Text>
        <Text>Select state from the dropdown menu</Text>
        <Picker 
          selectedValue={this.state.sv}
          onValueChange={(value,id)=>{
            //console.log("changed");
            this.changeHandler(value);
            this.setState({sv:value});
          }}
          style={{height:150,width:200}}
        >
		            <Picker.Item label="Assam" value="Assam" />
                <Picker.Item label="Bihar" value="Bihar" />
                <Picker.Item label="Delhi" value="Delhi" />
                <Picker.Item label="Goa" value="Goa" />
                <Picker.Item label="Gujarat" value="Gujarat" />
                <Picker.Item label="Haryana" value="Haryana" />
                <Picker.Item label="Jammu and Kashmir" value="JammuAndKashmir" />
                <Picker.Item label="Jharkhand" value="Jharkhand" />
                <Picker.Item label="Karnataka" value="Karnataka" />
                <Picker.Item label="Kerala" value="Kerala" />
                <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
                <Picker.Item label="Madhya Pradesh" value="MadhyaPradesh" />
                <Picker.Item label="Maharashtra" value="Maharashtra" />
                <Picker.Item label="Manipur" value="Manipur" />
                <Picker.Item label="Meghalaya" value="Meghalaya" />
                <Picker.Item label="Mizoram" value="Mizoram" />
                <Picker.Item label="Nagaland" value="Nagaland" />
                <Picker.Item label="Odisha" value="Odisha" />
                <Picker.Item label="Punjab" value="Punjab" />
                <Picker.Item label="Rajasthan" value="Rajasthan" />
                <Picker.Item label="Sikkim" value="Sikkim" />
                <Picker.Item label="Tamil Nadu" value="TamilNadu" />
                <Picker.Item label="Telangana" value="Telangana" />
                <Picker.Item label="Uttar Pradesh" value="UttarPradesh" />
                <Picker.Item label="West Bengal" value="WestBengal" />
          </Picker>
          {this.state.isLoading&&<Text style={styles.highlight}>Loading...</Text>}
        {this.state.no_of_clubs_loaded&&<Text>Total clubs in {this.state.state} state:{this.state.total_clubs}</Text>}
        {this.state.info&&<View style={styles.container}>
              <Text style={styles.info}>How Does it work?</Text>
              <Text style={styles.title}>The app uses node.js backend to obtain data from firebase database</Text>
              <Text style={styles.title}> .Just select the state and it will give all the football clubs in that state.</Text>
            </View>}
          <FlatList 
            data={this.state.clubs_data}
        renderItem={({item})=><View style={styles.item}><Text style={styles.title}>{item.club}</Text><Text>{item.city}</Text><Button disabled={this.state.live_liked[item.id]} onPress={()=>{this.handleLike(item.club,item.id)}} title={("👍 "+this.state.live_likes[item.id]).toString()} color="#ff1919"/></View>}
            keyExtractor={item=>item.id.toString()}
            // onEndReached={(v)=>this.handleMore(v)}
            // onEndReachedThreshold={0}
            ListFooterComponent={this.footer}
          />

          

      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  picker:{
    width:150,
    height:50,
    fontSize:250,
  },
  
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginRight: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
    fontSize:40
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width:350,
  },
  info:{
    fontSize: 25,

  },
  title: {
    fontSize: 18,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  
});

export default App;
