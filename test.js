import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { View, StyleSheet, Animated } from 'react-native';


// Loading screen
class ImageLoader extends Component{
    state = {
        opacity: new Animated.value(0),
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start()
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
                      outputRange: [0.85, 1],
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
  


export default function App() {
  return (
    <View style={styles.container}>
     <ImageLoader
        style = {styles.image}
        source = {{uri: 'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3034007-inline-i-applelogo.jpg'}}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width : 300,
    height: 300,
    borderRadius: 10,
  },
});
