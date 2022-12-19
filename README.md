# タートルボットで森岡研究室内を巡回するシステム
## まずは、セットアップ

### ROS
まずは、ロボットを操作するために[ROS](http://wiki.ros.org/ja)をインストールする必要があります。

ついでに[森岡研究室のロボット](https://github.com/morioka-lab/ros-instruction) を動かせるようにするといいかも。※Githubアカウントの作成とmorioka_labへの参加が必要


### Turtlebot
このシステムでは、turtlebot2を用いていますので、これについても対象のROSパッケージをインストールする必要があります。  
[こちらのサイト](https://qiita.com/s_makinaga/items/0547ae13f8f4687538e4)を参考にROSパッケージをインストールしてください。  
このサイトでは、ROSのセットアップもしていますが、そこはすでに終わっているものとして、４のTurtlebot用のパッケージというところから始めてください。

### Rowma
ロボットとのスマホアプリをつなぐシステムとして[Rowma](https://github.com/rowma)（Robot Web Manager）というものを使います。
  
Rowmaも必要なROSパッケージがあるので、インストールします。

```sh
cd ~/catkin_ws/src
git clone https://github.com/rowma/rowma_ros
cd rowma_ros
pip install -r requirements.txt
catkin_make
```
### Zoom SDK
ロボットの映像をスマホアプリに送信する手段として[Zoom Video SDK](https://marketplace.zoom.us/docs/sdk/video/introduction/)を使用しています。  
　ロボット側：[Web用のSDK](https://marketplace.zoom.us/docs/sdk/video/web/)  
 　ロボット側のSDKについては、Zoomが公開しているサンプルアプリを使用しています。　インストールは[こちら](https://github.com/zoom/videosdk-web-sample)
   Webpackのファイル（sample-app-videosdk/purejs-demo/webpack.config.dev.js）を少し変更しています。  
   [Webpack変更後]（https://github.com/morioka-lab/Turtlebot_rowma/blob/main/webpack.config.dev.js）
　スマホアプリ側：[Android用のSDK](https://marketplace.zoom.us/docs/sdk/video/android/)  

更に、Video SDKを使用するために必要なJWTトークンというものを生成しています。JWTトークンはTurtlebot用のPCで生成し、Rowmaを仲介して、スマホアプリに送信しています。  
[JWTトークン生成＆送信プログラム](https://github.com/morioka-lab/Turtlebot_rowma/blob/main/jwt.js)

## システムの実行
タートルボットのPCで以下のコマンドたちを実行します。

### ROSのコマンドたち
Rowma（UUIDを”turtlebot”に設定）※roscoreと別ターミナルで
```sh
roscore
UUID=turtlebot rosrun rowma_ros rowma
```
タートルボットの制御用ROSノード
```sh
roslaunch kobuki_node minimal.launch
```
スマホからの速度指令値　→　Turtlebot用速度指令値　変換用ROSノード
```sh
rosrun chatter listener_cmd_vel.py
```
### Zoomのコマンドたち
JWTトークン自動生成＆スマホアプリへの送信
```sh
cd <jwt.jsのあるディレクトリ>
node jwt.js
```
Zoom Web SDKの実行（警告みたいなものがブラウザに表示されますが、”詳細設定”というところを開くとページを閲覧できます。）
```sh
cd sample-app-videosdk/purejs-demo/
npm start
```
以上！！！！！！！！！！！

あとは、スマホアプリを操作すると、ロボットの前方の映像を見ながら十字キーでタートルボットを遠隔操作したり、タートルボットを充電スタンドへと自動ドッキングすることができます。
