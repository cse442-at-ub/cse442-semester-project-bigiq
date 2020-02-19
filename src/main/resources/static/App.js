import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}

const App = () => (
  <View style={styles.container}>
    <ImageLoader
      style={styles.image}
      source={{ uri: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.15752-9/86449688_480057979547775_3939297940366950400_n.png?_nc_cat=100&_nc_ohc=XW_dsSYhHagAX86bxwT&_nc_ht=scontent-lga3-1.xx&oh=2028b9cb9db6c142b19b53f153bd8b8f&oe=5EBD3F4B' }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 75,
    borderRadius: 10,
  },
});

export default App;