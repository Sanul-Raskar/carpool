import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { InputGroup } from "native-base";
var {
  GooglePlacesAutocomplete
} = require("react-native-google-places-autocomplete");

export default class AddPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoView: true,
      addLocationsView: false,
      showPlacesList: false,
      WorkLat: 0,
      WorkLng: 0,
      WorkDescription: "",
      HomeLat: 0,
      HomeLng: 0,
      HomeDescription: ""
    };
  }

  toggleView = () => {
    this.setState({
      infoView: !this.state.infoView,
      addLocationsView: !this.state.addLocationsView
    });
  };

  nextPreprocess = () => {
    // Save step state for use in other steps of the wizard
    this.props.saveState(1, {
      WorkLat: this.state.WorkLat,
      WorkLng: this.state.WorkLng,
      HomeLat: this.state.HomeLat,
      HomeLng: this.state.HomeLng,
    });

    // Go to next step
    this.props.nextFn();
  };
  render() {
    var { height, width } = Dimensions.get("window");
    const { navigate } = this.props.navigation;
    //badfe8
    return (
      <View style={styles.container}>
        {this.state.infoView && (
          <View style={{ flex: 1, backgroundColor: "#badfe8" }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.center}>
                <Image
                  resizeMode="contain"
                  source={require("../../assets/img/addPlaces.jpg")}
                  style={{ width: width, height: 300 }}
                />
                <Text style={{ textAlign: "center", padding: 10 }}>
                  Save your Home and Work so that we can quickly suggest you
                  while searching for your ride. {"\n\n"} You can skip this step
                  now and save your favourite places later in the profile.
                </Text>
              </View>

              <View style={styles.bottomButtons}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#1a73e8",
                      borderColor: "#1a73e8",
                      borderRadius: 10,
                      borderWidth: 2,
                      padding: 10,
                      marginTop: 20,
                      marginBottom: 10,
                      textAlign: "center"
                    }}
                    onPress={this.nextPreprocess}
                  >
                    Skip
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.NextButton}
                  /* onPress={() => navigate("AddHomeWork")}*/
                  onPress={this.toggleView}
                >
                  <Text style={styles.ButtonText}>Add Location</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
        {this.state.addLocationsView && (
          <View style={{ flex: 1, backgroundColor: "white", padding: 22 }}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold"
                }}
              >
                Add Home
              </Text>
              <View style={styles.inputWrapper}>
                <TouchableOpacity>
                  <InputGroup>
                    <GooglePlacesAutocomplete
                      listViewDisplayed={this.state.showPlacesList}
                      textInputProps={{
                        onFocus: () => this.setState({ showPlacesList: true }),
                        onBlur: () => this.setState({ showPlacesList: false })
                      }}
                      placeholder="Search for your Home"
                      minLength={2}
                      autoFocus={false}
                      returnKeyType={"default"}
                      fetchDetails={true}
                      onPress={(data, details = null) => {
                        this.setState({
                          HomeLat: details.geometry.location.lat
                        });
                        this.setState({
                          HomeLng: details.geometry.location.lng
                        });
                        console.log(this.state.HomeLat);
                        console.log(this.state.HomeLng);
                      }}
                      getDefaultValue={() => {
                        return "";
                      }}
                      query={{
                        key: "Your Google maps API Key Here",
                        language: "en",
                        types: "(cities)" // default: 'geocode'
                      }}
                      styles={{
                        description: {
                          fontWeight: "bold"
                        },
                        predefinedPlacesDescription: {
                          color: "#1faadb"
                        },
                        textInputContainer: {
                          fontSize: 14,
                          marginBottom: 8,
                          marginTop: 8,
                          backgroundColor: "white",
                          borderBottomWidth: 0,
                          borderTopWidth: 0
                        }
                      }}
                      currentLocation={true}
                      currentLocationLabel="Current location"
                      nearbyPlacesAPI="GooglePlacesSearch"
                      GoogleReverseGeocodingQuery={{}}
                      GooglePlacesSearchQuery={{
                        rankby: "distance",
                        types: "food"
                      }}
                      filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3"
                      ]}
                      predefinedPlacesAlwaysVisible={false}
                    />
                  </InputGroup>
                </TouchableOpacity>
              </View>
              <View style={{ height: 50 }} />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold"
                }}
              >
                {"\n"}Add Work
              </Text>
              <View style={styles.inputWrapper}>
                <TouchableOpacity>
                  <InputGroup>
                    <GooglePlacesAutocomplete
                      listViewDisplayed={this.state.showPlacesList}
                      textInputProps={{
                        onFocus: () => this.setState({ showPlacesList: true }),
                        onBlur: () => this.setState({ showPlacesList: false })
                      }}
                      placeholder="Search for your Work"
                      minLength={2}
                      autoFocus={false}
                      returnKeyType={"default"}
                      fetchDetails={true}
                      onPress={(data, details = null) => {
                        this.setState({
                          WorkLat: details.geometry.location.lat
                        });
                        this.setState({
                          WorkLng: details.geometry.location.lng
                        });
                        console.log(this.state.WorkLat);
                        console.log(this.state.WorkLng);
                      }}
                      getDefaultValue={() => {
                        return "";
                      }}
                      query={{
                        key: "Your Google maps API Key Here",
                        language: "en",
                        types: "(cities)" // default: 'geocode'
                      }}
                      styles={{
                        description: {
                          fontWeight: "bold"
                        },
                        predefinedPlacesDescription: {
                          color: "#1faadb"
                        },
                        textInputContainer: {
                          fontSize: 14,
                          marginBottom: 8,
                          marginTop: 8,
                          backgroundColor: "white",
                          borderBottomWidth: 0,
                          borderTopWidth: 0
                        }
                      }}
                      currentLocation={true}
                      currentLocationLabel="Current location"
                      nearbyPlacesAPI="GooglePlacesSearch"
                      GoogleReverseGeocodingQuery={{}}
                      GooglePlacesSearchQuery={{
                        rankby: "distance",
                        types: "food"
                      }}
                      filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3"
                      ]}
                      predefinedPlacesAlwaysVisible={false}
                    />
                  </InputGroup>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomButtons}>
                <TouchableOpacity onPress={() => navigate("AddPlaces")}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#1a73e8",
                      marginBottom: 50,
                      marginTop: 60,
                      borderColor: "#1a73e8",
                      borderRadius: 10,
                      borderWidth: 2,
                      padding: 10,
                      textAlign: "center"
                    }}
                    onPress={this.toggleView}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.SaveButton}
                  onPress={this.nextPreprocess}
                >
                  <Text style={styles.ButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  NextButton: {
    backgroundColor: "#1a73e8",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10
  },
  ButtonText: {
    fontSize: 18,
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 18,
    textAlign: "center"
  },
  bottomButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20
  },
  inputWrapper: {
    marginTop: 10,
    marginBottom: 2,
    backgroundColor: "#fff",
    borderRadius: 7,
    borderColor: "#dadce0",
    borderWidth: 2
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 20
  },
  SaveButton: {
    backgroundColor: "#1a73e8",
    marginBottom: 50,
    borderRadius: 10,
    marginTop: 60
  }
});
