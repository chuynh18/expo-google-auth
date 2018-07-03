import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Contacts, Permissions } from 'expo';
import Button from '../components/Button';
import Colors from '../constants/Colors';
import HeadingText from '../components/HeadingText';
import MonoText from '../components/MonoText';

const CONTACT_PAGE_SIZE = 4;

class ContactRow extends React.Component {
  render() {
    const { contact } = this.props;
    return (
      <View style={styles.contactRow}>
        <HeadingText>{contact.name}</HeadingText>
        <MonoText>{JSON.stringify(contact, null, 2)}</MonoText>
      </View>
    );
  }
}

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacts',
  };

  state = {
    contacts: null,
    page: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this._findContacts();
    }
  }

  _findContacts = async page => {
    let permission = await Permissions.askAsync(Permissions.CONTACTS);
    if (permission.status !== 'granted') {
      setTimeout(() => Alert.alert('Contacts permission was not granted.'), 100);
      return;
    }
    let result = await Contacts.getContactsAsync({
      fields: [Contacts.EMAILS, Contacts.PHONE_NUMBERS, Contacts.ADDRESSES],
      pageSize: CONTACT_PAGE_SIZE,
      pageOffset: this.state.page * CONTACT_PAGE_SIZE,
    });

    let contacts = result.data.map(contact => {
      return {
        id: contact.id,
        firstName: contact.firstName,
        name: contact.name,
        emails: contact.emails,
        phoneNumbers: contact.phoneNumbers,
        addresses: contact.addresses,
      };
    });

    this.setState({
      contacts,
      hasPreviousPage: result.hasPreviousPage,
      hasNextPage: result.hasNextPage,
    });
  };

  _nextPage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  _previousPage = () => {
    this.setState(state => ({ page: state.page - 1 }));
  };

  render() {
    if (this.state.contacts) {
      return (
        <ScrollView style={styles.container}>
          {this.state.hasNextPage ? (
            <Button onPress={this._nextPage} style={styles.button} title="Next Page" />
          ) : null}
          {this.state.hasPreviousPage ? (
            <Button onPress={this._previousPage} style={styles.button} title="Previous Page" />
          ) : null}
          {this.state.contacts.map(contact => <ContactRow contact={contact} key={contact.id} />)}
        </ScrollView>
      );
    }

    return (
      <View style={styles.container}>
        <Button onPress={this._findContacts} style={styles.button} title="Find my Contacts" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    flex: 1,
    backgroundColor: Colors.greyBackground,
  },
  contactRow: {
    marginBottom: 12,
  },
});
