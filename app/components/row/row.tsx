import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { stylesResponsive as styles } from '../../theme'


export function Row(props: any) {

  //state data 

  // grab the props

  const { children, rowStyles } = props;
  return (
    <View style={[styles.row, rowStyles]}>
      {children}
    </View>
  )
}







