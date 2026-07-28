Pod::Spec.new do |s|
  s.name           = 'BlurView'
  s.version        = '1.0.0'
  s.summary        = 'Real-time backdrop and content blur views for React Native'
  s.description    = 'Native blur views: a backdrop blur built on UIVisualEffectView, and a content blur built on SwiftUI\'s .blur modifier.'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '16.4',
    :tvos => '16.4'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
