import { View, StyleSheet } from 'react-native';
import React, { Fragment } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AppText from './app-text';
import { IconName } from '../constants/mock';
import { _COLORS } from '../constants/theme';

interface MetaItem {
  icon: IconName;
  label: string;
  accent?: boolean;
}

interface IMetaLine {
  items: MetaItem[];
}

export default function MetaLine({ items }: IMetaLine) {
  return (
    <View style={styles.row}>
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 ? <View style={styles.separator} /> : null}
          <View style={styles.item}>
            <Ionicons
              name={item.icon}
              size={13}
              color={item.accent ? _COLORS.accent : _COLORS.muted}
            />
            <AppText variant="medium" style={styles.label}>
              {item.label}
            </AppText>
          </View>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  label: {
    fontSize: 13,
  },
  separator: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: _COLORS.hairline,
  },
});
