import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function QuizScreen({ route }) {
  const { quizData } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer.isCorrect) {
      setScore(score + 1);
    }
    // Passer à la question suivante
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1000);
  };

  const renderAnswer = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.answerContainer,
        selectedAnswer === item ? styles.selectedAnswerContainer : null,
        selectedAnswer && selectedAnswer !== item && !item.isCorrect
          ? styles.wrongAnswerContainer
          : null,
      ]}
      onPress={() => handleAnswerSelection(item)}
      disabled={selectedAnswer && selectedAnswer !== item}
    >
      <View style={styles.answerItem}>
        <Text style={styles.answerText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.title}</Text>
      <FlatList
        data={item.answers}
        keyExtractor={(answer) => answer.title}
        renderItem={renderAnswer}
      />
    </View>
  );

  if (currentQuestion >= quizData.questions.length) {
    // Afficher la page de récapitulation avec le score
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Résultat</Text>
          <Text style={styles.score}>Score: {score}</Text>
        </View>
        <View style={styles.resultContainer}>
          {quizData.questions.map((question) => (
            <View key={question.id} style={styles.questionResultContainer}>
              <Text style={styles.questionResultText}>{question.title}</Text>
              <Text style={styles.questionResultScore}>
                {selectedAnswer &&
                question.answers.find((answer) => answer.isCorrect).title ===
                  selectedAnswer.title
                  ? "1 point"
                  : "0 point"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QCM</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
      <FlatList
        data={quizData.questions.slice(currentQuestion, currentQuestion + 1)}
        keyExtractor={(question) => question.id.toString()}
        renderItem={renderQuestion}
      />
      {selectedAnswer && (
        <View style={styles.resultContainer}>
          {selectedAnswer.isCorrect ? (
            <Text style={styles.resultText}>Bonne réponse !</Text>
          ) : (
            <Text style={styles.resultText}>Mauvaise réponse...</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answerContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  selectedAnswerContainer: {},

  answerItem: {},
  answerText: {
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    alignSelf: "center",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  questionResultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  questionResultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  questionResultScore: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
  },
});

export default QuizScreen;
