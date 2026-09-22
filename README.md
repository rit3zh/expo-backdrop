https://github.com/user-attachments/assets/b8a424d1-ae20-49ae-add5-1e9f758d2922

# expo-backdrop

Native blur views for Expo, built on public iOS and Android APIs only.

## Installation

```bash
bunx expo install expo-backdrop
bunx expo prebuild
```

Needs a [development build](https://docs.expo.dev/develop/development-builds/introduction/). Expo Go is not supported.

## Components

| Component             | Blurs                                                  |
| --------------------- | ------------------------------------------------------ |
| `BlurView`            | What's behind it                                       |
| `GaussianBlurView`    | Its own children                                       |
| `ProgressiveBlurView` | What's behind it, fading from one edge to the opposite |

All components accept `style` and `children`.

## `BlurView`

```tsx
import { BlurView } from 'expo-backdrop';

<BlurView intensity={80} tint="systemThinMaterialDark" cornerRadius={24} />;
```

| Prop           | Type                  | Default     | Description                                                                |
| -------------- | --------------------- | ----------- | -------------------------------------------------------------------------- |
| `intensity`    | `number`              | `50`        | Blur strength, `0`–`100`                                                   |
| `tint`         | `BlurTint`            | `'default'` | Material applied over the blur                                             |
| `tintColor`    | `ColorValue`          | —           | Custom colour over the blur; replaces `tint` when set                      |
| `blurEnabled`  | `boolean`             | `true`      | `false` renders only the tint                                              |
| `cornerRadius` | `number`              | —           | Uniform radius; clips the blur and its children                            |
| `cornerRadii`  | `BlurViewCornerRadii` | —           | `{ topLeft, topRight, bottomRight, bottomLeft }`; overrides `cornerRadius` |

**Android only**

| Prop                  | Type      | Default | Description                                                             |
| --------------------- | --------- | ------- | ----------------------------------------------------------------------- |
| `blurReductionFactor` | `number`  | `4`     | Divides the radius `intensity` maps to; use it to match iOS             |
| `blurRadius`          | `number`  | —       | Explicit radius in dp; overrides `intensity`                            |
| `downsampleFactor`    | `number`  | `0`     | Downsampling before blurring; higher is cheaper and softer, `0` is auto |
| `blurRounds`          | `number`  | `2`     | Blur passes per capture; more is softer                                 |
| `autoUpdate`          | `boolean` | `true`  | `false` freezes the backdrop over static content                        |

## `GaussianBlurView`

```tsx
import { GaussianBlurView } from 'expo-backdrop';

<GaussianBlurView blurRadius={12}>
  <Image source={cover} style={{ width: 300, height: 200 }} />
</GaussianBlurView>;
```

| Prop         | Type      | Default | Description                                          |
| ------------ | --------- | ------- | ---------------------------------------------------- |
| `blurRadius` | `number`  | `0`     | Blur strength, in points on iOS and dp on Android    |
| `opaque`     | `boolean` | `false` | `false` fades the edges out; `true` keeps them solid |

Matches SwiftUI's `.blur(radius:opaque:)`. Requires Android 12 (API 31)+.

## `ProgressiveBlurView`

```tsx
import { ProgressiveBlurView } from 'expo-backdrop';

<ProgressiveBlurView
  edge="top"
  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, pointerEvents: 'none' }}
/>;
```

| Prop             | Type                  | Default                     | Description                                                             |
| ---------------- | --------------------- | --------------------------- | ----------------------------------------------------------------------- |
| `edge`           | `ProgressiveBlurEdge` | `'top'`                     | `'top'`, `'bottom'`, `'left'` or `'right'`; where the blur is strongest |
| `intensity`      | `number`              | `50`                        | Strength at the blurred edge, `0`–`100`                                 |
| `startOffset`    | `number`              | `0`                         | Fraction `0`–`1` from `edge` held at full strength before fading        |
| `tint`           | `BlurTint`            | `'systemUltraThinMaterial'` | Material the blur uses                                                  |
| `tintColor`      | `ColorValue`          | page background at 85%      | Wash rising to the blurred edge; `'transparent'` turns it off           |
| `scrollFallback` | `boolean`             | `true`                      | Swaps to a gradient while the scroll view behind moves fast             |
| `fallbackColor`  | `ColorValue`          | page background             | Colour of that gradient                                                 |

It finds the scroll view behind it automatically and fades in once content scrolls under its edge, like iOS 26's scroll edge effect. Set `pointerEvents: 'none'` so touches reach the content underneath.

## `BlurTint`

- `default`, `extraLight`, `light`, `dark`, `regular`, `prominent`
- `systemUltraThinMaterial`, `systemThinMaterial`, `systemMaterial`, `systemThickMaterial`, `systemChromeMaterial`
- Each material with a `Light` or `Dark` suffix, e.g. `systemThinMaterialDark`

## Types

```ts
import type {
  BlurViewProps,
  BlurViewCornerRadii,
  GaussianBlurViewProps,
  ProgressiveBlurViewProps,
  ProgressiveBlurEdge,
  BlurTint,
} from 'expo-backdrop';
```

## Platforms

- **iOS** 13+
- **Android**: all components; `GaussianBlurView` needs API 31+
- **Web**: not supported; components throw

## License

MIT © 2026 [Ritesh](https://github.com/rit3zh)
