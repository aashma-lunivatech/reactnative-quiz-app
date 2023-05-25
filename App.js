import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Question } from "./Question";
import QuestionItem from "./QuestionItem";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = Dimensions.get("window");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState(Question);
  const listRef = useRef();
  const onSelectOption = (index, x) => {
    const tempData = questions;
    tempData.map((item, ind) => {
      if (index == ind) {
        if (item.marked !== -1) {
          item.marked = -1;
        } else {
          item.marked = x;
        }
      }
    });
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setQuestions(temp);
  };
  const getTestScore = () => {
    let marks = 0;
    questions.map((item) => {
      if (item.marked !== 1) {
        marks = marks + 1;
      }
    });
    return marks;
  };
  const reset = () => {
    const tempData = questions;
    tempData.map((item, ind) => {
      item.marked = -1;
    });
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setQuestions(temp);
  };
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginTop: 40,
            marginLeft: 20,
          }}
        >
          Computer Question:{" " + currentIndex + "/" + Question.length}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,
            alignContent: "center",
            marginTop: 40,
            marginRight: 20,
            borderWidth: 1,
            padding: 6,
            borderRadius: 10,
          }}
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({ animated: true, index: 0 });
          }}
        >
          Reset
        </Text>
      </View>
      <View>
        <FlatList
          ref={listRef}
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(x.toFixed(0));
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled //swicth to next by scrolling
          data={questions}
          renderItem={({ item, index }) => {
            return (
              <QuestionItem
                selectedOption={(x) => {
                  onSelectOption(index, x);
                }}
                data={item}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: currentIndex > 1 ? "purple" : "grey",
            justifyContent: "center",
            // display: currentIndex > 1 ? "flex" : "none",
            height: 50,
            width: 100,
            marginLeft: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={() => {
            // console.log(parseInt(currentIndex - 1), "back");
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentIndex - 2),
              });
            }
          }}
        >
          <Text style={{ color: "white", fontWeight: 600 }}>Previous</Text>
        </TouchableOpacity>

        {currentIndex == 5 ? (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              justifyContent: "center",
              height: 50,
              width: 100,
              marginRight: 20,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={{ color: "white", fontWeight: 600 }}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "purple",
              justifyContent: "center",
              height: 50,
              width: 100,
              marginRight: 20,
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => {
              // console.log(currentIndex);
              if (questions[currentIndex - 1].marked !== -1) {
                if (currentIndex < questions.length) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex,
                  });
                }
              }
            }}
          >
            <Text style={{ color: "white", fontWeight: 600 }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.5)" }}>
          <View
            style={{
              // flex: 1,
              backgroundColor: "#fff",
              justifyContent: "center",
              width: "90%",
              alignItems: "center",
              alignContent: "center",
              // height: 200,
              margin: 30,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                padding: 10,
                marginTop: 30,
                alignSelf: "center",
              }}
            >
              Test Score
            </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 800,
                width: "90%",
                height: 200,
                alignItems: "center",
                alignSelf: "center",
                color: "green",
              }}
            >
              {getTestScore()}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                height: 40,
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                color: "red",
                borderWidth: 1,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
