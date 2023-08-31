import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert, // Import Alert from react-native
} from "react-native";

function QuizScreen({ route, navigation }) {
  const { quizData } = route.params;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);

  const handleAnswerSelection = (answer) => {
    if (!isSubmitButtonEnabled) {
      setSelectedAnswer(answer);
    }
  };

  const handleValidation = () => {
    setIsSubmitButtonEnabled(true);
    if (selectedAnswer && selectedAnswer.isCorrect) {
      setScore(score + 1);
      Alert.alert("Bonne réponse !", "Vous avez gagné 1 point.");
    } else {
      Alert.alert("Mauvaise réponse !", "Réessayez la prochaine fois.");
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsSubmitButtonEnabled(false);
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
      disabled={isSubmitButtonEnabled}
    >
      <View style={styles.answerItem}>
        <Text style={styles.answerText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        {" "}
        Question {currentQuestion + 1} / {quizData.questions.length}
      </Text>
      <Text style={styles.questionText}>{item.title}</Text>
      <FlatList
        data={item.answers}
        keyExtractor={(answer) => answer.title}
        renderItem={renderAnswer}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleValidation}
        disabled={!selectedAnswer || isSubmitButtonEnabled}
      >
        <Text style={styles.submitButtonText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );

  if (currentQuestion >= quizData.questions.length) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Résultat</Text>
          <Text style={styles.score}>Score: {score}</Text>
        </View>
        <View style={styles.resultContainer}>
          {quizData.questions.map((question, index) => (
            <View key={question.id} style={styles.questionResultContainer}>
              <Text style={styles.questionResultText}>
                Question {index + 1}: {question.title}
              </Text>
              <Text style={styles.questionResultScore}>
                {question.answers.find((answer) => answer.isCorrect).title ===
                quizData.questions[index].answers.find(
                  (answer) => answer === selectedAnswer
                )
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
  selectedAnswerContainer: {
    backgroundColor: "#e0e0e0", // Change the background color of selected answer
  },
  answerItem: {},
  answerText: {
    fontSize: 16,
  },
  submitButton: {
    alignSelf: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default QuizScreen;
