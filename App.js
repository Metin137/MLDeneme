import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TfImageRecognition } from 'react-native-tensorflow';
import ImagePicker from 'react-native-image-picker';
import Routes from './src/config/routes';
const {width, height} = Dimensions.get('window');
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
      loading: false
    }
  }
  async recognizeImage() {
    try {
      const tfImageRecognition = new TfImageRecognition({
        model: require('./assets/tensorflow_inception_graph.pb'),
        labels: require('./assets/tensorflow_labels.txt')
      })
      const results = await tfImageRecognition.recognize({
        image: this.state.imageSource
      })
      const resultText = results;
      this.setState({ result: resultText,loading: false })

      console.log(resultText);
      alert(JSON.stringify(resultText));
      await tfImageRecognition.close()
    } catch (err) {
      alert(err)
    }
  }
  async selectImage() {
    const options = {
      title: 'Resim Seç',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, async(response)  => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response)
        const source = { uri: response.path };
        this.setState({
          imageSource: source.uri,
          loading: true
        },()=>this.recognizeImage());
        //setTimeout(this.recognizeImage,1000);
        //alert(JSON.stringify(this.state.imageSource) )
       //await this.recognizeImage();
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: this.state.imageSource }} style={{ width: 50, height: 50 }} />
        {this.state.loading && <ActivityIndicator size={'large'} color={'#fff'} style={{position:'absolute', top:height/2, left:width/2, zIndex:999}} />}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.selectImage.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.recognizeImage(data);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});