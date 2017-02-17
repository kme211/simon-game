import React, { Component } from 'react';
import Button from './Button';
import StartButton from './StartButton';
import Counter from './Counter';
import Header from './Header';
import { COUNT_TO_WIN, OUTCOME_WON } from './constants';
import './App.css';

function getRandomPos(positions) {
  const index = (Math.floor(Math.random() * (3 - 0 + 1)));
  return positions[index];
}

function getGameSize() {
  const windowSize = Math.min(window.innerHeight, window.innerWidth);
  return (windowSize < 480 ? windowSize - 80 : 400);
}

const positions = ['top', 'right', 'bottom', 'left'];
const audio = positions.map((pos, index) => {
  return {
    pos,
    sound: new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${index + 1}.mp3`)
  }
});

let intervalIds = [];

function playSound(pos) {
  audio.find(sound => sound.pos === pos).sound.play();
}

function getUpdatedIntervalIds(ids, id) {
  const index = ids.indexOf(id);
  return [
    ...ids.slice(0, index),
    ...ids.slice(index + 1)
  ];
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      gameInProgress: false,
      userSequence: [],
      sequence: [],
      activePositions: [],
      incorrectPos: null,
      disablePlay: false,
      gameSize: getGameSize(),
      outcome: null
    };
    
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.startGame = this.startGame.bind(this);
    this.onRestart = this.onRestart.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        gameSize: getGameSize()
      });
    });  
  }

  startGame() {
    this.setState({ 
      gameInProgress: true,
      count: 0,
      userSequence: [],
      sequence: [getRandomPos(positions)]
    }, () => {
      this.runSequence();
    });
  }

  runSequence() {
    const { sequence } = this.state;
    this.setState({ disablePlay: true });
    sequence.forEach((pos, index) => {
      let id = window.setTimeout(() => {
        intervalIds = getUpdatedIntervalIds(intervalIds, id);
        this.setActive(pos);
        if(index === (sequence.length - 1)) {
          this.setState({ disablePlay : false });
        }
      }, 1000 * (index + 1));
      intervalIds.push(id);
    });
  }

  getResults({ userSequence, sequence }) {
    let results = { correct: true, complete: false };
    userSequence.forEach((pos, index) => {
      if(pos !== sequence[index]) results.correct = false;
    });
    if(userSequence.length === sequence.length) results.complete = true;
    return results;
  }

  setActive(pos, callback) {
    playSound(pos);
    this.setState((prevState) => {
      return { activePositions: prevState.activePositions.concat(pos) };
    });

    let id = window.setTimeout(() => {
      intervalIds = getUpdatedIntervalIds(intervalIds, id);
      this.setState((prevState) => {
        const { activePositions } = prevState;
        const index = activePositions.findIndex(position => position === pos);
        return { 
          activePositions: [
            ...activePositions.slice(0, index),
            ...activePositions.slice(index + 1)
          ]
        };
      });
      if(callback) callback();
    }, 500);
    intervalIds.push(id);
  }

  onRestart(e) {
    intervalIds.forEach(id => {
      window.clearInterval(id);
    });
    intervalIds = [];
    this.setState({
      gameInProgress: false,
      outcome: null,
      sequence: [],
      userSequence: [],
      count: 0,
      activePositions: []
    });
  }

  handleButtonPress(pos) {
    this.setState((prevState) => {
      return {
        userSequence: prevState.userSequence.concat(pos)
      };
    }, () => {
      const { count, sequence, userSequence } = this.state;
      const { correct, complete } = this.getResults({ userSequence, sequence });
      if(correct) {
        this.setActive(pos, () => {
          if(complete) {
            if(count < (COUNT_TO_WIN - 1)) {
              this.setState((prevState) => {
                return {
                  count: prevState.count + 1,
                  userSequence: [],
                  sequence: prevState.sequence.concat(getRandomPos(positions))
                };
              }, () => {
                this.runSequence();
              });
            } else {
              this.setState({
                count: COUNT_TO_WIN,
                disablePlay: true,
                outcome: OUTCOME_WON
              });
            }
          }
        });
      } else {
        this.setState({ incorrectPos : pos });
        this.setActive(pos, () => {
          this.setState({ 
            incorrectPos: null,
            userSequence: []
          }, () => {
            this.runSequence();
          });
        });
        
      }
    })
  }
  
  render() {
    const { outcome, gameSize, gameInProgress, count, incorrectPos, activePositions, disablePlay } = this.state;
    let containerStyles = {
      height: `${gameSize}px`, 
      width: `${gameSize}px`, 
      pointerEvents: !gameInProgress || disablePlay ? 'none' : 'auto'
    };

    if(outcome === OUTCOME_WON) {
      containerStyles = Object.assign(
        {}, 
        containerStyles, 
        { 
          animationName: 'game-won-container', 
          animationIterationCount: 'infinite', 
          animationDuration: '8s',
          animationTimingFunction: 'ease-in-out'
        }
      )
    }
    
    return (
      <div className="App">
          <Header 
          gameInProgress={gameInProgress}
          onRestart={this.onRestart}/>
          <main>
            <Counter 
              count={count} 
              progress={count/COUNT_TO_WIN}
              size={gameSize / 2}/>
            <div className="buttons" style={containerStyles}>
              {positions.map(pos => (
                <Button 
                  key={pos}
                  size={gameSize}
                  pos={pos}
                  incorrect={incorrectPos===pos}
                  active={activePositions.indexOf(pos) !== -1}
                  outcome={outcome}
                  handleButtonPress={this.handleButtonPress}/>
              ))}
            </div>
            {!gameInProgress && <StartButton size={gameSize / 2} startGame={this.startGame}/>}
          </main>
      </div>
    );
  }
}

export default App;
