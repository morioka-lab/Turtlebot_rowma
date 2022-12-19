# Turtlebot_rowma　タートルボットで森岡研究室内を巡回するシステム
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
　スマホアプリ側：[Android用のSDK](https://marketplace.zoom.us/docs/sdk/video/android/)  

更に、Video SDKを使用するために必要なJWTトークンというものを生成しています。JWTトークンはTurtlebot用のPCで生成し、Rowmaを仲介して、スマホアプリに送信しています。

## システムの実行
タートルボットのPCで以下のコマンドたちを実行します。

### ROSのコマンドたち
roscore起動
```sh
roscore
```
Rowma起動（UUIDを”turtlebot”に設定）
```sh
UUID=turtlebot rosrun rowma_ros rowma
```
