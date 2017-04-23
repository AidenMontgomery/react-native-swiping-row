/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  Text,
  View
} from 'react-native';

import TableRow from 'react-native-swiping-row';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class example extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const rows = [];
    
    rows.push({
      icon: 'female',
      title: 'This is the title 1',
      subTitle: 'This is a subtitle 1'
    });
    
    rows.push({
      icon: 'space-shuttle',
      title: 'This is the title 2',
      subTitle: 'This is a subtitle 2'
    });
    
    rows.push({
      icon: 'handshake-o',
      title: 'This is the title 3',
      subTitle: 'This is a subtitle 3'
    });
    
    rows.push({
      icon: 'envelope',
      title: 'This is the title 4',
      subTitle: 'This is a subtitle 4'
    });
    
    rows.push({
      icon: 'heart',
      title: 'This is the title 5',
      subTitle: 'This is a subtitle 5'
    });

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
            icon: <Icon name="thumbs-o-up" size={24} color={'white'} />,
            textStyle: { color: 'white' },
            style: { backgroundColor: 'blue' },
            onPress: () => { console.log('Left Button 1 Pressed') },
            onLongPress: () => { console.log('Left Button 1 Long Press') }
          }, {
            defaultAction: true,
            fadeIn: true,
            renderOrder: 'icon',
            text: 'Left 2',
            icon: <Icon name="flag" size={24} color={'white'} />,
            textStyle: { color: 'white' },
            style: { backgroundColor: 'green' },
            onPress: () => { console.log('Left Button 2 Pressed') },
            onLongPress: () => { console.log('Left Button 2 Long Press') }
          }];

          let rightButtons = [{
            defaultAction: true,
            fadeIn: true,
            renderOrder: 'text',
            icon: <Icon style={{ color: 'white', fontSize: 24 }} key='row-check' name={'trash'} />,
            text: 'Right 1',
            textStyle: { color: 'white' },
            style: { backgroundColor: 'red' },
            onPress: () => { console.log('Right Button 1 Pressed') },
            onLongPress: () => { console.log('Right Button 1 Long Press') }
          }, {
            defaultAction: false,
            fadeIn: true,
            text: 'Right 2',
            renderOrder: 'icon',
            icon: <Icon style={{ color: 'white', fontSize: 24 }} name={'check'} />,
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
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                <Icon name={rowData.icon} style={{ color: 'white', width: 50 }} size={28} />
                <View style={{ flexDirection: 'column', paddingHorizontal: 20, marginTop: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{rowData.title}</Text>
                  <Text>{rowData.subTitle}</Text>
                </View>
              </View>
            </TableRow>
          );
        }}
      />
    );
  }
}

AppRegistry.registerComponent('example', () => example);
