## React-Native-Swiping-Row
Based on Wix [react-native-animatable](https://github.com/wix/react-native-interactable) drawer.

A component that can be used in react-native ListView.

Place buttons underneath your row.

Specify what actions should be performed when the row is swiped fully right or left.

![Running Example](https://raw.githubusercontent.com/AidenMontgomery/react-native-swiping-row/master/swiping.gif)

### Row Properties

|Property|Value|Description|
|--------|-----|-----------|
|leftButtons| Array | Array of buttons to display on the left side|
|rightButtons| Array | Array of buttons to display on the right side|
|leftFullSwipeAction| Function | Function to execute when the row is fully swiped left |
|rightFullSwipeAction| Function | Function to execute when the row is fully swiped right |

### Button Properties
|Property|Value|Description|
|--------|-----|-----------|
|defaultAction| Boolean | Button to be used as the default action when fully swiped |
|fadeIn| Boolean | Fade in the button as the row is swiped |
|icon|Component| Icon to be added to the button |
|width| Number | Width of the button |
|text| String | Text to be displayed on the button |
|textStyle| StyleSheet | Styles to be applied to the button text |
|style| StyleSheet | Styles to be applied to the button container |
|onPress| Function | Function to be executed when the button is tapped |
|onLongPress| Function | Function to be executed when the button is long pressed |