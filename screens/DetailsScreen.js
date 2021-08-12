import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const DetailsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Button
            title="Go to details screen...again"
            onPress={() => navigation.push("DetailsScreen")}
        />
        <Button
            title="Go to Bookmark screen"
            onPress={() => navigation.navigate("BookmarkScreen")}
        />
        <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
         <Button
            title="first"
            onPress={() => navigation.popToTop()}
        />
      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});