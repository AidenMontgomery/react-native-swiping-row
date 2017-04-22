import React, { Component, PropTypes } from 'react';

import {
  Animated,
	Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} from 'react-native';

import Interactable from 'react-native-interactable';

const FULL_OPEN_RIGHT = 'FULL_OPEN_RIGHT';
const FULL_OPEN_LEFT = 'FULL_OPEN_LEFT';

export default class TableRow extends Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
  }

  static propTypes = {
    leftButtons: PropTypes.arrayOf(PropTypes.shape({
      defaultAction: PropTypes.bool,
      fadeIn: PropTypes.bool,
      text: PropTypes.text,
      textStyle: PropTypes.object,
      style: PropTypes.object,
      onPress: PropTypes.func,
      onLongPress: PropTypes.func
    })),

    rightButtons: PropTypes.arrayOf(PropTypes.shape({
      defaultAction: PropTypes.bool,
      fadeIn: PropTypes.bool,
      text: PropTypes.text,
      textStyle: PropTypes.object,
      style: PropTypes.object,
      onPress: PropTypes.func,
      onLongPress: PropTypes.func
    })),

    leftFullSwipeAction: PropTypes.func,
    rightFullSwipeAction: PropTypes.func
  };

  static defaultProps = {
    leftButtons: [],
    rightButtons: [],
  };

  onDrawerSnap = (event) => {
    const snapPointId = event.nativeEvent.id;

    if (snapPointId === FULL_OPEN_RIGHT) {
      if (this.props.rightFullSwipeAction) {
        this.props.rightFullSwipeAction();
      }
    } if (snapPointId === FULL_OPEN_LEFT) {
      if (this.props.leftFullSwipeAction) {
        this.props.leftFullSwipeAction();
      }
    }
  }

  _renderLeftButtons = (buttons, maxWidth) => {

    const height = 75;
    const halfRow = maxWidth / 2;
    const buttonWidth = halfRow / buttons.length;
    let leftButtonControls = [];
    let defaultSet = false;
    let hasDefault = false;
    
    for (var i = 0; i < buttons.length; i++) {
      let {
        defaultAction
      } = buttons[i];

      hasDefault = hasDefault || defaultAction;
    }

    for (var i = 0; i < buttons.length; i++) {
      let {
        fadeIn,
        onPress,
        onLongPress,
        style,
        text,
        textStyle,
        defaultAction,
      } = buttons[i];

      if (defaultAction) {
        if (defaultSet) {
          throw new Error('Only 1 default action allowed');
        }

        defaultSet = true;
      }

      let buttonStyles = [style];

      if (fadeIn) {
        buttonStyles.push(
          {
            opacity: this._deltaX.interpolate({
              inputRange: [buttonWidth * i, buttonWidth * (i + 1), buttonWidth * (i + 1)],
              outputRange: [0, 1, 1]
            })
          }
        );
      }

      if (hasDefault) {
        if (defaultAction) {
          buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-halfRow, 0, halfRow, halfRow + buttonWidth, halfRow + (2 * buttonWidth)],
              outputRange: [0, 0, buttonWidth, halfRow + buttonWidth, halfRow + (2 * buttonWidth)]
            })
          });
        } else {
          buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-halfRow, 0, halfRow, halfRow + buttonWidth, maxWidth],
              outputRange: [0, 0, buttonWidth, 0, 0]
            }) 
          });
        }
      } else {
        buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-halfRow, 0, halfRow],
              outputRange: [0, 0, buttonWidth]
            }) 
          }
        );
      }

      let buttonControl = Platform.OS === 'ios' ? (
        <TouchableHighlight onPress={onPress} onLongPress={onLongPress}>
          <View style={[{ height }, styles.buttonContainer]}>
            <Text style={textStyle}>{text}</Text>
          </View>
        </TouchableHighlight>
      ) : (
        <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress} backgroundColor={TouchableNativeFeedback.SelectableBackground()}>
          <View style={[{ height }, styles.buttonContainer]}>
            <Text style={textStyle}>{text}</Text>
          </View>
        </TouchableNativeFeedback>
      );

      leftButtonControls.push(
        <Animated.View key={`left-${i}`} style={buttonStyles}>
          { buttonControl }
        </Animated.View>
      );
    }

    return leftButtonControls;
  }

  _renderRightButtons = (buttons, maxWidth) => {

    const height = 75;
    const halfRow = maxWidth / 2;
    const buttonWidth = halfRow / buttons.length;
    let rightButtonControls = [];
    let defaultSet = false;
    let hasDefault = false;
    
    for (var i = 0; i < buttons.length; i++) {
      let {
        defaultAction
      } = buttons[i];

      hasDefault = hasDefault || defaultAction;
    }

    for (var i = buttons.length - 1; i >= 0; i--) {
      let {
        fadeIn,
        onPress,
        onLongPress,
        style,
        text,
        textStyle,
        defaultAction,
      } = buttons[i];

      if (defaultAction) {
        if (defaultSet) {
          throw new Error('Only 1 default action allowed');
        }

        defaultSet = true;
      }

      let buttonStyles = [style];

      if (fadeIn) {
        buttonStyles.push(
          {
            opacity: this._deltaX.interpolate({
              inputRange: [-(buttonWidth * (i + 1)), -(buttonWidth * (i + 1)), -(buttonWidth * i)],
              outputRange: [1, 1, 0]
            })
          }
        );
      }

      if (hasDefault) {
        if (defaultAction) {
          buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-maxWidth, -halfRow - (2 * buttonWidth), -halfRow - buttonWidth, -halfRow, 0],
              outputRange: [maxWidth, halfRow + (2 * buttonWidth), halfRow + buttonWidth, buttonWidth, 0]
            }) 
          });
        } else {
          buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-maxWidth, -halfRow - (2 * buttonWidth), -halfRow - buttonWidth, -halfRow, 0],
              outputRange: [0, 0, 0, buttonWidth, 0]
            }) 
          });
        }
      } else {
        buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-halfRow, 0],
              outputRange: [buttonWidth, 0]
            }) 
          }
        );
      }

      let buttonControl = Platform.OS === 'ios' ? (
        <TouchableHighlight onPress={onPress} onLongPress={onLongPress}>
          <View style={[{ height }, styles.buttonContainer]}>
            <Text style={textStyle}>{text}</Text>
          </View>
        </TouchableHighlight>
      ) : (
        <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress} backgroundColor={TouchableNativeFeedback.SelectableBackground()}>
          <View style={[{ height }, styles.buttonContainer]}>
            <Text style={textStyle}>{text}</Text>
          </View>
        </TouchableNativeFeedback>
      );

      rightButtonControls.push(
        <Animated.View key={`right-${i}`} style={buttonStyles}>
          {buttonControl}
        </Animated.View>
      );
    }

    return rightButtonControls;
  }

  render(props) {
		let {height, width} = Dimensions.get('window');
    let { children, leftButtons, rightButtons, leftFullSwipeAction, rightFullSwipeAction, style } = this.props;

    let rowStyle = {
      backgroundColor: 'white'
    };

    rowStyle = {
      ...rowStyle,
      ...style
    };

    return (
      <View style={styles.container}>
        <View style={rowStyle}>
          <View style={{position: 'absolute', right: 0, left: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>
            { this._renderLeftButtons(leftButtons, width) }
						<View style={styles.spacer} />
            { this._renderRightButtons(rightButtons, width)}
          </View>

          <Interactable.View
            horizontalOnly={true}
            snapPoints={[{x: 0, id: 'closed'}, {x: -(width / 2), id: 'open'}, {x: (width / 2), id: 'openLeft'}, {x: -width, id: FULL_OPEN_LEFT}, {x: width, id: FULL_OPEN_RIGHT}]}
            onSnap={this.onDrawerSnap}
            animatedValueX={this._deltaX}>
            <View style={{left: 0, right: 0, height: 75, backgroundColor: '#e0e0e0' }}>
							{children}
						</View>
          </Interactable.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
		borderBottomWidth: StyleSheet.hairlineWidth
  },
	buttonContainer: {
		flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
	spacer: {
		flex: 1
	}
});