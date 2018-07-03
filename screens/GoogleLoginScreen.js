import React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Expo, { Google } from "expo";
import Button from '../components/Button';

export default class GoogleLoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Google',
  };
  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => this._testGoogleLogin()} title="Authenticate with Google" />
      </View>
    );
  }

  _testGoogleLogin = async () => {
    try {
      // let result = await Google.logInAsync({
      //   // androidStandaloneAppClientId:
      //   //   '603386649315-87mbvgc739sec2gjtptl701ha62pi98p.apps.googleusercontent.com',
      //   androidClientId: '909204290895-4qj960gqqgqoa66a13psfto7jc8lmrko.apps.googleusercontent.com',
      //   // iosStandaloneAppClientId:
      //   //   '603386649315-1b2o2gole94qc6h4prj6lvoiueq83se4.apps.googleusercontent.com',
      //   iosClientId: '909204290895-bive45a2ahqk74dum0mojmq9glua5phl.apps.googleusercontent.com',
      //   scopes: ['profile', 'email'],
      // });

      let result = await Expo.AuthSession.startAsync({
        authUrl:
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `&client_id=909204290895-hkhhned0v5urg29i8ivk42ctcoevn4s8.apps.googleusercontent.com` +
        `&redirect_uri=${encodeURIComponent("http://192.168.56.1.xip.io:8080/auth/google/redirect")}` +
        `&response_type=code` +
        `&access_type=offline` +
        `&scope=profile`,
        });
        

      const { type } = result;

      if (type === 'success') {
        // Avoid race condition with the WebView hiding when using web-based sign in
        setTimeout(() => {
          Alert.alert('Logged in!', JSON.stringify(result), [
            {
              text: 'OK!',
              onPress: () => {
                console.log({ result });
              },
            },
          ]);
        }, 1000);
      }
    } catch (e) {
      Alert.alert('Error!', e.message, [{ text: 'OK :(', onPress: () => {} }]);
    }
  };
}
