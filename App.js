import React,{ Component } from  'react'
import{
  StatusBar,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native'

import Card from './Card'

class App extends Component {
  state = {
    cardSymbols: [
      '❤️', '🤩', '💩', '👍', '😂', '🥶', '😈', '🌝',
    ],
    cardSymbolsInRand:[],
    isOpen: [],
    firstPriceIndex:null,
    secendPriceIndex:null,
    steps :0,
    isEnded:false,

  }
  initGame =()=>{
    let newCardsSymbols = [...this.state.cardSymbols, ...this.state.cardSymbols]
    let cardSymbolsInRand = this.shuffArray(newCardsSymbols)

    let isOpen =[]
    for (let i = 0; i < newCardsSymbols.length; i++) {
      isOpen.push(false)
    }

    this.setState({
      cardSymbolsInRand,
      isOpen,
    })

  }

  componentDidMount(){
    this.initGame()
  }

  shuffArray = (arr) =>{
    const newArr =arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
       const rand = Math.floor(Math.random() * (i + 1));
       [newArr[i], newArr[rand] ]= [newArr[rand], newArr[i]]
    }
    return newArr
  }

  cardPressHandler = (index) =>{
    let isOpen =[...this.state.isOpen]

    if(isOpen[index]){
      return;
    }
    isOpen[index] =true

   

    if (this.state.firstPriceIndex ==null && this.state.secendPriceIndex ==null ){

       this.setState({
      isOpen,
      firstPriceIndex:index,

    })
    }else if (this.state.firstPriceIndex != null && this.state.secendPriceIndex ==null){
      this.setState({
      isOpen,
      secendPriceIndex: index,
    
    })
    }
    this.setState({
      steps : this.state.steps +1,
    })
  }
  
  caclateGameResult =()=>{
      if(this.state.firstPriceIndex != null && this.state.secendPriceIndex !=null){
        if(this.state.cardSymbolsInRand.length>>0){
          let totalOpens = this.state.isOpen.filter((isOpen)=>isOpen)

          if (totalOpens.length === this.state.cardSymbolsInRand.length){

            this.setState({
              isEnded:true,
            })
            return 
          }
          
          
        }
        let firstSymbol = this.state.cardSymbolsInRand[this.state.firstPriceIndex]
        let secondSymbol = this.state.cardSymbolsInRand[this.state.secendPriceIndex]

        if(firstSymbol != secondSymbol ){

          //Incorrect
          setTimeout(() => {
            let isOpen =[...this.state.isOpen]
            isOpen[this.state.firstPriceIndex] = false
            isOpen[this.state.secendPriceIndex] = false

            this.setState({
              firstPriceIndex :null,
              secendPriceIndex:null,
              isOpen

            })
          }, 1000);
        }else{
          //correct

          this.setState({
            firstPriceIndex:null,
            secendPriceIndex:null,

          }


          )
          
        }
}

  }
componentDidUpdate(prevProps,prevState){
  if(prevState.secendPriceIndex != this.state.secendPriceIndex){
    this.caclateGameResult()

  }
}
resetGame = ()=>{
  this.initGame()

  this.setState({

    firstPriceIndex:null,
    secendPriceIndex:null,
    steps :0,
    isEnded:false,
  })
}


  render() {
    return (
      <>
        <StatusBar />
        <SafeAreaView style={ styles.container }>
          <View style={ styles.header }>
            <Text style={ styles.heading}>冒險桓</Text>
            
          </View>
          <View style={ styles.main }>
            <View style={ styles.gameBoard }>
              {this.state.cardSymbolsInRand.map((symbol, index)=>
              <Card key={index} onPress={ () => this.cardPressHandler(index) } style={ styles.button } fontSize={30} title={symbol} cover="❓" isShow={this.state.isOpen[index]}/>
              )}
            </View>
          </View>
          <View style={ styles.footer }>
            <Text style={ styles.footerText }>{
                this.state.isEnded 
                ? `恭喜你在 ${this.state.steps}次 ` 
                : `你用了 ${this.state.steps}次`
          }</Text>
          {this.state.isEnded ? 
            <TouchableOpacity onPress={this.resetGame} style = {styles.tryAgainButton}>

              <Text style={styles.tryAgainButtonText}>在一次</Text> 
            </TouchableOpacity>  
         
            
        :null }
          </View>
        </SafeAreaView>
      </>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  main: {
    flex: 3,
    backgroundColor: '#fff',
  },
  footer: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  gameBoard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: (Dimensions.get('window').width - (48 * 4)) / (5 * 2),
  },
  buttonText: {
    fontSize: 30,
  },
  tryAgainButton:{
    backgroundColor:'#eee',
    padding:8,
    borderRadius:8,
    marginTop:20,

  },
  tryAgainButtonText:{
    fontSize :18,


  }
})