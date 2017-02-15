import React, { Component } from 'react';
import Button from './Button';
import StartButton from './StartButton';
import Counter from './Counter';
import './App.css';

function getRandomId() {
  return (Math.floor(Math.random() * (4 - 1 + 1)) + 1).toString();
}

function getGameSize() {
  const windowSize = Math.min(window.innerHeight, window.innerWidth);
  return (windowSize < 400 ? windowSize - 40 : 400);
}

let audio = [];
for(let i = 1; i < 5; i++) {
  audio.push(
    new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${i}.mp3`)
  );
}

function playSound(id) {
  audio[id-1].play();
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      gameInProgress: false,
      userSequence: [],
      sequence: [],
      activeId: null,
      incorrectId: null,
      gameSize: getGameSize()
    };
    
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        gameSize: getGameSize()
      });
    });  
  }

  startGame() {
    console.log('startGame');
    this.setState( { 
      gameInProgress: true,
      count: 0,
      userSequence: [],
      sequence: [getRandomId()]
    }, () => {
      this.runSequence();
    });
  }

  runSequence() {
    console.log('runSequence')
    this.state.sequence.forEach((id, index) => {
      window.setTimeout(() => {
        this.setActive(id);
      }, 1000 * (index + 1))
    })
  }

  getResults({ userSequence, sequence }) {
    console.log('getResults');
    console.dir({userSequence, sequence });
    let results = { correct: true, complete: false };
    userSequence.forEach((id, index) => {
      if(id !== sequence[index]) results.correct = false;
    });
    if(userSequence.length === sequence.length) results.complete = true;
    return results;
  }

  setActive(id, callback) {
    console.log('setActive', id);
    playSound(id);
    this.setState({ activeId: id });

    window.setTimeout(() => {
      this.setState({ activeId: null });
      if(callback) callback();
    }, 500)
  }

  handleButtonPress(id) {
    console.log('clicked', id);
    this.setState((prevState) => {
      return {
        userSequence: prevState.userSequence.concat(id)
      };
    }, () => {
      const { sequence, userSequence } = this.state;
      const { correct, complete } = this.getResults({ userSequence, sequence });
      console.log('correct', correct, 'complete', complete);
      if(correct) {
        this.setActive(id, () => {
          if(complete) {
            this.setState((prevState) => {
              return {
                count: prevState.count + 1,
                userSequence: [],
                sequence: prevState.sequence.concat(getRandomId())
              };
            }, () => {
              this.runSequence();
            })
          }
        });
      }
    })
  }
  
  render() {
    const buttons = [{
      id: '1',
      color: '#E65C7B',
      pos: 'top'
    }, {
      id: '2',
      color: '#F9D00F',
      pos: 'right'
    }, {
      id: '3',
      color: '#29C6CD',
      pos: 'bottom'
    }, {
      id: '4',
      color: '#FF9000',
      pos: 'left'
    }];
    const { gameSize, gameInProgress, count } = this.state;
    
    return (
      <div className="App">
        {gameInProgress ? <div style={{width: gameSize, height: gameSize}}>
          <Counter count={count} size={gameSize/2}/>
          <div className="buttons">
            {buttons.map(btn => (
              <Button 
                key={btn.id}
                color={btn.color}
                size={gameSize}
                id={btn.id}
                pos={btn.pos}
                incorrect={this.state.incorrectId===btn.id}
                active={this.state.activeId===btn.id}
                handleButtonPress={this.handleButtonPress}/>
            ))}
          </div>
        </div> : 
        <StartButton startGame={this.startGame}/>}
      </div>
    );
  }
}

export default App;
