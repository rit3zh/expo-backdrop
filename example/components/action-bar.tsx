import { View, StyleSheet, Pressable, Linking } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import AppText from './app-text';
import { _COLORS, _RADIUS } from '../constants/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface Action {
  key: string;
  label: string;
  icon: IconName;
  onPress?: () => void;
}

interface IActionBar {
  phone?: string;
  website?: string;
  onSave?: () => void;
}

export default function ActionBar({ phone, website, onSave }: IActionBar) {
  const actions: Action[] = [
    {
      key: 'call',
      label: 'Call',
      icon: 'call-outline',
      onPress: phone ? () => Linking.openURL(`tel:${phone}`) : undefined,
    },
    {
      key: 'website',
      label: 'Website',
      icon: 'link-outline',
      onPress: website ? () => Linking.openURL(website) : undefined,
    },
    { key: 'save', label: 'Save', icon: 'bookmark-outline', onPress: onSave },
  ];

  return (
    <View style={styles.bar}>
      {actions.map((action) => (
        <Pressable
          key={action.key}
          onPress={action.onPress}
          style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
          <Ionicons name={action.icon} size={20} color={_COLORS.onOverlay} />
          <AppText style={styles.label}>{action.label}</AppText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: _RADIUS.pill,
    backgroundColor: _COLORS.overlay,
  },
  item: {
    width: 86,
    paddingVertical: 10,
    borderRadius: _RADIUS.pill,
    alignItems: 'center',
    gap: 5,
  },
  itemPressed: {
    backgroundColor: _COLORS.overlayItem,
  },
  label: {
    fontSize: 12,
    color: _COLORS.onOverlay,
  },
});
