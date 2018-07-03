import React from 'react';
import { Button, Platform, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { IntentLauncherAndroid } from 'expo';

export default class IntentLauncherScreen extends React.Component {
  static navigationOptions = {
    title: 'IntentLauncher',
  };
  
  renderSettingsLink(title, activity) {
    if (Platform.OS !== 'android') {
      return (
        <View>
          <Text>IntentLauncherAndroid is only available on Android.</Text>
        </View>
      );
    }
    return (
      <View>
        <Button
          onPress={async () => {
            try {
              await IntentLauncherAndroid.startActivityAsync(activity);
              ToastAndroid.show(`Activity finished`, ToastAndroid.SHORT);
            } catch (e) {
              ToastAndroid.show(`An error occurred: ${e.message}`, ToastAndroid.SHORT);
            }
          }}
          title={title}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{ padding: 10 }}>
        {this.renderSettingsLink(
          'Location Settings',
          IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
        )}
      </ScrollView>
    );
  }
}
