import react, { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import QuizScreen from "./QuizScreen";

const windowWidth = Dimensions.get("window").width;

// Screen components
function HomeScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const navigation = useNavigation();

  const handleQuizPress = (quizData) => {
    navigation.navigate("Quiz", { quizData });
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          "http://estiamqcm.davilat.com/api/quizzes"
        );
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const getTotalQuestions = (questions) => {
    return questions.length;
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleQuizPress(item)}>
        <View style={styles.itemContainer}>
          <Image style={styles.itemImage} source={{ uri: item.image }} />
          <Text style={styles.itemtitle}>{item.title}</Text>
          <Text style={styles.itemSubtitle}>
            {getTotalQuestions(item.questions)} questions
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.Textcontainer}>
        <Text style={styles.TitleText}>Bonjour Demo</Text>
        <Text style={styles.subTitleText}>
          Quel QCM voudrais-tu passer aujourd'hui?
        </Text>
      </View>

      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",

    backgroundColor: "#2b2d31",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  itemContainer: {
    width: windowWidth / 2 - 10,

    margin: 10,
    backgroundColor: "#fff",
    borderWidth: 0,
    borderColor: "#000",
    borderRadius: 10,
    width: 150,
    height: 200,
    display: "flex",
  },
  itemImage: {
    width: "100%",
    height: 120,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  itemtitle: {
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  itemSubtitle: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: "#7b7b7b",
    position: "absolute",
    bottom: 10,
  },
  Textcontainer: {
    alignItems: "left",
    justifyContent: "left",
    padding: 20,
  },
  TitleText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  subTitleText: {
    fontSize: 15,
    color: "#fff",
  },
});
export default HomeScreen;
