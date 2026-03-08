import { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import GameScreen from "./screens/GameScreen";
import Colors from "./constatnts/colors";
import GameOverScreen from "./screens/GameOverScreen";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [showGameOver, setShowGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  function statrtNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
    setShowGameOver(false);
    setGameIsOver(true);
  }

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
    setShowGameOver(false);
  }

  function gameOverHandler(numOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numOfRounds);
  }

  useEffect(() => {
    if (gameIsOver && userNumber) {
      const timer = setTimeout(() => {
        setShowGameOver(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameIsOver, userNumber]);

  let screen;

  if (!userNumber) {
    screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;
  } else if (showGameOver) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={statrtNewGameHandler}
      />
    );
  } else {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
