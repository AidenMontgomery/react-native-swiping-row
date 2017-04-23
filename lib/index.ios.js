import React, { Component, PropTypes } from 'react';

import {
  Animated,
	Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
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
      width: PropTypes.number,
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
    let buttonWidths = 0;
    const height = 75;
    let leftButtonControls = [];
    let defaultSet = false;
    let hasDefault = false;
    
    for (var i = 0; i < buttons.length; i++) {
      let {
        defaultAction,
        width
      } = buttons[i];

      if (width) {
        buttonWidths += width;
      } else {
        buttonWidths += (maxWidth / 2) / buttons.length;
      }

      hasDefault = hasDefault || defaultAction;
    }

    for (var i = 0; i < buttons.length; i++) {
      let {
        defaultAction,
        fadeIn,
        icon,
        onPress,
        onLongPress,
        style,
        text,
        textStyle,
        width,
        renderOrder
      } = buttons[i];

      let buttonWidth = 0;

      if (width) {
        buttonWidth = width;
      } else {
        buttonWidth = buttonWidths / buttons.length;
      }

      if (defaultAction) {
        if (defaultSet) {
          throw new Error('Only 1 default action allowed');
        }

        defaultSet = true;
      }

      let buttonStyles = [style];

      if (hasDefault) {
        if (defaultAction) {
          buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-buttonWidths, 0, buttonWidths, buttonWidths + buttonWidth, buttonWidths + (2 * buttonWidth)],
              outputRange: [0, 0, buttonWidth, buttonWidths + buttonWidth, buttonWidths + (2 * buttonWidth)]
            })
          });
        } else {
          buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-buttonWidths, 0, buttonWidths, buttonWidths + buttonWidth, maxWidth],
              outputRange: [0, 0, buttonWidth, 0, 0]
            }) 
          });
        }
      } else {
        buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-buttonWidths, 0, buttonWidths],
              outputRange: [0, 0, buttonWidth]
            }) 
          }
        );
      }

      let contentStyles = [{
        justifyContent: 'center',
        alignItems: 'center',
        width: buttonWidth,
        height
      }];

      if (fadeIn) {
        contentStyles.push(
          {
            opacity: this._deltaX.interpolate({
              inputRange: [buttonWidth * i, buttonWidth * (i + 1), buttonWidth * (i + 1)],
              outputRange: [0, 1, 1]
            })
          }
        );
      }

      let contents = [];
      if (text) {
        contents.push(<Text key={`left-text-${i}`} style={textStyle}>{text}</Text>);
      }

      if (icon) {
        icon.key = `left-icon-${i}`;
        contents.push(icon);
      }

      if (renderOrder && contents.length > 1) {
        if (renderOrder === 'icon') {
          contents.unshift(contents.pop());
        }
      }

      let buttonControl = (
        <TouchableHighlight key={`left-${i}`} onPress={onPress} onLongPress={onLongPress}>
          <Animated.View style={buttonStyles}>
            <Animated.View style={contentStyles}>
              { contents }
            </Animated.View>
          </Animated.View>
        </TouchableHighlight>
      );

      leftButtonControls.push(buttonControl);
    }

    return leftButtonControls;
  }

  _renderRightButtons = (buttons, maxWidth) => {
    let buttonWidths = 0;
    const height = 75;
    let rightButtonControls = [];
    let defaultSet = false;
    let hasDefault = false;
    
    for (var i = 0; i < buttons.length; i++) {
      let {
        defaultAction,
        width
      } = buttons[i];

      if (width) {
        buttonWidths += width;
      } else {
        buttonWidths += (maxWidth / 2) / buttons.length;
      }

      hasDefault = hasDefault || defaultAction;
    }

    for (var i = buttons.length - 1; i >= 0; i--) {
      let {
        defaultAction,
        fadeIn,
        icon,
        onPress,
        onLongPress,
        style,
        text,
        textStyle,
        width,
        renderOrder
      } = buttons[i];

      let buttonWidth = 0;

      if (width) {
        buttonWidth = width;
      } else {
        buttonWidth = buttonWidths / buttons.length;
      }

      if (defaultAction) {
        if (defaultSet) {
          throw new Error('Only 1 default action allowed');
        }

        defaultSet = true;
      }

      let buttonStyles = [style];
      if (hasDefault) {
        if (defaultAction) {
          buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-buttonWidths - (2 * buttonWidth), -buttonWidths - buttonWidth, -buttonWidths, 0, 1],
              outputRange: [buttonWidths + (2 * buttonWidth),  buttonWidths + buttonWidth,   buttonWidth, 0, 0]
            }) 
          });
        } else {
          buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange:  [-maxWidth, -buttonWidths - (2 * buttonWidth), -buttonWidths - buttonWidth,    -buttonWidths, 0, 1],
              outputRange: [        0,                                 0,                           0,      buttonWidth, 0, 0]
            }) 
          });
        }
      } else {
        buttonStyles.push({
            flex: 0,
            height,
            width:  this._deltaX.interpolate({
              inputRange: [-buttonWidths, 0, 1],
              outputRange: [ buttonWidth, 0, 0]
            }) 
          }
        );
      }

      let contentStyles = [{
        justifyContent: 'center',
        alignItems: 'center',
        width: buttonWidth,
        height,
			}]
      if (fadeIn) {
        contentStyles.push(
          {
            opacity: this._deltaX.interpolate({
              inputRange: [-(buttonWidth * (i + 1)), -(buttonWidth * (i + 1)), -(buttonWidth * i)],
              outputRange: [1, 1, 0]
            })
          }
        );
      }

      let contents = [];

      if (text) {
        contents.push(<Text key={`right-text-${i}`} style={textStyle}>{text}</Text>);
      }

      if (icon) {
        icon.key = `right-icon-${i}`;
        contents.push(icon);
      }

      if (renderOrder && contents.length > 1) {
        if (renderOrder === 'icon') {
          contents.unshift(contents.pop());
        }
      }

      let buttonControl = (
        <TouchableHighlight key={`right-${i}`} onPress={onPress} onLongPress={onLongPress}>
          <Animated.View style={buttonStyles}>
						<Animated.View style={contentStyles}>
							{contents}
						</Animated.View>
					</Animated.View>
        </TouchableHighlight>
      );

      rightButtonControls.push(buttonControl);
    }

    return rightButtonControls;
  }

  render(props) {
		let { height, width } = Dimensions.get('window');
    let { children, leftButtons, rightButtons, leftFullSwipeAction, rightFullSwipeAction, style } = this.props;

    let rightButtonsWidth = rightButtons.reduce((totalWidth, button) => {
      let { width: buttonWidth } = button;
      if (buttonWidth) {
        totalWidth += buttonWidth;
      } else {
        totalWidth += (width / 2) / rightButtons.length;
      }

      return totalWidth;
    }, 0);

    let leftButtonsWidth = leftButtons.reduce((totalWidth, button) => {
      let { width: buttonWidth } = button;
      if (buttonWidth) {
        totalWidth += buttonWidth;
      } else {
        totalWidth += (width / 2) / leftButtons.length;
      }

      return totalWidth;
    }, 0);

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
          <View style={{position: 'absolute', left: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>
            { this._renderLeftButtons(leftButtons, width, leftButtonsWidth) }
          </View>
          <View style={{position: 'absolute', right: 0, height: 75, flexDirection: 'row', alignItems: 'center'}}>
            { this._renderRightButtons(rightButtons, width, rightButtonsWidth)}
          </View>

          <Interactable.View
            horizontalOnly={true}
            snapPoints={[
              {x: 0, id: 'closed'},
              {x: -rightButtonsWidth, id: 'open'},
              {x: leftButtonsWidth, id: 'openLeft'},
              {x: -width, id: FULL_OPEN_LEFT},
              {x: width, id: FULL_OPEN_RIGHT}
            ]}
            onSnap={this.onDrawerSnap}
            dragToss={0.01}
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
  }
});