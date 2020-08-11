import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { stylesResponsive } from '../../theme'


export function Col(props: any) {

  //state data 
  const [state, setState] = useState({
    styles: stylesResponsive
  })
  // grab the props

  const { children, xs, sm, md, lg, colStyles } = props;
  const { styles } = state;
  const columns_xs = 'col_' + xs;
  const columns_sm = 'col_sm_' + sm;
  const columns_md = 'col_md_' + md;
  const columns_lg = 'col_lg_' + lg;

  return (
    <View style={[styles[columns_xs], styles[columns_sm], styles[columns_md], styles[columns_lg], colStyles]}>
      {children}
    </View>
  )
}






