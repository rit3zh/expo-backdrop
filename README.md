https://github.com/user-attachments/assets/b8a424d1-ae20-49ae-add5-1e9f758d2922

# expo-backdrop

Native blur views for React Native + Expo.

## Features

- Two components: `BlurView` blurs what's _behind_ it, `GaussianBlurView` blurs its _own children_
- All 21 iOS system materials (`systemThinMaterial`, `systemChromeMaterialDark`, …)
- Custom `tintColor` when no system material fits your design
- Per-corner radii that clip the blur _and_ its children
- Android-specific dials for radius, downsampling, and pass count — so you can match iOS
- Animatable props, works with Reanimated's `createAnimatedComponent`

## Installation

```bash
bun install expo-backdrop
```

This module includes native iOS and Android code, so you need to prebuild and run on a device or simulator — Expo Go is not supported.

```bash
bunx expo prebuild
bunx expo run:ios
bunx expo run:android
```

> If you've already prebuilt your project, just re-run `expo run:ios` / `expo run:android` after installing.

## Usage

```tsx
import { BlurView, GaussianBlurView } from 'expo-backdrop';
```

## Quick Start

```tsx
import { BlurView } from 'expo-backdrop';
import { Image, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Image source={require('./cover.png')} style={{ ...StyleSheet.absoluteFillObject }} />

      <BlurView
        intensity={80}
        tint="systemThinMaterialDark"
        cornerRadius={24}
        style={{ margin: 20, padding: 20 }}>
        <Text style={{ color: '#fff' }}>Hello from behind the glass</Text>
      </BlurView>
    </View>
  );
}
```

## API

### `<BlurView>`

Blurs whatever is rendered behind it. Use it for headers, tab bars, floating action bars — anywhere you'd reach for a system material.

| Prop           | Type          | Default     | Description                                       |
| -------------- | ------------- | ----------- | ------------------------------------------------- |
| `intensity`    | `number`      | `50`        | Blur strength, `0`–`100`                          |
| `tint`         | `BlurTint`    | `"default"` | System material washed over the blur              |
| `tintColor`    | `ColorValue`  | —           | Custom colour; replaces `tint` when set           |
| `blurEnabled`  | `boolean`     | `true`      | Set to `false` to render only the tint            |
| `cornerRadius` | `number`      | —           | Uniform radius; clips the blur and its children   |
| `cornerRadii`  | `CornerRadii` | —           | Per-corner radii; takes precedence over the above |
| `style`        | `ViewStyle`   | —           | Style applied to the view                         |

#### Android-only props

iOS has no equivalent for these — `UIVisualEffectView` fixes the blur radius per material, and the compositor keeps the backdrop live for free.

| Prop                  | Type      | Default | Description                                                                  |
| --------------------- | --------- | ------- | ---------------------------------------------------------------------------- |
| `blurReductionFactor` | `number`  | `4`     | Divides the radius `intensity` maps to — the dial for matching iOS           |
| `blurRadius`          | `number`  | —       | Explicit radius in dp, overriding `intensity`                                |
| `downsampleFactor`    | `number`  | `0`     | Downsampling before blurring; higher is cheaper and softer, `0` auto-derives |
| `blurRounds`          | `number`  | `2`     | Blur passes per capture; more passes soften further                          |
| `autoUpdate`          | `boolean` | `true`  | Set to `false` to freeze the backdrop over static content                    |

### `<GaussianBlurView>`

Blurs its own children, mirroring SwiftUI's `.blur(radius:opaque:)`.

| Prop         | Type        | Default | Description                                                                       |
| ------------ | ----------- | ------- | --------------------------------------------------------------------------------- |
| `blurRadius` | `number`    | `0`     | Blur strength — points on iOS, dp on Android                                      |
| `opaque`     | `boolean`   | `false` | `false` lets edges fade out (the signature `.blur` look); `true` keeps them solid |
| `style`      | `ViewStyle` | —       | Style applied to the view                                                         |

```tsx
import { GaussianBlurView } from 'expo-backdrop';

<GaussianBlurView blurRadius={12}>
  <Image source={require('./cover.png')} style={{ width: 300, height: 200 }} />
</GaussianBlurView>;
```

## Tints

`BlurTint` accepts any of the following:

| Group      | Values                                                                                                           |
| ---------- | ---------------------------------------------------------------------------------------------------------------- |
| Legacy     | `default`, `extraLight`, `light`, `dark`, `regular`, `prominent`                                                 |
| Materials  | `systemUltraThinMaterial`, `systemThinMaterial`, `systemMaterial`, `systemThickMaterial`, `systemChromeMaterial` |
| Light/Dark | Each material above with a `Light` or `Dark` suffix — e.g. `systemThinMaterialDark`                              |

## Corner Radii

Pass `cornerRadius` for a uniform radius, or `cornerRadii` to shape individual corners. Both clip the blur layer _and_ the children, so you don't need a separate `overflow: 'hidden'` wrapper.

```tsx
<BlurView
  intensity={70}
  cornerRadii={{ topLeft: 24, topRight: 24, bottomLeft: 0, bottomRight: 0 }}
/>
```

## Full Example

A floating action bar that fades its blur in as the user scrolls:

```tsx
import { BlurView } from 'expo-backdrop';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function Screen() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 300], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <>
      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        {/* … */}
      </Animated.ScrollView>

      <AnimatedBlurView
        intensity={90}
        tint="systemChromeMaterialDark"
        cornerRadius={28}
        style={[{ position: 'absolute', bottom: 40, left: 20, right: 20, height: 80 }, style]}
      />
    </>
  );
}
```

## Types

```ts
import type {
  BlurViewProps,
  GaussianBlurViewProps,
  BlurViewCornerRadii,
  BlurTint,
} from 'expo-backdrop';
```

## Requirements

- Expo SDK with a [development build](https://docs.expo.dev/develop/development-builds/introduction/) or bare workflow (Expo Go is **not** supported)
- iOS 13+ — `BlurView` and `GaussianBlurView`
- Android — `BlurView` on all supported versions, `GaussianBlurView` requires API 31 (Android 12)+
- Web is not supported; both components throw if rendered there

## License

MIT © 2026 [Ritesh](https://github.com/rit3zh)
