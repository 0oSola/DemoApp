package com.demoapp.react2rn;

/**
 * Created by sola on 2017/10/20.
 */

import android.content.Intent;
import android.widget.Toast;
import android.content.Context;
import android.app.Activity;

import com.demoapp.TodoActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;



public class BrigdeModule extends ReactContextBaseJavaModule {


    private Context mContext;

    public BrigdeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
    }

    @Override
    public String getName() {

        //返回的这个名字是必须的，在rn代码中需要这个名字来调用该类的方法。
        return "BrigdeModule";
    }


    //函数不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束之后只能通过回调函数或者发送信息给rn那边。


    @ReactMethod
    public void rnCallNative(){
        /*try {
            Intent intent = new Intent(mContext,TodoActivity.class);
            mContext.startActivity(intent);
        } catch (Exception e) {

        }*/


        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {

                Intent intent = new Intent(currentActivity,TodoActivity.class);
                currentActivity.startActivity(intent);

            }
        } catch (Exception e) {
            System.out.println(e);
        }

    }



    @ReactMethod
    public void isConnected(final Callback callback) {

    }

    @ReactMethod
    public void loadFile(final String loginId,final String host,final String appVersion) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                // String szFinal = Aes.DecryptString(szPassword);
                // callback.invoke(szFinal);

            }
        }).start();
    }
}
