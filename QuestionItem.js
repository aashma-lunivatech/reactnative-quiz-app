import React from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

const QuestionItem = ({ data, selectedOption }) => {
  const { height, width } = Dimensions.get("window");
  return (
    <View style={{ marginTop: 20, width: width }}>
      <Text
        style={{
          fontSize: 20,
          color: "black",
          fontWeight: "bold",
          marginLeft: 20,
          wrap: "break-word",
          marginRight: 20,
          // whiteSpace: initial,
        }}
      >
        {"Ques: " + data.question}
      </Text>
      <FlatList
        data={data.Options}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                width: "90%",
                height: 80,
                backgroundColor: data.marked == index + 1 ? "purple" : "#fff",
                marginTop: 20,
                marginBottom: 10,
                marginLeft: 20,
                elevation: 3,
                flexDirection: "row",
              }}
              onPress={() => {
                selectedOption(index + 1);
              }}
            >
              <View
                style={{
                  width: 30,
                  marginLeft: 10,
                  height: 30,
                  borderRadius: 20,
                  alignItems: "center",
                  backgroundColor: "cyan",
                  justifyContent: "center",
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontWeight: 600 }}>
                  {index == 0
                    ? "A"
                    : index == 1
                    ? "B"
                    : index == 2
                    ? "C"
                    : index == 3
                    ? "D"
                    : ""}
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: 600,
                  marginTop: 20,
                  marginLeft: 10,
                  color: data.marked == index + 1 ? "#fff" : "#000",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default QuestionItem;
