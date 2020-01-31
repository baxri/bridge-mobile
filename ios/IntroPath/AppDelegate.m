/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#if __has_include(<React/RNSentry.h>)
#import <React/RNSentry.h> // This is used for versions of react >= 0.40
#else
#import "RNSentry.h" // This is used for versions of react < 0.40
#endif
#import <Firebase.h>
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
#import <React/RCTLinkingManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  #if BETA
    NSLog(@"[FIREBASE] Beta mode.");
    NSString *filePathBeta;
    filePathBeta = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info-Beta" ofType:@"plist"];
    FIROptions *options_beta = [[FIROptions alloc] initWithContentsOfFile:filePathBeta];
    [FIRApp configureWithOptions:options_beta];
  #elif DEBUG
    NSLog(@"[FIREBASE] Debug mode.");
    NSString *filePathDebug;
    filePathDebug = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info-Debug" ofType:@"plist"];
    FIROptions *options_debug = [[FIROptions alloc] initWithContentsOfFile:filePathDebug];
    [FIRApp configureWithOptions:options_debug];
  #else
    NSLog(@"[FIREBASE] Default mode.");
    [FIRApp configure];
  #endif

  [RNFirebaseNotifications configure];
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"IntroPath"
                                            initialProperties:nil];
  [RNSentry installWithRootView:rootView];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  [Fabric with:@[[Crashlytics class]]];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  #if BETA
      return [CodePush bundleURL];
  #else
      return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
#endif
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}

@end
