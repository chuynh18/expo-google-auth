import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import Colors from '../constants/Colors';

const {
  NativeAdsManager,
  AdSettings,
  InterstitialAdManager,
  BannerView,
  withNativeAd,
} = Expo.FacebookAds;

AdSettings.addTestDevice(AdSettings.currentDeviceHash);

const adsManager = new NativeAdsManager('1912255062335197_1912257885668248');

const FullNativeAd = withNativeAd(({ nativeAd }) => (
  <View style={styles.fullad}>
    {nativeAd.icon && <Image style={styles.icon} source={{ uri: nativeAd.icon }} />}
    <View>
      <Text style={styles.title}>{nativeAd.title}</Text>
      {nativeAd.subtitle && <Text style={styles.subtitle}>{nativeAd.subtitle}</Text>}
      {nativeAd.description && <Text style={styles.description}>{nativeAd.description}</Text>}
      <View style={styles.adButton}>
        <Text>{nativeAd.callToActionText}</Text>
      </View>
    </View>
  </View>
));

export default class App extends React.Component {
  static navigationOptions = {
    title: 'FacebookAds',
  };

  showFullScreenAd = () => {
    InterstitialAdManager.showAd('1912255062335197_1914986612062042')
      .then(didClick => {
        console.log(didClick);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onBannerAdPress = () => console.log('Ad clicked!');
  onBannerAdError = event => console.log('Ad error :(', event.nativeEvent);

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.header}>Native Ad</Text>
        <FullNativeAd adsManager={adsManager} />
        <Text style={styles.header}>Banner Ad</Text>
        <BannerView
          type="large"
          placementId="1912255062335197_1954647211429315"
          onPress={this.onBannerAdPress}
          onError={this.onBannerAdError}
        />
        <Text style={styles.header}>Interstitial ad</Text>
        <TouchableOpacity style={styles.button} onPress={this.showFullScreenAd}>
          <Text style={styles.buttonText}>Show interstitial ad</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  p: {
    marginBottom: 10,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  fullad: {
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    marginTop: 5,
  },
  adButton: {
    borderColor: '#CDCDCD',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
  subtitle: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    backgroundColor: Colors.tintColor,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
  },
});
