/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView
} from 'react-native';

import TableRow from 'react-native-swiping-row';

export default class example extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const rows = [];
    for (let i = 0; i < 500; i++) {
      rows.push(`Row ${i}`);
    }

    this.state = {
      dataSource: ds.cloneWithRows(rows),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          let leftButtons = [{
            defaultAction: false,
            fadeIn: true,
            text: 'Left 1',
            textStyle: { color: 'white' },
            style: { backgroundColor: 'blue' },
            onPress: () => { console.log('Left Button 1 Pressed') },
            onLongPress: () => { console.log('Left Button 1 Long Press') }
          }, {
            defaultAction: true,
            fadeIn: true,
            text: 'Left 2',
            textStyle: { color: 'white' },
            style: { backgroundColor: 'green' },
            onPress: () => { console.log('Left Button 2 Pressed') },
            onLongPress: () => { console.log('Left Button 2 Long Press') }
          }];

          let rightButtons = [{
            defaultAction: false,
            fadeIn: true,
            text: 'Right 1',
            textStyle: { color: 'white' },
            style: { backgroundColor: 'red' },
            onPress: () => { console.log('Right Button 1 Pressed') },
            onLongPress: () => { console.log('Right Button 1 Long Press') }
          }, {
            defaultAction: false,
            fadeIn: true,
            text: 'Right 2',
            textStyle: { color: 'white' },
            style: { backgroundColor: 'purple' },
            onPress: () => { console.log('Right Button 2 Pressed') },
            onLongPress: () => { console.log('Right Button 2 Long Press') }
          }];

          return (
            <TableRow
              leftButtons={leftButtons}
              rightButtons={rightButtons}
              leftFullSwipeAction={() => console.log('Full swipe left on row ' + rowData)}
              rightFullSwipeAction={() => console.log('Full swipe right on row ' + rowData)}
            >
              <View>
                <Text>This is text 1</Text>
                <Text>This is text 2</Text>
              </View>
            </TableRow>
          );
        }}
      />
    );
  }
}

AppRegistry.registerComponent('example', () => example);
