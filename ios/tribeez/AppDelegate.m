/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTLinkingManager.h"

#import <Rollbar/Rollbar.h>

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

#import "RNFIRMessaging.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"tribeez" initialProperties:nil launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:0.670588f green:0.27843f blue:0.7372549f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  RollbarConfiguration *config = [RollbarConfiguration configuration];
  config.environment = @"production";
  [Rollbar initWithAccessToken:@"714c4e5507e74032be9848257ae18045" configuration:config];

  [FIRApp configure];
  #if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  #endif

  return YES;
}

#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
  [[NSNotificationCenter defaultCenter] postNotificationName:FCMNotificationReceived object:self userInfo:notification.request.content.userInfo];
  if ([[notification.request.content.userInfo valueForKey:@"show_in_foreground"] isEqual:@YES]){
    completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound);
  } else {
    completionHandler(UNNotificationPresentationOptionNone);
  }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
{
  NSDictionary* userInfo = [[NSMutableDictionary alloc] initWithDictionary: response.notification.request.content.userInfo];
  [userInfo setValue:@YES forKey:@"opened_from_tray"];
  [[NSNotificationCenter defaultCenter] postNotificationName:FCMNotificationReceived object:self userInfo:userInfo];
}
#else
-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[NSNotificationCenter defaultCenter] postNotificationName:FCMNotificationReceived object:self + userInfo:notification.userInfo];
}
#endif

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [[NSNotificationCenter defaultCenter] postNotificationName:FCMNotificationReceived object:self userInfo:userInfo];
  completionHandler(UIBackgroundFetchResultNoData);
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

@end
