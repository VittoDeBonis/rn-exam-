/**
 * Automatically generated by expo-modules-autolinking.
 *
 * This autogenerated class provides a list of classes of native Expo modules,
 * but only these that are written in Swift and use the new API for creating Expo modules.
 */

import ExpoModulesCore
import Expo
import ExpoAsset
import EXConstants
import ExpoFileSystem
import ExpoFont
import ExpoKeepAwake
import ExpoSplashScreen
#if EXPO_CONFIGURATION_DEBUG
import EXDevLauncher
import EXDevMenu
#endif

@objc(ExpoModulesProvider)
public class ExpoModulesProvider: ModulesProvider {
  public override func getModuleClasses() -> [AnyModule.Type] {
    #if EXPO_CONFIGURATION_DEBUG
    return [
      ExpoFetchModule.self,
      AssetModule.self,
      ConstantsModule.self,
      FileSystemModule.self,
      FileSystemNextModule.self,
      FontLoaderModule.self,
      KeepAwakeModule.self,
      SplashScreenModule.self,
      DevLauncherInternal.self,
      DevLauncherAuth.self,
      RNCSafeAreaProviderManager.self,
      DevMenuModule.self,
      DevMenuInternalModule.self,
      DevMenuPreferences.self,
      RNCSafeAreaProviderManager.self
    ]
    #else
    return [
      ExpoFetchModule.self,
      AssetModule.self,
      ConstantsModule.self,
      FileSystemModule.self,
      FileSystemNextModule.self,
      FontLoaderModule.self,
      KeepAwakeModule.self,
      SplashScreenModule.self
    ]
    #endif
  }

  public override func getAppDelegateSubscribers() -> [ExpoAppDelegateSubscriber.Type] {
    #if EXPO_CONFIGURATION_DEBUG
    return [
      FileSystemBackgroundSessionHandler.self,
      SplashScreenAppDelegateSubscriber.self,
      ExpoDevLauncherAppDelegateSubscriber.self
    ]
    #else
    return [
      FileSystemBackgroundSessionHandler.self,
      SplashScreenAppDelegateSubscriber.self
    ]
    #endif
  }

  public override func getReactDelegateHandlers() -> [ExpoReactDelegateHandlerTupleType] {
    #if EXPO_CONFIGURATION_DEBUG
    return [
      (packageName: "expo-dev-launcher", handler: ExpoDevLauncherReactDelegateHandler.self),
      (packageName: "expo-dev-menu", handler: ExpoDevMenuReactDelegateHandler.self)
    ]
    #else
    return [
    ]
    #endif
  }

  public override func getAppCodeSignEntitlements() -> AppCodeSignEntitlements {
    return AppCodeSignEntitlements.from(json: #"{}"#)
  }
}
