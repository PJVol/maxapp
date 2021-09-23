package ru.maxnet.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.actionsheet.ActionSheetPackage;
import org.wonday.orientation.OrientationPackage;
import io.sentry.RNSentryPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.beefe.picker.PickerViewPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import me.listenzz.modal.TranslucentModalReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.horcrux.svg.SvgPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ActionSheetPackage(),
            new OrientationPackage(),
            new RNSentryPackage(),

            new NetInfoPackage(),
            new PickerViewPackage(),
            new FingerprintAuthPackage(),
            new SmsListenerPackage(),
            new RNSensitiveInfoPackage(),
          new TranslucentModalReactPackage(),
          new RNFirebasePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage(),
          new RNScreensPackage(),
          new RNLocalizePackage(),
          new SplashScreenReactPackage(),
          new RNDeviceInfo(),
          new AsyncStoragePackage(),
          new SvgPackage(),
          new RNGestureHandlerPackage(),
          new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
