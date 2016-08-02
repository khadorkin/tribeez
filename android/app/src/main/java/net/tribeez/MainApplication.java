package net.tribeez;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.smixx.fabric.FabricPackage;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

// Vector icons:
import com.oblador.vectoricons.VectorIconsPackage;

import com.evollu.react.fcm.FIRMessagingPackage;

public class MainApplication extends Application implements ReactApplication {

  @Override
  public void onCreate() {
      super.onCreate();
      Fabric.with(this, new Crashlytics());
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactMaterialKitPackage(),
          new FabricPackage(),
          new FIRMessagingPackage(),
          new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
