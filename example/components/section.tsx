import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import AppText from './app-text';
import { IconName } from '../constants/mock';
import { _COLORS } from '../constants/theme';

interface ISection {
  title: string;
  icon?: IconName;
  trailing?: string;
  children: React.ReactNode;
}

export default function Section({ title, icon, trailing, children }: ISection) {
  return (
    <View>
      <View style={styles.header}>
        {icon ? <Ionicons name={icon} size={14} color={_COLORS.muted} /> : null}
        <AppText variant="label" style={styles.title}>
          {title}
        </AppText>
        {trailing ? <AppText style={styles.trailing}>{trailing}</AppText> : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingBottom: 16,
  },
  title: {
    flex: 1,
  },
  trailing: {
    fontSize: 12,
    color: _COLORS.muted,
  },
});
